import { customers, orders } from '../db/schema';

export type OrdersCursor = {
  createdAt: string;
  id: string;
};

export type OrderTicketView = {
  id: string;
  ticketNumber: string;
  revealedAt: Date | null;
  voidedAt: Date | null;
  voidReason: string | null;
  prize: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    prizeCode: string;
  } | null;
  kujiProduct: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    imageAltText: string | null;
  };
  createdAt: Date;
};

export type OrderDetailView = {
  id: string;
  publicId: string;
  status: string;
  includesLastOnePrize: boolean;
  currency: string;
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  placedAt: Date | null;
  paidAt: Date | null;
  cancelledAt: Date | null;
  refundedAt: Date | null;
  shippingAddress: Record<string, unknown>;
  billingAddress: Record<string, unknown> | null;
  customer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  };
  shipment: {
    carrierName: string | null;
    trackingNumber: string | null;
    trackingUrl: string | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
  } | null;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    productType: string;
    unitPriceCents: number;
    quantity: number;
    lineTotalCents: number;
    metadata: Record<string, unknown> | null;
    imageUrl: string | null;
    imageAltText: string | null;
  }>;
  tickets: OrderTicketView[];
};

export type OrderRecordRow = {
  order: typeof orders.$inferSelect;
  customer: typeof customers.$inferSelect;
};
