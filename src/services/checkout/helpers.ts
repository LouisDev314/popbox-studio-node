import { CheckoutItemInput, CreateCheckoutSessionInput, DbClient, LockedProductRow } from '../../types/checkout';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { db } from '../../db';
import stripe from '../../integrations/stripe';
import {
  customers,
  inventoryReservations,
  kujiPrizes,
  orderItems,
  orders,
  payments,
  productInventory,
  tickets,
} from '../../db/schema';
import { and, count, eq, sql } from 'drizzle-orm';
import type Stripe from 'stripe';
import logger from '../../utils/logger';
import { getOrderDetailById } from '../orders/helpers';
import { randomInt, randomUUID } from 'crypto';
import { createTicketNumber } from '../../utils/crypto';
import { buildGuestOrderAccessUrl } from '../../utils/guest-order-access';
import { sendOrderConfirmationEmail } from '../notifications';
import { releaseAdvisoryLock, tryAcquireAdvisoryLock } from '../../jobs/advisory-lock';

class NeedsAttentionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NeedsAttentionError';
  }
}

class LatePaymentNeedsAttentionError extends NeedsAttentionError {
  constructor(message: string) {
    super(message);
    this.name = 'LatePaymentNeedsAttentionError';
  }
}

const LAST_ONE_PRIZE_CODE = 'LO';
const ORDER_CONFIRMATION_EMAIL_LOCK_PREFIX = 'orders:confirmation-email';
const ORDER_CONFIRMATION_EMAIL_ELIGIBLE_STATUSES = new Set<(typeof orders.$inferSelect)['status']>([
  'paid',
  'packed',
  'shipped',
  'refunded',
]);

type FinalizedCheckoutAmounts = {
  currency: string;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  discountCents: number;
  totalCents: number;
};

type FinalizedCheckoutSnapshots = {
  customerDetailsJson: Record<string, unknown>;
  shippingAddressJson: Record<string, unknown> | null;
  billingAddressJson: Record<string, unknown> | null;
};

type CheckoutCustomerIdentity = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
};

type ExpireStripeCheckoutSessionResult =
  | {
      outcome: 'expired';
      status: Stripe.Checkout.Session.Status | null;
    }
  | {
      outcome: 'noop';
      reason: 'not_open' | 'not_found';
      status: Stripe.Checkout.Session.Status | null;
    }
  | {
      outcome: 'error';
      reason: 'stripe_error';
      status: Stripe.Checkout.Session.Status | null;
    };

const getStripeErrorCode = (error: unknown) => {
  return typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string'
    ? error.code
    : null;
};

const PLACEHOLDER_CUSTOMER_EMAIL_DOMAIN = '@placeholder.popbox.local';

const splitFullName = (fullName: string | null) => {
  const normalized = fullName?.trim() || '';

  if (!normalized) {
    return {
      firstName: null,
      lastName: null,
    };
  }

  const [firstName, ...remaining] = normalized.split(/\s+/);

  return {
    firstName: firstName || null,
    lastName: remaining.length ? remaining.join(' ') : null,
  };
};

const normalizeStripeCurrency = (currency: string | null | undefined) => currency?.trim().toUpperCase() || '';

const getCollectedShippingDetails = (session: Stripe.Checkout.Session) =>
  session.collected_information?.shipping_details ?? null;

