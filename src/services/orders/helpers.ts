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
import { and, asc, eq } from 'drizzle-orm';
import { OrderDetailView, OrderRecordRow, OrderTicketView } from '../../types/order';
import { db } from '../../db';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { buildImageUrl } from '../../utils/product';

type OrderItemWithImageRow = {
  item: typeof orderItems.$inferSelect;
  image: typeof productImages.$inferSelect | null;
};

const readCustomerSnapshotField = (
  snapshot: Record<string, unknown> | null | undefined,
  field: 'email' | 'firstName' | 'lastName' | 'phone',
) => {
  const value = snapshot?.[field];
  return typeof value === 'string' ? value : null;
};

const resolveImage = (image: typeof productImages.$inferSelect | null, fallbackAltText: string) => ({
  imageUrl: image?.storageKey ? buildImageUrl(image.storageKey) : null,
  imageAltText: image?.altText ?? fallbackAltText,
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

const loadOrderChildren = async (orderId: string) => {
  const [itemRows, shipmentRow, ticketJoinRows] = await Promise.all([
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

    db
      .select({
        ticket: tickets,
        prize: kujiPrizes,
        product: products,
        image: productImages,
      })
      .from(tickets)
      .innerJoin(kujiPrizes, eq(kujiPrizes.id, tickets.kujiPrizeId))
      .innerJoin(products, eq(products.id, tickets.kujiProductId))
      .leftJoin(productImages, and(eq(productImages.productId, products.id), eq(productImages.sortOrder, 0)))
      .where(eq(tickets.orderId, orderId))
      .orderBy(asc(tickets.createdAt), asc(tickets.id)),
  ]);

  const ticketRows: OrderTicketView[] = ticketJoinRows.map((row) => {
    const image = resolveImage(row.image, row.product.name);

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
    };
  });

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
