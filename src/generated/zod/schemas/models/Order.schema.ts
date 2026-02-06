import * as z from 'zod';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';

export const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  userId: z.string(),
  status: OrderStatusSchema.default("PENDING"),
  subtotalAmount: z.bigint(),
  taxAmount: z.bigint(),
  shippingAmount: z.bigint(),
  discountAmount: z.bigint(),
  totalAmount: z.bigint(),
  currency: z.string().default("CAD"),
  metadata: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10").nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type OrderType = z.infer<typeof OrderSchema>;
