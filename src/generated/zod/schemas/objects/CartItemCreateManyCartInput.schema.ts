import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int()
}).strict();
export const CartItemCreateManyCartInputObjectSchema: z.ZodType<Prisma.CartItemCreateManyCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateManyCartInput>;
export const CartItemCreateManyCartInputObjectZodSchema = makeSchema();
