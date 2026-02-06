import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId: z.string(),
  productId: z.string(),
  quantity: z.number().int()
}).strict();
export const CartItemUncheckedCreateWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateWithoutVariantInput>;
export const CartItemUncheckedCreateWithoutVariantInputObjectZodSchema = makeSchema();
