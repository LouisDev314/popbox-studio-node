import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantUncheckedCreateNestedManyWithoutProductInputObjectSchema as ProductVariantUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './ProductVariantUncheckedCreateNestedManyWithoutProductInput.schema';
import { ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema as ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './ProductImageUncheckedCreateNestedManyWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateNestedManyWithoutProductInput.schema';
import { WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './WishlistItemUncheckedCreateNestedManyWithoutProductInput.schema';
import { CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  vendor: z.string().optional().nullable(),
  categoryId: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  variants: z.lazy(() => ProductVariantUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  images: z.lazy(() => ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductUncheckedCreateWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateWithoutOrderItemsInput>;
export const ProductUncheckedCreateWithoutOrderItemsInputObjectZodSchema = makeSchema();
