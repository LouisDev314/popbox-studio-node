import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemCartIdVariantIdCompoundUniqueInputObjectSchema as CartItemCartIdVariantIdCompoundUniqueInputObjectSchema } from './CartItemCartIdVariantIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  cartId_variantId: z.lazy(() => CartItemCartIdVariantIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CartItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.CartItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemWhereUniqueInput>;
export const CartItemWhereUniqueInputObjectZodSchema = makeSchema();
