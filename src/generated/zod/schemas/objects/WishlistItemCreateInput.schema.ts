import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistCreateNestedOneWithoutItemsInputObjectSchema as WishlistCreateNestedOneWithoutItemsInputObjectSchema } from './WishlistCreateNestedOneWithoutItemsInput.schema';
import { ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema as ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema } from './ProductCreateNestedOneWithoutWishlistItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  wishlist: z.lazy(() => WishlistCreateNestedOneWithoutItemsInputObjectSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema)
}).strict();
export const WishlistItemCreateInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateInput>;
export const WishlistItemCreateInputObjectZodSchema = makeSchema();
