import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int()
}).strict();
export const CartItemCreateManyInputObjectSchema: z.ZodType<Prisma.CartItemCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyInput>;
export const CartItemCreateManyInputObjectZodSchema = makeSchema();
