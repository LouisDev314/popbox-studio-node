import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema as ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema } from './ProductCreateNestedOneWithoutWishlistItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema)
}).strict();
export const WishlistItemCreateWithoutWishlistInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateWithoutWishlistInput>;
export const WishlistItemCreateWithoutWishlistInputObjectZodSchema = makeSchema();
