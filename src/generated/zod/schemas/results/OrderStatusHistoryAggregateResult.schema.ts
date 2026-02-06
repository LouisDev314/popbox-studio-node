import * as z from 'zod';
export const OrderStatusHistoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    orderId: z.number(),
    fromStatus: z.number(),
    toStatus: z.number(),
    reason: z.number(),
    changedBy: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    order: z.number(),
    user: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    reason: z.string().nullable(),
    changedBy: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    reason: z.string().nullable(),
    changedBy: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});