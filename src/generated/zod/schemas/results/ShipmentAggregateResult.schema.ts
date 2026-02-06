import * as z from 'zod';
export const ShipmentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    orderId: z.number(),
    status: z.number(),
    carrier: z.number(),
    serviceLevel: z.number(),
    trackingNumber: z.number(),
    trackingUrl: z.number(),
    shippedAt: z.number(),
    deliveredAt: z.number(),
    canceledAt: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    order: z.number(),
    items: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    carrier: z.string().nullable(),
    serviceLevel: z.string().nullable(),
    trackingNumber: z.string().nullable(),
    trackingUrl: z.string().nullable(),
    shippedAt: z.date().nullable(),
    deliveredAt: z.date().nullable(),
    canceledAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    carrier: z.string().nullable(),
    serviceLevel: z.string().nullable(),
    trackingNumber: z.string().nullable(),
    trackingUrl: z.string().nullable(),
    shippedAt: z.date().nullable(),
    deliveredAt: z.date().nullable(),
    canceledAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});