const isCompleteAddressSnapshot = (snapshot: Record<string, unknown> | null) => {
  if (!snapshot) {
    return false;
  }

  return ['fullName', 'line1', 'city', 'province', 'postalCode', 'countryCode'].every((field) => {
    const value = snapshot[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
};

const buildAddressSnapshot = (params: {
  source: 'stripe_shipping_details' | 'stripe_customer_details';
  fullName: string | null | undefined;
  phone: string | null | undefined;
  email?: string | null | undefined;
  address: Stripe.Address | null | undefined;
}) => {
  const address = params.address;

  if (!address) {
    return null;
  }

  return {
    fullName: params.fullName?.trim() || null,
    line1: address.line1?.trim() || null,
    line2: address.line2?.trim() || null,
    city: address.city?.trim() || null,
    province: address.state?.trim() || null,
    postalCode: address.postal_code?.trim() || null,
    countryCode: address.country?.trim().toUpperCase() || null,
    phone: params.phone?.trim() || null,
    email: params.email?.trim().toLowerCase() || null,
    source: params.source,
  } satisfies Record<string, unknown>;
};

const buildFinalizedCheckoutAmounts = (session: Stripe.Checkout.Session): FinalizedCheckoutAmounts => ({
  currency: normalizeStripeCurrency(session.currency),
  subtotalCents: session.amount_subtotal ?? 0,
  shippingCents: session.total_details?.amount_shipping ?? 0,
  taxCents: session.total_details?.amount_tax ?? 0,
  discountCents: session.total_details?.amount_discount ?? 0,
  totalCents: session.amount_total ?? 0,
});

const buildFinalizedCheckoutSnapshots = (session: Stripe.Checkout.Session): FinalizedCheckoutSnapshots => {
  const shippingDetails = getCollectedShippingDetails(session);
  const fullName = session.customer_details?.name?.trim() || shippingDetails?.name?.trim() || null;
  const { firstName, lastName } = splitFullName(fullName);
  const email =
    session.customer_details?.email?.trim().toLowerCase() || session.customer_email?.trim().toLowerCase() || null;
  const phone = session.customer_details?.phone?.trim() || null;

  return {
    customerDetailsJson: {
      email,
      fullName,
      firstName,
      lastName,
      phone,
      source: 'stripe_customer_details',
    },
    shippingAddressJson: buildAddressSnapshot({
      source: 'stripe_shipping_details',
      fullName: shippingDetails?.name ?? fullName,
      phone,
      email,
      address: shippingDetails?.address,
    }),
    billingAddressJson: buildAddressSnapshot({
      source: 'stripe_customer_details',
      fullName,
      phone,
      email,
      address: session.customer_details?.address,
    }),
  };
};

const assertFinalizedCheckoutSessionMatchesOrder = (
  lockedOrder: {
    stripeCheckoutSessionId: string | null;
    currency: string;
    subtotalCents: number;
    shippingCents: number;
  },
  session: Stripe.Checkout.Session,
  amounts: FinalizedCheckoutAmounts,
  snapshots: FinalizedCheckoutSnapshots,
) => {
  if (session.payment_status !== 'paid') {
    throw new NeedsAttentionError(`Stripe Checkout Session ${session.id} is not in a paid state`);
  }

  if (lockedOrder.stripeCheckoutSessionId && lockedOrder.stripeCheckoutSessionId !== session.id) {
    throw new NeedsAttentionError('Stripe Checkout Session id does not match the order record');
  }

  if (normalizeStripeCurrency(lockedOrder.currency) !== 'CAD' || amounts.currency !== 'CAD') {
    throw new NeedsAttentionError('Stripe Checkout currency does not match the CAD-only order policy');
  }

  if (amounts.subtotalCents !== lockedOrder.subtotalCents) {
    throw new NeedsAttentionError('Stripe Checkout subtotal does not match the server-side order subtotal');
  }

  if (amounts.shippingCents !== lockedOrder.shippingCents) {
    throw new NeedsAttentionError('Stripe Checkout shipping does not match the server-side order shipping');
  }

  if (amounts.discountCents !== 0) {
    throw new NeedsAttentionError('Stripe Checkout applied an unexpected discount');
  }

  if (amounts.totalCents !== amounts.subtotalCents + amounts.shippingCents + amounts.taxCents) {
    throw new NeedsAttentionError('Stripe Checkout total does not reconcile with subtotal, shipping, and tax');
  }

  if (!isCompleteAddressSnapshot(snapshots.shippingAddressJson)) {
    throw new NeedsAttentionError('Stripe shipping details are incomplete');
  }

  if (!isCompleteAddressSnapshot(snapshots.billingAddressJson)) {
    throw new NeedsAttentionError('Stripe billing details are incomplete');
  }

  if ((snapshots.shippingAddressJson?.countryCode as string | undefined)?.toUpperCase() !== 'CA') {
    throw new NeedsAttentionError('Stripe shipping details are outside Canada');
  }

  if (typeof snapshots.customerDetailsJson.email !== 'string' || !snapshots.customerDetailsJson.email) {
    throw new NeedsAttentionError('Stripe customer email is missing');
  }
};

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isPlaceholderCustomerEmail = (email: string | null | undefined) =>
  typeof email === 'string' && normalizeEmail(email).endsWith(PLACEHOLDER_CUSTOMER_EMAIL_DOMAIN);

const readSnapshotString = (snapshot: Record<string, unknown>, field: string) => {
  const value = snapshot[field];

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized.length ? normalized : null;
};

const createPlaceholderCustomerEmail = () => `checkout+${randomUUID()}@placeholder.popbox.local`;

const getCheckoutCustomerIdentity = (finalizedSnapshots: FinalizedCheckoutSnapshots): CheckoutCustomerIdentity => {
  const email = readSnapshotString(finalizedSnapshots.customerDetailsJson, 'email');

  if (!email) {
    throw new NeedsAttentionError('Stripe customer email is missing');
  }

  return {
    email: normalizeEmail(email),
    firstName: readSnapshotString(finalizedSnapshots.customerDetailsJson, 'firstName'),
    lastName: readSnapshotString(finalizedSnapshots.customerDetailsJson, 'lastName'),
    phone: readSnapshotString(finalizedSnapshots.customerDetailsJson, 'phone'),
  };
};

const buildCustomerPatch = (
  currentCustomer: typeof customers.$inferSelect,
  checkoutCustomer: CheckoutCustomerIdentity,
  strategy: 'conservative' | 'placeholder',
) => {
  const patch: Partial<typeof customers.$inferInsert> = {};

  if (strategy === 'placeholder' && currentCustomer.email !== checkoutCustomer.email) {
    patch.email = checkoutCustomer.email;
  }

  if (
    strategy === 'conservative' &&
    normalizeEmail(currentCustomer.email) === checkoutCustomer.email &&
    currentCustomer.email !== checkoutCustomer.email
  ) {
    patch.email = checkoutCustomer.email;
  }

  const nextFirstName =
    strategy === 'placeholder'
      ? checkoutCustomer.firstName ?? currentCustomer.firstName
      : currentCustomer.firstName ?? checkoutCustomer.firstName;
  const nextLastName =
    strategy === 'placeholder'
      ? checkoutCustomer.lastName ?? currentCustomer.lastName
      : currentCustomer.lastName ?? checkoutCustomer.lastName;
  const nextPhone =
    strategy === 'placeholder' ? checkoutCustomer.phone ?? currentCustomer.phone : currentCustomer.phone ?? checkoutCustomer.phone;

  if (nextFirstName !== currentCustomer.firstName) {
    patch.firstName = nextFirstName;
  }

  if (nextLastName !== currentCustomer.lastName) {
    patch.lastName = nextLastName;
  }

  if (nextPhone !== currentCustomer.phone) {
    patch.phone = nextPhone;
  }

  return patch;
};

const hasCustomerPatchChanges = (patch: Partial<typeof customers.$inferInsert>) => Object.keys(patch).length > 0;

const updateCustomerIfNeeded = async (
  tx: DbClient,
  customer: typeof customers.$inferSelect,
  patch: Partial<typeof customers.$inferInsert>,
) => {
  if (!hasCustomerPatchChanges(patch)) {
    return customer;
  }

  const [updatedCustomer] = await tx.update(customers).set(patch).where(eq(customers.id, customer.id)).returning();

  if (!updatedCustomer) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to update customer');
  }

  return updatedCustomer;
};

const deletePlaceholderCustomerIfOrphaned = async (tx: DbClient, customerId: string) => {
  const [referenceCountRow] = await tx
    .select({ count: count(orders.id) })
    .from(orders)
    .where(eq(orders.customerId, customerId));

  if (Number(referenceCountRow?.count ?? 0) > 0) {
    return;
  }

  try {
    await tx.delete(customers).where(eq(customers.id, customerId));
  } catch (error) {
    if (getStripeErrorCode(error) === '23503') {
      return;
    }

    throw error;
  }
};

const relinkOrderToCustomer = async (
  tx: DbClient,
  orderId: string,
  currentCustomerId: string,
  nextCustomer: typeof customers.$inferSelect,
) => {
  if (currentCustomerId !== nextCustomer.id) {
    await tx.update(orders).set({ customerId: nextCustomer.id }).where(eq(orders.id, orderId));
  }

  return nextCustomer.id;
};

export const normalizeItems = (items: CheckoutItemInput[]) => {
  const map = new Map<string, number>();

  for (const item of items) {
    map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
  }

  return Array.from(map.entries())
    .sort(([leftProductId], [rightProductId]) => leftProductId.localeCompare(rightProductId))
    .map(([productId, quantity]) => ({ productId, quantity }));
};

export const lockProductForCheckout = async (
  tx: DbClient,
  productId: string,
): Promise<LockedProductRow | undefined> => {
  const result = await tx.execute(sql<LockedProductRow>`
    SELECT
      p.id AS "productId",
      p.name,
      p.slug,
      p.description,
      p.product_type AS "productType",
      p.status,
      p.price_cents AS "priceCents",
      p.currency,
      pi.on_hand AS "onHand",
      pi.reserved
      FROM products p
      JOIN product_inventory pi ON pi.product_id = p.id
      WHERE p.id = ${productId}
    FOR UPDATE
  `);

  return result[0] as LockedProductRow | undefined;
};

export const createOrUpdateCustomer = async (tx: DbClient, input: CreateCheckoutSessionInput) => {
  if (input.email) {
    const email = normalizeEmail(input.email);
    const [existingCustomer] = await tx.select().from(customers).where(eq(customers.email, email)).limit(1);

    if (existingCustomer) {
      return existingCustomer;
    }

    const [created] = await tx
      .insert(customers)
      .values({
        email,
      })
      .returning();

    if (!created) {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to create customer');
    }

    return created;
  }

  const [created] = await tx
    .insert(customers)
    .values({
      email: createPlaceholderCustomerEmail(),
    })
    .returning();

  if (!created) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Unable to create customer');
  }

  return created;
};

export const reconcileOrderCustomerFromCheckout = async (
  tx: DbClient,
  orderId: string,
  finalizedSnapshots: FinalizedCheckoutSnapshots,
) => {
  const checkoutCustomer = getCheckoutCustomerIdentity(finalizedSnapshots);
  const [order] = await tx.select().from(orders).where(eq(orders.id, orderId)).limit(1);

  if (!order) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found for checkout reconciliation');
  }

  const [currentCustomer] = await tx.select().from(customers).where(eq(customers.id, order.customerId)).limit(1);

  if (!currentCustomer) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Customer not found for checkout order');
  }

  if (!isPlaceholderCustomerEmail(currentCustomer.email)) {
    const updatedCurrentCustomer = await updateCustomerIfNeeded(
      tx,
      currentCustomer,
      buildCustomerPatch(currentCustomer, checkoutCustomer, 'conservative'),
    );
    return updatedCurrentCustomer.id;
  }

  const [existingCustomer] = await tx.select().from(customers).where(eq(customers.email, checkoutCustomer.email)).limit(1);

  if (existingCustomer && existingCustomer.id !== currentCustomer.id) {
    const updatedExistingCustomer = await updateCustomerIfNeeded(
      tx,
      existingCustomer,
      buildCustomerPatch(existingCustomer, checkoutCustomer, 'conservative'),
    );

    await relinkOrderToCustomer(tx, order.id, currentCustomer.id, updatedExistingCustomer);
    await deletePlaceholderCustomerIfOrphaned(tx, currentCustomer.id);
    return updatedExistingCustomer.id;
  }

  try {
    const updatedPlaceholderCustomer = await updateCustomerIfNeeded(
      tx,
      currentCustomer,
      buildCustomerPatch(currentCustomer, checkoutCustomer, 'placeholder'),
    );
    return updatedPlaceholderCustomer.id;
  } catch (error) {
    if (getStripeErrorCode(error) !== '23505') {
      throw error;
    }
  }

  const [conflictingCustomer] = await tx.select().from(customers).where(eq(customers.email, checkoutCustomer.email)).limit(1);

  if (!conflictingCustomer || conflictingCustomer.id === currentCustomer.id) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Customer email reconciliation conflict could not be resolved');
  }

  const updatedConflictingCustomer = await updateCustomerIfNeeded(
    tx,
    conflictingCustomer,
    buildCustomerPatch(conflictingCustomer, checkoutCustomer, 'conservative'),
  );

  await relinkOrderToCustomer(tx, order.id, currentCustomer.id, updatedConflictingCustomer);
  await deletePlaceholderCustomerIfOrphaned(tx, currentCustomer.id);
  return updatedConflictingCustomer.id;
};

