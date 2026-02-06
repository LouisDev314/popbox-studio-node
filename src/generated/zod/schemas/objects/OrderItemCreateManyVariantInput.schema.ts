import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  productId: z.string(),
  productName: z.string().max(150),
  variantName: z.string().max(100).optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().max(3).optional()
}).strict();
export const OrderItemCreateManyVariantInputObjectSchema: z.ZodType<Prisma.OrderItemCreateManyVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateManyVariantInput>;
export const OrderItemCreateManyVariantInputObjectZodSchema = makeSchema();
