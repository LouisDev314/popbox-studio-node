import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutWishlistItemsInputObjectSchema as ProductCreateWithoutWishlistItemsInputObjectSchema } from './ProductCreateWithoutWishlistItemsInput.schema';
import { ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema as ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema } from './ProductUncheckedCreateWithoutWishlistItemsInput.schema';
import { ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema as ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema } from './ProductCreateOrConnectWithoutWishlistItemsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutWishlistItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutWishlistItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutWishlistItemsInput>;
export const ProductCreateNestedOneWithoutWishlistItemsInputObjectZodSchema = makeSchema();
