import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateNestedOneWithoutProductsInputObjectSchema as CategoryCreateNestedOneWithoutProductsInputObjectSchema } from './CategoryCreateNestedOneWithoutProductsInput.schema';
import { ProductImageCreateNestedManyWithoutProductInputObjectSchema as ProductImageCreateNestedManyWithoutProductInputObjectSchema } from './ProductImageCreateNestedManyWithoutProductInput.schema';
import { ProductCollectionCreateNestedManyWithoutProductInputObjectSchema as ProductCollectionCreateNestedManyWithoutProductInputObjectSchema } from './ProductCollectionCreateNestedManyWithoutProductInput.schema';
import { WishlistItemCreateNestedManyWithoutProductInputObjectSchema as WishlistItemCreateNestedManyWithoutProductInputObjectSchema } from './WishlistItemCreateNestedManyWithoutProductInput.schema';
import { CartItemCreateNestedManyWithoutProductInputObjectSchema as CartItemCreateNestedManyWithoutProductInputObjectSchema } from './CartItemCreateNestedManyWithoutProductInput.schema';
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
  images: z.lazy(() => ProductImageCreateNestedManyWithoutProductInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionCreateNestedManyWithoutProductInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutVariantsInput>;
export const ProductCreateWithoutVariantsInputObjectZodSchema = makeSchema();