export const releaseReservationsForOrder = async (
  tx: DbClient,
  orderId: string,
  nextStatus: 'released' | 'expired',
) => {
  await releaseReservationsForOrders(tx, [orderId], nextStatus);
};

export const releaseReservationsForOrders = async (
  tx: DbClient,
  orderIds: string[],
  nextStatus: 'released' | 'expired',
) => {
  if (orderIds.length === 0) {
    return;
  }

  const normalizedOrderIds = [...new Set(orderIds)].sort();
  const orderIdList = sql.join(
    normalizedOrderIds.map((orderId) => sql`${orderId}`),
    sql`, `,
  );

  await tx.execute(sql`
    WITH locked_orders AS (
      SELECT id
      FROM orders
      WHERE id IN (${orderIdList})
      ORDER BY id
      FOR UPDATE
    ),
    inventory_deltas AS (
      SELECT product_id, SUM(quantity)::integer AS quantity
      FROM inventory_reservations
      WHERE order_id IN (SELECT id FROM locked_orders)
        AND status = 'active'
      GROUP BY product_id
    ),
    locked_inventory AS (
      SELECT pi.product_id, inventory_deltas.quantity
      FROM product_inventory AS pi
      INNER JOIN inventory_deltas ON inventory_deltas.product_id = pi.product_id
      ORDER BY pi.product_id
      FOR UPDATE
    ),
    updated_inventory AS (
      UPDATE product_inventory AS pi
      SET reserved = GREATEST(pi.reserved - locked_inventory.quantity, 0)
      FROM locked_inventory
      WHERE pi.product_id = locked_inventory.product_id
      RETURNING pi.product_id
    )
    UPDATE inventory_reservations AS ir
    SET status = ${nextStatus}
    WHERE ir.order_id IN (SELECT id FROM locked_orders)
      AND ir.status = 'active'
  `);
};

