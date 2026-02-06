import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  variantId: z.string(),
  productName: z.string().max(150),
  variantName: z.string().max(100).optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().max(3).optional()
}).strict();
export const OrderItemCreateManyOrderInputObjectSchema: z.ZodType<Prisma.OrderItemCreateManyOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateManyOrderInput>;
export const OrderItemCreateManyOrderInputObjectZodSchema = makeSchema();
