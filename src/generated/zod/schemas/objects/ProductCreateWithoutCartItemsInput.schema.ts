import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateNestedOneWithoutProductsInputObjectSchema as CategoryCreateNestedOneWithoutProductsInputObjectSchema } from './CategoryCreateNestedOneWithoutProductsInput.schema';
import { ProductVariantCreateNestedManyWithoutProductInputObjectSchema as ProductVariantCreateNestedManyWithoutProductInputObjectSchema } from './ProductVariantCreateNestedManyWithoutProductInput.schema';
import { ProductImageCreateNestedManyWithoutProductInputObjectSchema as ProductImageCreateNestedManyWithoutProductInputObjectSchema } from './ProductImageCreateNestedManyWithoutProductInput.schema';
import { ProductCollectionCreateNestedManyWithoutProductInputObjectSchema as ProductCollectionCreateNestedManyWithoutProductInputObjectSchema } from './ProductCollectionCreateNestedManyWithoutProductInput.schema';
import { WishlistItemCreateNestedManyWithoutProductInputObjectSchema as WishlistItemCreateNestedManyWithoutProductInputObjectSchema } from './WishlistItemCreateNestedManyWithoutProductInput.schema';
import { OrderItemCreateNestedManyWithoutProductInputObjectSchema as OrderItemCreateNestedManyWithoutProductInputObjectSchema } from './OrderItemCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150),
  description: z.string().optional().nullable(),
  vendor: z.string().max(100).optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutProductsInputObjectSchema),
  variants: z.lazy(() => ProductVariantCreateNestedManyWithoutProductInputObjectSchema).optional(),
  images: z.lazy(() => ProductImageCreateNestedManyWithoutProductInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionCreateNestedManyWithoutProductInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutCartItemsInput>;
export const ProductCreateWithoutCartItemsInputObjectZodSchema = makeSchema();
