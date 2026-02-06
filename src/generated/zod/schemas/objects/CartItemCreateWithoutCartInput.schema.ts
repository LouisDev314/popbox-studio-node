import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutCartItemsInputObjectSchema as ProductCreateNestedOneWithoutCartItemsInputObjectSchema } from './ProductCreateNestedOneWithoutCartItemsInput.schema';
import { ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema as ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema } from './ProductVariantCreateNestedOneWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  product: z.lazy(() => ProductCreateNestedOneWithoutCartItemsInputObjectSchema),
  variant: z.lazy(() => ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema)
}).strict();
export const CartItemCreateWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemCreateWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateWithoutCartInput>;
export const CartItemCreateWithoutCartInputObjectZodSchema = makeSchema();
