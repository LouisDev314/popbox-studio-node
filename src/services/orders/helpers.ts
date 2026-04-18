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
import { OrderDetailView, OrderRecordRow, OrderTicketView } from '../../types/order';
import { db } from '../../db';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { buildImageUrl } from '../../utils/product';

type OrderItemWithImageRow = {
  item: typeof orderItems.$inferSelect;
  image: typeof productImages.$inferSelect | null;
};

type OrderTicketJoinRow = {
  ticket: typeof tickets.$inferSelect;
  prize: typeof kujiPrizes.$inferSelect;
  product: typeof products.$inferSelect;
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
  itemRows: OrderItemWithImageRow[],
  shipmentRow: typeof shipments.$inferSelect | undefined,
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
      const image = resolveImage(itemRow.image, itemRow.item.productName);

      return {
        id: itemRow.item.id,
        productId: itemRow.item.productId,
        productName: itemRow.item.productName,
        productType: itemRow.item.productType,
        unitPriceCents: itemRow.item.unitPriceCents,
        quantity: itemRow.item.quantity,
        lineTotalCents: itemRow.item.lineTotalCents,
        metadata: itemRow.item.metadata ?? null,
        imageUrl: image.imageUrl,
        imageAltText: image.imageAltText,
      };
    }),
    tickets: ticketRows,
  };
};

const loadOrderRecord = async (whereClause: ReturnType<typeof and> | ReturnType<typeof eq>) => {
  const [row] = await db
    .select({
      order: orders,
      customer: customers,
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
      ticket: tickets,
      prize: kujiPrizes,
      product: products,
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
  const [itemRows, shipmentRow, ticketRows] = await Promise.all([
    db
      .select({
        item: orderItems,
        image: productImages,
      })
      .from(orderItems)
      .innerJoin(products, eq(products.id, orderItems.productId))
      .leftJoin(productImages, and(eq(productImages.productId, products.id), eq(productImages.sortOrder, 0)))
      .where(eq(orderItems.orderId, orderId))
      .orderBy(asc(orderItems.createdAt), asc(orderItems.id)),

    db.select().from(shipments).where(eq(shipments.orderId, orderId)).limit(1),
    loadOrderTicketRows(orderId),
  ]);

  return {
    itemRows,
    shipmentRow: shipmentRow[0],
    ticketRows,
  };
};

export const getOrderDetailById = async (orderId: string) => {
  const row = await loadOrderRecord(eq(orders.id, orderId));
  const children = await loadOrderChildren(orderId);
  return mapOrderDetail(row, children.itemRows, children.shipmentRow, children.ticketRows);
};

const getOrderDetailByPublicId = async (publicId: string) => {
  const row = await loadOrderRecord(eq(orders.publicId, publicId));
  const children = await loadOrderChildren(row.order.id);
  return mapOrderDetail(row, children.itemRows, children.shipmentRow, children.ticketRows);
};

export const getGuestTicketViewByOrderId = async (orderId: string) => {
  const ticketRows = mapGuestTickets(await loadOrderTicketRows(orderId));
  return buildGuestTicketCollection(ticketRows);
};

export const getGuestTicketViewById = async (orderId: string, ticketId: string) => {
  const [row] = (await db
    .select({
      ticket: tickets,
      prize: kujiPrizes,
      product: products,
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
