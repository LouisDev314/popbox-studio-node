import * as z from 'zod';
export const OrderItemAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    orderId: z.number(),
    productId: z.number(),
    variantId: z.number(),
    productName: z.number(),
    variantName: z.number(),
    quantity: z.number(),
    unitPrice: z.number(),
    currency: z.number(),
    order: z.number(),
    product: z.number(),
    variant: z.number(),
    shipmentItems: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable(),
    unitPrice: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable(),
    unitPrice: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    productId: z.string().nullable(),
    variantId: z.string().nullable(),
    productName: z.string().nullable(),
    variantName: z.string().nullable(),
    quantity: z.number().int().nullable(),
    unitPrice: z.bigint().nullable(),
    currency: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    productId: z.string().nullable(),
    variantId: z.string().nullable(),
    productName: z.string().nullable(),
    variantName: z.string().nullable(),
    quantity: z.number().int().nullable(),
    unitPrice: z.bigint().nullable(),
    currency: z.string().nullable()
  }).nullable().optional()});