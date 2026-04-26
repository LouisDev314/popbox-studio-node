import {
  customers,
  kujiPrizes,
  orderItems,
  orders,
  productImages,
  products,
  shipments,
  tickets,
} from '../../db/schema';
import { and, asc, eq, sql } from 'drizzle-orm';
import { OrderDetailView, OrderTicketView } from '../../types/order';
import { db } from '../../db';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { buildImageUrl } from '../../utils/product';

type OrderItemRow = {
  id: string;
  productId: string;
  productName: string;
  productType: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
  metadata: Record<string, unknown> | null;
};

type OrderTicketJoinRow = {
  ticket: {
    id: string;
    ticketNumber: string;
    revealedAt: Date | null;
    voidedAt: Date | null;
    voidReason: string | null;
    createdAt: Date;
  };
  prize: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    prizeCode: string;
  };
  product: {
    id: string;
    name: string;
    slug: string;
  };
};

type ShipmentRow = {
  carrierName: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
};

type OrderRecordRow = {
  order: {
    id: string;
    publicId: string;
    status: string;
    includesLastOnePrize: boolean;
    currency: string;
    subtotalCents: number;
    taxCents: number;
    shippingCents: number;
    totalCents: number;
    customerDetailsJson: Record<string, unknown> | null;
    shippingAddressJson: Record<string, unknown>;
    billingAddressJson: Record<string, unknown> | null;
    placedAt: Date | null;
    paidAt: Date | null;
    cancelledAt: Date | null;
    refundedAt: Date | null;
  };
  customer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  };
};

type PrimaryProductImageRow = {
  productId: string;
  storageKey: string;
  altText: string | null;
};

type GuestTicketCollectionView = {
  tickets: OrderTicketView[];
  revealed: OrderTicketView[];
  unrevealed: OrderTicketView[];
  counts: {
    total: number;
    revealed: number;
    unrevealed: number;
  };
};

const readCustomerSnapshotField = (
  snapshot: Record<string, unknown> | null | undefined,
  field: 'email' | 'firstName' | 'lastName' | 'phone',
) => {
  const value = snapshot?.[field];
  return typeof value === 'string' ? value : null;
};

const resolveImage = (
  image: Pick<typeof productImages.$inferSelect, 'storageKey' | 'altText'> | null,
  fallbackAltText: string,
) => ({
  imageUrl: image?.storageKey ? buildImageUrl(image.storageKey) : null,
  imageAltText: image?.altText ?? fallbackAltText,
});

const resolveNullableImage = (image: Pick<typeof productImages.$inferSelect, 'storageKey' | 'altText'> | null) => ({
  imageUrl: image?.storageKey ? buildImageUrl(image.storageKey) : null,
  imageAltText: image?.storageKey ? image.altText : null,
});

const loadPrimaryProductImages = async (productIds: string[]) => {
  if (!productIds.length) {
    return new Map<string, PrimaryProductImageRow>();
  }

  const requestedIds = sql.join(
    productIds.map((productId) => sql`${productId}::uuid`),
    sql`, `,
  );

  const rows = (await db.execute(sql<PrimaryProductImageRow>`
    SELECT DISTINCT ON (pi.product_id)
      pi.product_id AS "productId",
      pi.storage_key AS "storageKey",
      pi.alt_text AS "altText"
    FROM ${productImages} AS pi
    WHERE pi.product_id IN (${requestedIds})
    ORDER BY
      pi.product_id ASC,
      pi.sort_order ASC,
      pi.created_at ASC,
      pi.id ASC
  `)) as PrimaryProductImageRow[];

  const primaryImages = new Map<string, PrimaryProductImageRow>();

  for (const row of rows) {
    if (!primaryImages.has(row.productId)) {
      primaryImages.set(row.productId, row);
    }
  }

  return primaryImages;
};

const mapTicketRow = (row: OrderTicketJoinRow, primaryTicketImages: Map<string, PrimaryProductImageRow>) => {
  const image = resolveImage(primaryTicketImages.get(row.product.id) ?? null, row.product.name);

  return {
    id: row.ticket.id,
    ticketNumber: row.ticket.ticketNumber,
    revealedAt: row.ticket.revealedAt,
    voidedAt: row.ticket.voidedAt,
    voidReason: row.ticket.voidReason,
    prize: {
      id: row.prize.id,
      name: row.prize.name,
      description: row.prize.description,
      imageUrl: row.prize.imageUrl,
      prizeCode: row.prize.prizeCode,
    },
    kujiProduct: {
      id: row.product.id,
      name: row.product.name,
      slug: row.product.slug,
      imageUrl: image.imageUrl,
      imageAltText: image.imageAltText,
    },
    createdAt: row.ticket.createdAt,
  } satisfies OrderTicketView;
};

const mapTicketRows = async (ticketJoinRows: OrderTicketJoinRow[]) => {
  if (!ticketJoinRows.length) return [];

  const ticketProductIds = [...new Set(ticketJoinRows.map((row) => row.product.id))];
  const primaryTicketImages = await loadPrimaryProductImages(ticketProductIds);

  return ticketJoinRows.map((row) => mapTicketRow(row, primaryTicketImages));
};

