import * as z from 'zod';
export const ShipmentUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  orderId: z.string(),
  status: z.unknown(),
  carrier: z.string().optional(),
  serviceLevel: z.string().optional(),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  canceledAt: z.date().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  order: z.unknown(),
  items: z.array(z.unknown())
}));