export const ensurePaymentSessionMetadata = (session: Stripe.Checkout.Session) => {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Stripe session metadata is incomplete');
  }

  return {
    orderId,
  };
};

export const expireStripeCheckoutSessionIfOpen = async (
  sessionId: string,
): Promise<ExpireStripeCheckoutSessionResult> => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== 'open') {
      return {
        outcome: 'noop',
        reason: 'not_open',
        status: session.status,
      };
    }

    const expiredSession = await stripe.checkout.sessions.expire(sessionId);

    return {
      outcome: 'expired',
      status: expiredSession.status,
    };
  } catch (error) {
    if (getStripeErrorCode(error) === 'resource_missing') {
      return {
        outcome: 'noop',
        reason: 'not_found',
        status: null,
      };
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.status !== 'open') {
        return {
          outcome: 'noop',
          reason: 'not_open',
          status: session.status,
        };
      }
    } catch (retryError) {
      if (getStripeErrorCode(retryError) === 'resource_missing') {
        return {
          outcome: 'noop',
          reason: 'not_found',
          status: null,
        };
      }

      logger.warn(
        { error: retryError, sessionId },
        'Stripe Checkout Session status could not be rechecked after local order expiration',
      );
    }

    logger.error({ error, sessionId }, 'Failed to expire Stripe Checkout Session after local order expiration');

    return {
      outcome: 'error',
      reason: 'stripe_error',
      status: null,
    };
  }
};