const mapGuestTicket = (ticket: OrderTicketView): OrderTicketView => ({
  ...ticket,
  prize: ticket.revealedAt ? ticket.prize : null,
});

const mapGuestTickets = (ticketRows: OrderTicketView[]) => ticketRows.map((ticket) => mapGuestTicket(ticket));

const mapGuestOrderDetail = (detail: OrderDetailView): OrderDetailView => ({
  ...detail,
  tickets: mapGuestTickets(detail.tickets),
});

const mapOrderDetail = (
  row: OrderRecordRow,
  itemRows: OrderItemRow[],
  primaryItemImages: Map<string, PrimaryProductImageRow>,
  shipmentRow: ShipmentRow | undefined,
  ticketRows: OrderTicketView[],
): OrderDetailView => {
  const customerSnapshot = row.order.customerDetailsJson ?? null;

  return {
    id: row.order.id,
    publicId: row.order.publicId,
    status: row.order.status,
    includesLastOnePrize: row.order.includesLastOnePrize,
    currency: row.order.currency,
    subtotalCents: row.order.subtotalCents,
    taxCents: row.order.taxCents,
    shippingCents: row.order.shippingCents,
    totalCents: row.order.totalCents,
    placedAt: row.order.placedAt,
    paidAt: row.order.paidAt,
    cancelledAt: row.order.cancelledAt,
    refundedAt: row.order.refundedAt,
    shippingAddress: row.order.shippingAddressJson,
    billingAddress: row.order.billingAddressJson ?? null,
    customer: {
      id: row.customer.id,
      email: readCustomerSnapshotField(customerSnapshot, 'email') ?? row.customer.email,
      firstName: readCustomerSnapshotField(customerSnapshot, 'firstName') ?? row.customer.firstName,
      lastName: readCustomerSnapshotField(customerSnapshot, 'lastName') ?? row.customer.lastName,
      phone: readCustomerSnapshotField(customerSnapshot, 'phone') ?? row.customer.phone,
    },
    shipment: shipmentRow
      ? {
          carrierName: shipmentRow.carrierName,
          trackingNumber: shipmentRow.trackingNumber,
          trackingUrl: shipmentRow.trackingUrl,
          shippedAt: shipmentRow.shippedAt,
          deliveredAt: shipmentRow.deliveredAt,
        }
      : null,
    items: itemRows.map((itemRow) => {
      // Product image is resolved from current product media for display only;
      // order item name/price remain historical order snapshots.
      const image = resolveNullableImage(primaryItemImages.get(itemRow.productId) ?? null);

      return {
        id: itemRow.id,
        productId: itemRow.productId,
        productName: itemRow.productName,
        productType: itemRow.productType,
        unitPriceCents: itemRow.unitPriceCents,
        quantity: itemRow.quantity,
        lineTotalCents: itemRow.lineTotalCents,
        metadata: itemRow.metadata ?? null,
        imageUrl: image.imageUrl,
        imageAltText: image.imageAltText,
      };
    }),
    tickets: ticketRows,
  };
};

const loadOrderItemRows = async (orderId: string) => {
  const itemRows = await db
    .select({
      id: orderItems.id,
      productId: orderItems.productId,
      productName: orderItems.productName,
      productType: orderItems.productType,
      unitPriceCents: orderItems.unitPriceCents,
      quantity: orderItems.quantity,
      lineTotalCents: orderItems.lineTotalCents,
      metadata: orderItems.metadata,
    })
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId))
    .orderBy(asc(orderItems.createdAt), asc(orderItems.id));

  const productIds = [...new Set(itemRows.map((item) => item.productId))];
  const primaryItemImages = await loadPrimaryProductImages(productIds);

  return {
    itemRows,
    primaryItemImages,
  };
};

const loadOrderRecord = async (whereClause: ReturnType<typeof and> | ReturnType<typeof eq>) => {
  const [row] = await db
    .select({
      order: {
        id: orders.id,
        publicId: orders.publicId,
        status: orders.status,
        includesLastOnePrize: orders.includesLastOnePrize,
        currency: orders.currency,
        subtotalCents: orders.subtotalCents,
        taxCents: orders.taxCents,
        shippingCents: orders.shippingCents,
        totalCents: orders.totalCents,
        customerDetailsJson: orders.customerDetailsJson,
        shippingAddressJson: orders.shippingAddressJson,
        billingAddressJson: orders.billingAddressJson,
        placedAt: orders.placedAt,
        paidAt: orders.paidAt,
        cancelledAt: orders.cancelledAt,
        refundedAt: orders.refundedAt,
      },
      customer: {
        id: customers.id,
        email: customers.email,
        firstName: customers.firstName,
        lastName: customers.lastName,
        phone: customers.phone,
      },
    })
    .from(orders)
    .innerJoin(customers, eq(customers.id, orders.customerId))
    .where(whereClause)
    .limit(1);

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Order not found');
  }

  return row;
};

