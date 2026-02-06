import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutWishlistItemsInputObjectSchema as ProductCreateWithoutWishlistItemsInputObjectSchema } from './ProductCreateWithoutWishlistItemsInput.schema';
import { ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema as ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema } from './ProductUncheckedCreateWithoutWishlistItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutWishlistItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutWishlistItemsInput>;
export const ProductCreateOrConnectWithoutWishlistItemsInputObjectZodSchema = makeSchema();
