import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { ProductVariantFindManySchema as ProductVariantFindManySchema } from '../findManyProductVariant.schema';
import { ProductImageFindManySchema as ProductImageFindManySchema } from '../findManyProductImage.schema';
import { ProductCollectionFindManySchema as ProductCollectionFindManySchema } from '../findManyProductCollection.schema';
import { WishlistItemFindManySchema as WishlistItemFindManySchema } from '../findManyWishlistItem.schema';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { ProductCountOutputTypeArgsObjectSchema as ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  vendor: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  variants: z.union([z.boolean(), z.lazy(() => ProductVariantFindManySchema)]).optional(),
  images: z.union([z.boolean(), z.lazy(() => ProductImageFindManySchema)]).optional(),
  collections: z.union([z.boolean(), z.lazy(() => ProductCollectionFindManySchema)]).optional(),
  wishlistItems: z.union([z.boolean(), z.lazy(() => WishlistItemFindManySchema)]).optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  orderItems: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductSelectObjectSchema: z.ZodType<Prisma.ProductSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductSelect>;
export const ProductSelectObjectZodSchema = makeSchema();
