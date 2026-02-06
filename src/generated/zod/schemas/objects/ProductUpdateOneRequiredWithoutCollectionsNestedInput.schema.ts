import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutCollectionsInputObjectSchema as ProductCreateWithoutCollectionsInputObjectSchema } from './ProductCreateWithoutCollectionsInput.schema';
import { ProductUncheckedCreateWithoutCollectionsInputObjectSchema as ProductUncheckedCreateWithoutCollectionsInputObjectSchema } from './ProductUncheckedCreateWithoutCollectionsInput.schema';
import { ProductCreateOrConnectWithoutCollectionsInputObjectSchema as ProductCreateOrConnectWithoutCollectionsInputObjectSchema } from './ProductCreateOrConnectWithoutCollectionsInput.schema';
import { ProductUpsertWithoutCollectionsInputObjectSchema as ProductUpsertWithoutCollectionsInputObjectSchema } from './ProductUpsertWithoutCollectionsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutCollectionsInputObjectSchema as ProductUpdateToOneWithWhereWithoutCollectionsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutCollectionsInput.schema';
import { ProductUpdateWithoutCollectionsInputObjectSchema as ProductUpdateWithoutCollectionsInputObjectSchema } from './ProductUpdateWithoutCollectionsInput.schema';
import { ProductUncheckedUpdateWithoutCollectionsInputObjectSchema as ProductUncheckedUpdateWithoutCollectionsInputObjectSchema } from './ProductUncheckedUpdateWithoutCollectionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCollectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCollectionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutCollectionsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUpdateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCollectionsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutCollectionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutCollectionsNestedInput>;
export const ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectZodSchema = makeSchema();
