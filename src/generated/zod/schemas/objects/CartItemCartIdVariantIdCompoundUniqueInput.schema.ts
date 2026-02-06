import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  cartId: z.string(),
  variantId: z.string()
}).strict();
export const CartItemCartIdVariantIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CartItemCartIdVariantIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCartIdVariantIdCompoundUniqueInput>;
export const CartItemCartIdVariantIdCompoundUniqueInputObjectZodSchema = makeSchema();
