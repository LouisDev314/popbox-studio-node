import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateNestedOneWithoutItemsInputObjectSchema as CartCreateNestedOneWithoutItemsInputObjectSchema } from './CartCreateNestedOneWithoutItemsInput.schema';
import { ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema as ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema } from './ProductVariantCreateNestedOneWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  cart: z.lazy(() => CartCreateNestedOneWithoutItemsInputObjectSchema),
  variant: z.lazy(() => ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema)
}).strict();
export const CartItemCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.CartItemCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateWithoutProductInput>;
export const CartItemCreateWithoutProductInputObjectZodSchema = makeSchema();