export const loadOrderTicketRows = async (orderId: string) => {
  const ticketJoinRows = (await db
    .select({
      ticket: {
        id: tickets.id,
        ticketNumber: tickets.ticketNumber,
        revealedAt: tickets.revealedAt,
        voidedAt: tickets.voidedAt,
        voidReason: tickets.voidReason,
        createdAt: tickets.createdAt,
      },
      prize: {
        id: kujiPrizes.id,
        name: kujiPrizes.name,
        description: kujiPrizes.description,
        imageUrl: kujiPrizes.imageUrl,
        prizeCode: kujiPrizes.prizeCode,
      },
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
      },
    })
    .from(tickets)
    .innerJoin(kujiPrizes, eq(kujiPrizes.id, tickets.kujiPrizeId))
    .innerJoin(products, eq(products.id, tickets.kujiProductId))
    .where(eq(tickets.orderId, orderId))
    .orderBy(asc(tickets.createdAt), asc(tickets.id))) as OrderTicketJoinRow[];

  return mapTicketRows(ticketJoinRows);
};

export const buildGuestTicketCollection = (ticketRows: OrderTicketView[]): GuestTicketCollectionView => {
  const revealed = ticketRows.filter((ticket) => Boolean(ticket.revealedAt));
  const unrevealed = ticketRows.filter((ticket) => !ticket.revealedAt);

  return {
    tickets: ticketRows,
    revealed,
    unrevealed,
    counts: {
      total: ticketRows.length,
      revealed: revealed.length,
      unrevealed: unrevealed.length,
    },
  };
};

const loadOrderChildren = async (orderId: string) => {
  const [itemResult, shipmentRow, ticketRows] = await Promise.all([
    loadOrderItemRows(orderId),
    db
      .select({
        carrierName: shipments.carrierName,
        trackingNumber: shipments.trackingNumber,
        trackingUrl: shipments.trackingUrl,
        shippedAt: shipments.shippedAt,
        deliveredAt: shipments.deliveredAt,
      })
      .from(shipments)
      .where(eq(shipments.orderId, orderId))
      .limit(1),
    loadOrderTicketRows(orderId),
  ]);

  return {
    itemRows: itemResult.itemRows,
    primaryItemImages: itemResult.primaryItemImages,
    shipmentRow: shipmentRow[0],
    ticketRows,
  };
};

export const getOrderDetailById = async (orderId: string) => {
  const row = await loadOrderRecord(eq(orders.id, orderId));
  const children = await loadOrderChildren(orderId);
  return mapOrderDetail(row, children.itemRows, children.primaryItemImages, children.shipmentRow, children.ticketRows);
};

export const getGuestOrderViewByOrderId = async (orderId: string) => {
  const detail = await getOrderDetailById(orderId);
  return mapGuestOrderDetail(detail);
};

const getOrderDetailByPublicId = async (publicId: string) => {
  const row = await loadOrderRecord(eq(orders.publicId, publicId));
  const children = await loadOrderChildren(row.order.id);
  return mapOrderDetail(row, children.itemRows, children.primaryItemImages, children.shipmentRow, children.ticketRows);
};

export const getGuestTicketViewByOrderId = async (orderId: string) => {
  const ticketRows = mapGuestTickets(await loadOrderTicketRows(orderId));
  return buildGuestTicketCollection(ticketRows);
};

export const getGuestTicketViewById = async (orderId: string, ticketId: string) => {
  const [row] = (await db
    .select({
      ticket: {
        id: tickets.id,
        ticketNumber: tickets.ticketNumber,
        revealedAt: tickets.revealedAt,
        voidedAt: tickets.voidedAt,
        voidReason: tickets.voidReason,
        createdAt: tickets.createdAt,
      },
      prize: {
        id: kujiPrizes.id,
        name: kujiPrizes.name,
        description: kujiPrizes.description,
        imageUrl: kujiPrizes.imageUrl,
        prizeCode: kujiPrizes.prizeCode,
      },
      product: {
        id: products.id,
        name: products.name,
        slug: products.slug,
      },
    })
    .from(tickets)
    .innerJoin(kujiPrizes, eq(kujiPrizes.id, tickets.kujiPrizeId))
    .innerJoin(products, eq(products.id, tickets.kujiProductId))
    .where(and(eq(tickets.orderId, orderId), eq(tickets.id, ticketId)))
    .limit(1)) as OrderTicketJoinRow[];

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Ticket not found');
  }

  const primaryTicketImages = await loadPrimaryProductImages([row.product.id]);
  return mapGuestTicket(mapTicketRow(row, primaryTicketImages));
};

export const getGuestOrderView = async (publicId: string) => {
  const detail = await getOrderDetailByPublicId(publicId);
  return mapGuestOrderDetail(detail);
};

export const getGuestTicketView = async (publicId: string) => {
  const row = await loadOrderRecord(eq(orders.publicId, publicId));
  return getGuestTicketViewByOrderId(row.order.id);
};
