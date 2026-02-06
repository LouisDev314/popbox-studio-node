import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId: z.string(),
  variantId: z.string(),
  quantity: z.number().int()
}).strict();
export const CartItemUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateWithoutProductInput>;
export const CartItemUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
