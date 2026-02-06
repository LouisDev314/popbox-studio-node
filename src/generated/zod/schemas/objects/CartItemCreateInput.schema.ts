import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartCreateNestedOneWithoutItemsInputObjectSchema as CartCreateNestedOneWithoutItemsInputObjectSchema } from './CartCreateNestedOneWithoutItemsInput.schema';
import { ProductCreateNestedOneWithoutCartItemsInputObjectSchema as ProductCreateNestedOneWithoutCartItemsInputObjectSchema } from './ProductCreateNestedOneWithoutCartItemsInput.schema';
import { ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema as ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema } from './ProductVariantCreateNestedOneWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  cart: z.lazy(() => CartCreateNestedOneWithoutItemsInputObjectSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutCartItemsInputObjectSchema),
  variant: z.lazy(() => ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema)
}).strict();
export const CartItemCreateInputObjectSchema: z.ZodType<Prisma.CartItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateInput>;
export const CartItemCreateInputObjectZodSchema = makeSchema();