export const allocateKujiTickets = async (tx: DbClient, orderId: string, customerId: string) => {
  const kujiItems = await tx
    .select()
    .from(orderItems)
    .where(and(eq(orderItems.orderId, orderId), eq(orderItems.productType, 'kuji')));

  for (const item of kujiItems) {
    const prizeResult = await tx.execute(
      sql<{
        id: string;
        prizeCode: string;
        remainingQuantity: number;
        productId: string;
      }>`
        SELECT id, prize_code AS "prizeCode", remaining_quantity AS "remainingQuantity", product_id AS "productId"
        FROM kuji_prizes
        WHERE product_id = ${item.productId}
        ORDER BY sort_order ASC, id ASC
        FOR UPDATE
      `,
    );

    const prizePool = prizeResult.map((row) => ({
      id: String(row.id),
      prizeCode: String(row.prizeCode),
      remainingQuantity: Number(row.remainingQuantity),
      productId: String(row.productId),
    }));
    const normalPrizePool = prizePool.filter((prize) => prize.prizeCode !== LAST_ONE_PRIZE_CODE);
    const totalRemaining = normalPrizePool.reduce((sum, prize) => sum + prize.remainingQuantity, 0);

    if (totalRemaining < item.quantity) {
      throw new NeedsAttentionError(`Insufficient kuji prize inventory for product ${item.productId}`);
    }

    const shouldAwardLastOne = totalRemaining === item.quantity;
    const lastOnePrize = shouldAwardLastOne
      ? prizePool.find((prize) => prize.prizeCode === LAST_ONE_PRIZE_CODE)
      : undefined;

    if (shouldAwardLastOne && (!lastOnePrize || lastOnePrize.remainingQuantity <= 0)) {
      throw new NeedsAttentionError(`LO prize inventory is inconsistent for product ${item.productId}`);
    }

    const selectedPrizeCounts = new Map<string, number>();
    const ticketPrizeIds: string[] = [];

    for (let drawIndex = 0; drawIndex < item.quantity; drawIndex += 1) {
      const currentTotal = normalPrizePool.reduce((sum, prize) => sum + prize.remainingQuantity, 0);
      const roll = randomInt(currentTotal) + 1;
      let cumulative = 0;
      let selectedPrize = normalPrizePool[0];

      for (const prize of normalPrizePool) {
        cumulative += prize.remainingQuantity;

        if (roll <= cumulative) {
          selectedPrize = prize;
          break;
        }
      }

      if (!selectedPrize || selectedPrize.remainingQuantity <= 0) {
        throw new NeedsAttentionError(`Unable to allocate kuji prize for product ${item.productId}`);
      }

      selectedPrize.remainingQuantity -= 1;
      selectedPrizeCounts.set(selectedPrize.id, (selectedPrizeCounts.get(selectedPrize.id) ?? 0) + 1);
      ticketPrizeIds.push(selectedPrize.id);
    }

    if (shouldAwardLastOne && lastOnePrize) {
      lastOnePrize.remainingQuantity -= 1;
      selectedPrizeCounts.set(lastOnePrize.id, (selectedPrizeCounts.get(lastOnePrize.id) ?? 0) + 1);

      // The existing ticket model stores a single prize per ticket, so the last
      // ticket in the order becomes the LO-winning ticket when the sellable pool is exhausted.
      ticketPrizeIds[ticketPrizeIds.length - 1] = lastOnePrize.id;
    }

    for (const kujiPrizeId of ticketPrizeIds) {
      await tx.insert(tickets).values({
        orderId,
        orderItemId: item.id,
        customerId,
        kujiProductId: item.productId,
        kujiPrizeId,
        ticketNumber: createTicketNumber(),
      });
    }

    for (const prize of prizePool) {
      const drawnCount = selectedPrizeCounts.get(prize.id);
      if (!drawnCount) continue;

      await tx
        .update(kujiPrizes)
        .set({
          remainingQuantity: prize.remainingQuantity,
        })
        .where(eq(kujiPrizes.id, prize.id));
    }
  }
};

