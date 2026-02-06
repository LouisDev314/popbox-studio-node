import * as z from 'zod';
export const OrderAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    orderNumber: z.number(),
    userId: z.number(),
    status: z.number(),
    subtotalAmount: z.number(),
    taxAmount: z.number(),
    shippingAmount: z.number(),
    discountAmount: z.number(),
    totalAmount: z.number(),
    currency: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.number(),
    items: z.number(),
    addresses: z.number(),
    payments: z.number(),
    shipments: z.number(),
    statusHistory: z.number()
  }).optional(),
  _sum: z.object({
    subtotalAmount: z.bigint().nullable(),
    taxAmount: z.bigint().nullable(),
    shippingAmount: z.bigint().nullable(),
    discountAmount: z.bigint().nullable(),
    totalAmount: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    subtotalAmount: z.number().nullable(),
    taxAmount: z.number().nullable(),
    shippingAmount: z.number().nullable(),
    discountAmount: z.number().nullable(),
    totalAmount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    orderNumber: z.string().nullable(),
    userId: z.string().nullable(),
    subtotalAmount: z.bigint().nullable(),
    taxAmount: z.bigint().nullable(),
    shippingAmount: z.bigint().nullable(),
    discountAmount: z.bigint().nullable(),
    totalAmount: z.bigint().nullable(),
    currency: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    orderNumber: z.string().nullable(),
    userId: z.string().nullable(),
    subtotalAmount: z.bigint().nullable(),
    taxAmount: z.bigint().nullable(),
    shippingAmount: z.bigint().nullable(),
    discountAmount: z.bigint().nullable(),
    totalAmount: z.bigint().nullable(),
    currency: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});