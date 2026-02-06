import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCountOutputTypeCountVariantsArgsObjectSchema as ProductCountOutputTypeCountVariantsArgsObjectSchema } from './ProductCountOutputTypeCountVariantsArgs.schema';
import { ProductCountOutputTypeCountImagesArgsObjectSchema as ProductCountOutputTypeCountImagesArgsObjectSchema } from './ProductCountOutputTypeCountImagesArgs.schema';
import { ProductCountOutputTypeCountCollectionsArgsObjectSchema as ProductCountOutputTypeCountCollectionsArgsObjectSchema } from './ProductCountOutputTypeCountCollectionsArgs.schema';
import { ProductCountOutputTypeCountWishlistItemsArgsObjectSchema as ProductCountOutputTypeCountWishlistItemsArgsObjectSchema } from './ProductCountOutputTypeCountWishlistItemsArgs.schema';
import { ProductCountOutputTypeCountCartItemsArgsObjectSchema as ProductCountOutputTypeCountCartItemsArgsObjectSchema } from './ProductCountOutputTypeCountCartItemsArgs.schema';
import { ProductCountOutputTypeCountOrderItemsArgsObjectSchema as ProductCountOutputTypeCountOrderItemsArgsObjectSchema } from './ProductCountOutputTypeCountOrderItemsArgs.schema'

const makeSchema = () => z.object({
  variants: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountVariantsArgsObjectSchema)]).optional(),
  images: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountImagesArgsObjectSchema)]).optional(),
  collections: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCollectionsArgsObjectSchema)]).optional(),
  wishlistItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountWishlistItemsArgsObjectSchema)]).optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountCartItemsArgsObjectSchema)]).optional(),
  orderItems: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountOrderItemsArgsObjectSchema)]).optional()
}).strict();
export const ProductCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountOutputTypeSelect>;
export const ProductCountOutputTypeSelectObjectZodSchema = makeSchema();
