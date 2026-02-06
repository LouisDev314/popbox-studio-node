import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutWishlistItemsInputObjectSchema as ProductCreateWithoutWishlistItemsInputObjectSchema } from './ProductCreateWithoutWishlistItemsInput.schema';
import { ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema as ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema } from './ProductUncheckedCreateWithoutWishlistItemsInput.schema';
import { ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema as ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema } from './ProductCreateOrConnectWithoutWishlistItemsInput.schema';
import { ProductUpsertWithoutWishlistItemsInputObjectSchema as ProductUpsertWithoutWishlistItemsInputObjectSchema } from './ProductUpsertWithoutWishlistItemsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutWishlistItemsInputObjectSchema as ProductUpdateToOneWithWhereWithoutWishlistItemsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutWishlistItemsInput.schema';
import { ProductUpdateWithoutWishlistItemsInputObjectSchema as ProductUpdateWithoutWishlistItemsInputObjectSchema } from './ProductUpdateWithoutWishlistItemsInput.schema';
import { ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema as ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutWishlistItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWishlistItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutWishlistItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutWishlistItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUpdateWithoutWishlistItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutWishlistItemsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutWishlistItemsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutWishlistItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutWishlistItemsNestedInput>;
export const ProductUpdateOneRequiredWithoutWishlistItemsNestedInputObjectZodSchema = makeSchema();
