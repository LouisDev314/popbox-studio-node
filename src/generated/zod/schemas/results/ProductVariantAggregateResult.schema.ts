import * as z from 'zod';
export const ProductVariantAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    productId: z.number(),
    name: z.number(),
    price: z.number(),
    currency: z.number(),
    stock: z.number(),
    reservedStock: z.number(),
    imageObjectKey: z.number(),
    isActive: z.number(),
    sortOrder: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    product: z.number(),
    cartItems: z.number(),
    orderItems: z.number()
  }).optional(),
  _sum: z.object({
    price: z.bigint().nullable(),
    stock: z.number().nullable(),
    reservedStock: z.number().nullable(),
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    price: z.number().nullable(),
    stock: z.number().nullable(),
    reservedStock: z.number().nullable(),
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    productId: z.string().nullable(),
    name: z.string().nullable(),
    price: z.bigint().nullable(),
    currency: z.string().nullable(),
    stock: z.number().int().nullable(),
    reservedStock: z.number().int().nullable(),
    imageObjectKey: z.string().nullable(),
    sortOrder: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    productId: z.string().nullable(),
    name: z.string().nullable(),
    price: z.bigint().nullable(),
    currency: z.string().nullable(),
    stock: z.number().int().nullable(),
    reservedStock: z.number().int().nullable(),
    imageObjectKey: z.string().nullable(),
    sortOrder: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});