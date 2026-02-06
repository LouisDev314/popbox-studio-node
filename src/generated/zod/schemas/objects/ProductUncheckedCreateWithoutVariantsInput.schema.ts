import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema as ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './ProductImageUncheckedCreateNestedManyWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateNestedManyWithoutProductInput.schema';
import { WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './WishlistItemUncheckedCreateNestedManyWithoutProductInput.schema';
import { CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutProductInput.schema';
import { OrderItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  vendor: z.string().optional().nullable(),
  categoryId: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  images: z.lazy(() => ProductImageUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductUncheckedCreateWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateWithoutVariantsInput>;
export const ProductUncheckedCreateWithoutVariantsInputObjectZodSchema = makeSchema();
