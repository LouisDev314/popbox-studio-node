import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutWishlistItemsInputObjectSchema as ProductUpdateWithoutWishlistItemsInputObjectSchema } from './ProductUpdateWithoutWishlistItemsInput.schema';
import { ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema as ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutWishlistItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutWishlistItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutWishlistItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutWishlistItemsInput>;
export const ProductUpdateToOneWithWhereWithoutWishlistItemsInputObjectZodSchema = makeSchema();
