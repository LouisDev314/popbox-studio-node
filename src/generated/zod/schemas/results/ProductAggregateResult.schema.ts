import * as z from 'zod';
export const ProductAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    description: z.number(),
    vendor: z.number(),
    categoryId: z.number(),
    isActive: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    category: z.number(),
    variants: z.number(),
    images: z.number(),
    collections: z.number(),
    wishlistItems: z.number(),
    cartItems: z.number(),
    orderItems: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    vendor: z.string().nullable(),
    categoryId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    vendor: z.string().nullable(),
    categoryId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});