export const convertReservations = async (tx: DbClient, orderId: string) => {
  const activeReservations = await tx
    .select()
    .from(inventoryReservations)
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));

  if (activeReservations.length === 0) {
    throw new NeedsAttentionError('No active reservations were available for conversion');
  }

  const currentTime = Date.now();
  if (activeReservations.some((reservation) => reservation.expiresAt.getTime() <= currentTime)) {
    throw new LatePaymentNeedsAttentionError('Late payment received after reservation expiration');
  }

  const reservationsInLockOrder = [...activeReservations].sort((leftReservation, rightReservation) => {
    const productComparison = leftReservation.productId.localeCompare(rightReservation.productId);

    if (productComparison !== 0) {
      return productComparison;
    }

    return leftReservation.id.localeCompare(rightReservation.id);
  });

  for (const reservation of reservationsInLockOrder) {
    const inventoryResult = await tx.execute(sql<{ onHand: number; reserved: number; productType: 'standard' | 'kuji' }>`
      SELECT
        pi.on_hand AS "onHand",
        pi.reserved,
        p.product_type AS "productType"
      FROM product_inventory AS pi
      INNER JOIN products AS p
        ON p.id = pi.product_id
      WHERE pi.product_id = ${reservation.productId}
      ORDER BY product_id
      FOR UPDATE OF pi
    `);

    const inventoryRow = inventoryResult[0];
    const inventory = inventoryRow
      ? {
          onHand: Number(inventoryRow.onHand),
          reserved: Number(inventoryRow.reserved),
          productType: inventoryRow.productType,
        }
      : undefined;
    if (!inventory || inventory.reserved < reservation.quantity) {
      throw new NeedsAttentionError(`Inventory could not be finalized for product ${reservation.productId}`);
    }

    if (inventory.productType !== 'kuji' && inventory.onHand < reservation.quantity) {
      throw new NeedsAttentionError(`Inventory could not be finalized for product ${reservation.productId}`);
    }

    await tx
      .update(productInventory)
      .set({
        ...(inventory.productType === 'kuji'
          ? {
              reserved: sql`${productInventory.reserved} - ${reservation.quantity}`,
            }
          : {
              onHand: sql`${productInventory.onHand} - ${reservation.quantity}`,
              reserved: sql`${productInventory.reserved} - ${reservation.quantity}`,
            }),
      })
      .where(eq(productInventory.productId, reservation.productId));
  }

  await tx
    .update(inventoryReservations)
    .set({
      status: 'converted',
    })
    .where(and(eq(inventoryReservations.orderId, orderId), eq(inventoryReservations.status, 'active')));
};

