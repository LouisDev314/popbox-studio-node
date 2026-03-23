import { ORDER_STATUS } from '../constants/order-status';
import z from 'zod';

export const paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export const productListQuerySchema = paginationQuerySchema.extend({
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const productBodySchema = z.object({
  collectionId: z.uuid().optional().nullable(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  productType: z.enum(['standard', 'kuji']),
  status: z.enum(['draft', 'active', 'archived']),
  priceCents: z.coerce.number().int().min(0),
  currency: z.literal('CAD').optional(),
  sku: z.string().optional().nullable(),
  tagIds: z.array(z.uuid()).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
  onHand: z.coerce.number().int().min(0).optional(),
});

export const productPatchBodySchema = productBodySchema.partial();

export const productIdParamsSchema = z.object({
  id: z.uuid(),
});

export const productImageParamsSchema = z.object({
  id: z.uuid(),
  imageId: z.uuid(),
});

export const collectionBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const collectionPatchBodySchema = collectionBodySchema.partial();

export const collectionParamsSchema = z.object({
  id: z.uuid(),
});

export const tagBodySchema = z.object({
  name: z.string().min(1),
  tagType: z.string().min(1),
});

export const tagPatchBodySchema = tagBodySchema.partial();

export const inventoryBodySchema = z.object({
  onHand: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
});

export const imageReorderBodySchema = z.object({
  imageIds: z.array(z.uuid()).min(1),
});

export const kujiPrizeBodySchema = z.object({
  prizeCode: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z.url().optional().nullable(),
  initialQuantity: z.coerce.number().int().min(0),
  remainingQuantity: z.coerce.number().int().min(0).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const kujiPrizePatchBodySchema = kujiPrizeBodySchema.partial();

export const kujiPrizeParamsSchema = z.object({
  id: z.uuid(),
  prizeId: z.uuid(),
});

export const adminOrderQuerySchema = paginationQuerySchema.extend({
  status: z.enum(ORDER_STATUS).optional(),
});

export const adminOrderParamsSchema = z.object({
  id: z.uuid(),
});

export const adminOrderResendParamsSchema = z.object({
  orderId: z.uuid(),
});

export const orderStatusBodySchema = z.object({
  status: z.enum([ORDER_STATUS.PACKED, ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED]),
});

export const dateTimeStringSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid datetime string');

export const shipmentBodySchema = z.object({
  carrierName: z.string().optional().nullable(),
  trackingNumber: z.string().optional().nullable(),
  trackingUrl: z.url().optional().nullable(),
  shippedAt: dateTimeStringSchema.optional().nullable(),
  deliveredAt: dateTimeStringSchema.optional().nullable(),
});

export const refundBodySchema = z.object({
  amountCents: z.coerce.number().int().min(1).optional(),
  reason: z.string().optional().nullable(),
});
