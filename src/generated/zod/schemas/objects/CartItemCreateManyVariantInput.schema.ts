import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId: z.string(),
  productId: z.string(),
  quantity: z.number().int()
}).strict();
export const CartItemCreateManyVariantInputObjectSchema: z.ZodType<Prisma.CartItemCreateManyVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyVariantInput>;
export const CartItemCreateManyVariantInputObjectZodSchema = makeSchema();
