import { customers, kujiPrizes, orderItems, orders, products, shipments, tickets } from '../../db/schema';
import { and, asc, eq } from 'drizzle-orm';
import { OrderDetailView, OrderRecordRow, OrderTicketView } from '../../types/order';
import { db } from '../../db';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';

const mapOrderDetail = (
  row: OrderRecordRow,
  itemRows: Array<typeof orderItems.$inferSelect>,
  shipmentRow: typeof shipments.$inferSelect | undefined,
  ticketRows: OrderTicketView[],
): OrderDetailView => {
  return {
    id: row.order.id,
    publicId: row.order.publicId,
    status: row.order.status,
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
      email: row.customer.email,
      firstName: row.customer.firstName,
      lastName: row.customer.lastName,
      phone: row.customer.phone,
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
    items: itemRows.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productType: item.productType,
      unitPriceCents: item.unitPriceCents,
      quantity: item.quantity,
      lineTotalCents: item.lineTotalCents,
      metadata: item.metadata ?? null,
    })),
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

const loadOrderChildren = async (orderId: string) => {
  const [itemRows, shipmentRow, ticketJoinRows] = await Promise.all([
    db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId))
      .orderBy(asc(orderItems.createdAt), asc(orderItems.id)),
    db.select().from(shipments).where(eq(shipments.orderId, orderId)).limit(1),
    db
      .select({
        ticket: tickets,
        prize: kujiPrizes,
        product: products,
      })
      .from(tickets)
      .innerJoin(kujiPrizes, eq(kujiPrizes.id, tickets.kujiPrizeId))
      .innerJoin(products, eq(products.id, tickets.kujiProductId))
      .where(eq(tickets.orderId, orderId))
      .orderBy(asc(tickets.createdAt), asc(tickets.id)),
  ]);

  const ticketRows: OrderTicketView[] = ticketJoinRows.map((row) => ({
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
    },
    createdAt: row.ticket.createdAt,
  }));

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

export const getOrderDetailByPublicId = async (publicId: string) => {
  const row = await loadOrderRecord(eq(orders.publicId, publicId));
  const children = await loadOrderChildren(row.order.id);
  return mapOrderDetail(row, children.itemRows, children.shipmentRow, children.ticketRows);
};

export const getGuestOrderView = async (publicId: string) => {
  const detail = await getOrderDetailByPublicId(publicId);

  return {
    ...detail,
    tickets: detail.tickets.map((ticket) => ({
      ...ticket,
      prize: ticket.revealedAt ? ticket.prize : null,
    })),
  };
};

export const getGuestTicketView = async (publicId: string) => {
  const detail = await getGuestOrderView(publicId);
  const revealed = detail.tickets.filter((ticket) => Boolean(ticket.revealedAt));
  const unrevealed = detail.tickets.filter((ticket) => !ticket.revealedAt);

  return {
    tickets: detail.tickets,
    revealed,
    unrevealed,
    counts: {
      total: detail.tickets.length,
      revealed: revealed.length,
      unrevealed: unrevealed.length,
    },
  };
};