export const markOrderPaidNeedsAttention = async (
  tx: DbClient,
  orderId: string,
  session: Stripe.Checkout.Session,
  finalizedSnapshots: FinalizedCheckoutSnapshots,
  finalizedAmounts: FinalizedCheckoutAmounts,
  reservationStatus: 'released' | 'expired' = 'released',
) => {
  const finalizedCustomerId = await reconcileOrderCustomerFromCheckout(tx, orderId, finalizedSnapshots);

  await releaseReservationsForOrder(tx, orderId, reservationStatus);

  await tx
    .update(orders)
    .set({
      customerId: finalizedCustomerId,
      status: 'paid_needs_attention',
      currency: finalizedAmounts.currency || 'CAD',
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      customerDetailsJson: finalizedSnapshots.customerDetailsJson,
      shippingAddressJson: finalizedSnapshots.shippingAddressJson ?? {},
      billingAddressJson: finalizedSnapshots.billingAddressJson,
      subtotalCents: finalizedAmounts.subtotalCents,
      taxCents: finalizedAmounts.taxCents,
      shippingCents: finalizedAmounts.shippingCents,
      totalCents: finalizedAmounts.totalCents,
      paidAt: new Date(),
      placedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  await tx
    .update(payments)
    .set({
      providerCheckoutSessionId: session.id,
      providerPaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      amountCents: finalizedAmounts.totalCents,
      currency: finalizedAmounts.currency || 'CAD',
      status: 'paid',
      rawResponse: session as unknown as Record<string, unknown>,
    })
    .where(eq(payments.orderId, orderId));
};

const buildEmailErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown order confirmation email error';
};

const sendOrderConfirmationEmailIfNeeded = async (orderId: string) => {
  const lockHandle = await tryAcquireAdvisoryLock(`${ORDER_CONFIRMATION_EMAIL_LOCK_PREFIX}:${orderId}`);

  if (!lockHandle) {
    logger.info({ orderId }, 'Skipping order confirmation email because another worker is already sending it');
    return;
  }

  try {
    const [order] = await db
      .select({
        id: orders.id,
        publicId: orders.publicId,
        status: orders.status,
        confirmationEmailSentAt: orders.confirmationEmailSentAt,
      })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found for confirmation email');
    }

    if (order.confirmationEmailSentAt) {
      logger.info(
        {
          orderId,
          publicId: order.publicId,
          confirmationEmailSentAt: order.confirmationEmailSentAt,
        },
        'Skipping order confirmation email because it was already sent',
      );
      return;
    }

    if (!ORDER_CONFIRMATION_EMAIL_ELIGIBLE_STATUSES.has(order.status)) {
      logger.info(
        {
          orderId,
          publicId: order.publicId,
          status: order.status,
        },
        'Skipping order confirmation email because the order is not in an emailable state',
      );
      return;
    }

    const detail = await getOrderDetailById(orderId);

    await sendOrderConfirmationEmail({
      email: detail.customer.email,
      firstName: detail.customer.firstName,
      orderPublicId: detail.publicId,
      orderUrl: buildGuestOrderAccessUrl(detail.publicId),
    });

    await db
      .update(orders)
      .set({
        confirmationEmailSentAt: new Date(),
        confirmationEmailError: null,
      })
      .where(eq(orders.id, orderId));

    logger.info(
      {
        orderId,
        publicId: detail.publicId,
        email: detail.customer.email,
      },
      'Order confirmation email sent',
    );
  } catch (error) {
    const emailErrorMessage = buildEmailErrorMessage(error);

    await db
      .update(orders)
      .set({
        confirmationEmailError: emailErrorMessage,
      })
      .where(eq(orders.id, orderId));

    logger.error({ error, orderId, emailErrorMessage }, 'Order confirmation email send failed');
    throw error;
  } finally {
    try {
      await releaseAdvisoryLock(lockHandle);
    } catch (unlockError) {
      logger.error({ error: unlockError, orderId }, 'Failed to release order confirmation email advisory lock');
    }
  }
};

