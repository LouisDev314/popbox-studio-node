import * as z from 'zod';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';

export const ShipmentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  status: ShipmentStatusSchema.default("PENDING"),
  carrier: z.string().nullish(),
  serviceLevel: z.string().nullish(),
  trackingNumber: z.string().nullish(),
  trackingUrl: z.string().nullish(),
  shippedAt: z.date().nullish(),
  deliveredAt: z.date().nullish(),
  canceledAt: z.date().nullish(),
  metadata: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10").nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type ShipmentType = z.infer<typeof ShipmentSchema>;