export const finalizeCheckoutSession = async (session: Stripe.Checkout.Session) => {
  const hydratedSession = session.id ? await stripe.checkout.sessions.retrieve(session.id) : session;
  const { orderId } = ensurePaymentSessionMetadata(hydratedSession);
  const finalizedAmounts = buildFinalizedCheckoutAmounts(hydratedSession);
  const finalizedSnapshots = buildFinalizedCheckoutSnapshots(hydratedSession);
  let orderPublicId = '';

  try {
    const finalizeResult = await db.transaction(async (tx) => {
      const lockedOrderResult = await tx.execute<{
        publicId: string;
        customerId: string;
        stripeCheckoutSessionId: string | null;
        status: (typeof orders.$inferSelect)['status'];
        currency: string;
        subtotalCents: number;
        shippingCents: number;
      }>(sql`
        SELECT
          id,
          public_id AS "publicId",
          customer_id AS "customerId",
          stripe_checkout_session_id AS "stripeCheckoutSessionId",
          status,
          currency,
          subtotal_cents AS "subtotalCents",
          shipping_cents AS "shippingCents"
        FROM orders
        WHERE id = ${orderId}
        FOR UPDATE
      `);
      const lockedOrder = lockedOrderResult[0];

      if (!lockedOrder) {
        throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found for checkout session');
      }

      orderPublicId = lockedOrder.publicId;

      if (['paid', 'packed', 'shipped', 'refunded', 'paid_needs_attention'].includes(lockedOrder.status)) {
        return {
          alreadyFinalized: true,
          needsAttention: lockedOrder.status === 'paid_needs_attention',
          publicId: lockedOrder.publicId,
        };
      }

      if (lockedOrder.status === 'expired') {
        throw new LatePaymentNeedsAttentionError('Late payment received after order expiration');
      }

      if (lockedOrder.status !== 'pending_payment') {
        throw new NeedsAttentionError(`Order is ${lockedOrder.status} and can no longer be finalized`);
      }

      assertFinalizedCheckoutSessionMatchesOrder(
        {
          stripeCheckoutSessionId: lockedOrder.stripeCheckoutSessionId,
          currency: lockedOrder.currency,
          subtotalCents: Number(lockedOrder.subtotalCents),
          shippingCents: Number(lockedOrder.shippingCents),
        },
        hydratedSession,
        finalizedAmounts,
        finalizedSnapshots,
      );

      const finalizedCustomerId = await reconcileOrderCustomerFromCheckout(tx, orderId, finalizedSnapshots);

      await convertReservations(tx, orderId);
      await allocateKujiTickets(tx, orderId, finalizedCustomerId);

      await tx
        .update(orders)
        .set({
          customerId: finalizedCustomerId,
          status: 'paid',
          currency: finalizedAmounts.currency,
          stripeCheckoutSessionId: hydratedSession.id,
          stripePaymentIntentId:
            typeof hydratedSession.payment_intent === 'string' ? hydratedSession.payment_intent : null,
          customerDetailsJson: finalizedSnapshots.customerDetailsJson,
          shippingAddressJson: finalizedSnapshots.shippingAddressJson ?? {},
          billingAddressJson: finalizedSnapshots.billingAddressJson,
          subtotalCents: finalizedAmounts.subtotalCents,
          taxCents: finalizedAmounts.taxCents,
          shippingCents: finalizedAmounts.shippingCents,
          totalCents: finalizedAmounts.totalCents,
          paidAt: new Date(),
          placedAt: new Date(),
        })
        .where(eq(orders.id, orderId));

      await tx
        .update(payments)
        .set({
          providerCheckoutSessionId: hydratedSession.id,
          providerPaymentIntentId:
            typeof hydratedSession.payment_intent === 'string' ? hydratedSession.payment_intent : null,
          amountCents: finalizedAmounts.totalCents,
          currency: finalizedAmounts.currency,
          status: 'paid',
          rawResponse: hydratedSession as unknown as Record<string, unknown>,
        })
        .where(eq(payments.orderId, orderId));

      return {
        alreadyFinalized: false,
        needsAttention: false,
        publicId: lockedOrder.publicId,
      };
    });

    if (finalizeResult.alreadyFinalized) {
      await sendOrderConfirmationEmailIfNeeded(orderId);
      const orderUrl = buildGuestOrderAccessUrl(orderPublicId);

      return {
        orderId,
        publicId: finalizeResult.publicId,
        orderUrl,
        needsAttention: finalizeResult.needsAttention,
        alreadyFinalized: true,
      };
    }
  } catch (error) {
    if (error instanceof NeedsAttentionError) {
      const isLatePayment = error instanceof LatePaymentNeedsAttentionError;

      logger.warn(
        {
          orderId,
          reason: error.message,
          latePayment: isLatePayment,
        },
        'Order payment finalized with manual attention required',
      );

      await db.transaction(async (tx) => {
        await markOrderPaidNeedsAttention(
          tx,
          orderId,
          hydratedSession,
          finalizedSnapshots,
          finalizedAmounts,
          isLatePayment ? 'expired' : 'released',
        );
      });

      return {
        orderId,
        publicId: orderPublicId,
        orderUrl: buildGuestOrderAccessUrl(orderPublicId),
        needsAttention: true,
        alreadyFinalized: false,
      };
    }

    throw error;
  }

  await sendOrderConfirmationEmailIfNeeded(orderId);

  const orderUrl = buildGuestOrderAccessUrl(orderPublicId);

  return {
    orderId,
    publicId: orderPublicId,
    orderUrl,
    needsAttention: false,
    alreadyFinalized: false,
  };
};
