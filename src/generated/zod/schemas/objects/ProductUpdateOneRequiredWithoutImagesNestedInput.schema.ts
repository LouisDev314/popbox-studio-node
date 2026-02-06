import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutImagesInputObjectSchema as ProductCreateWithoutImagesInputObjectSchema } from './ProductCreateWithoutImagesInput.schema';
import { ProductUncheckedCreateWithoutImagesInputObjectSchema as ProductUncheckedCreateWithoutImagesInputObjectSchema } from './ProductUncheckedCreateWithoutImagesInput.schema';
import { ProductCreateOrConnectWithoutImagesInputObjectSchema as ProductCreateOrConnectWithoutImagesInputObjectSchema } from './ProductCreateOrConnectWithoutImagesInput.schema';
import { ProductUpsertWithoutImagesInputObjectSchema as ProductUpsertWithoutImagesInputObjectSchema } from './ProductUpsertWithoutImagesInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutImagesInputObjectSchema as ProductUpdateToOneWithWhereWithoutImagesInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutImagesInput.schema';
import { ProductUpdateWithoutImagesInputObjectSchema as ProductUpdateWithoutImagesInputObjectSchema } from './ProductUpdateWithoutImagesInput.schema';
import { ProductUncheckedUpdateWithoutImagesInputObjectSchema as ProductUncheckedUpdateWithoutImagesInputObjectSchema } from './ProductUncheckedUpdateWithoutImagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutImagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutImagesInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutImagesInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutImagesInputObjectSchema), z.lazy(() => ProductUpdateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutImagesInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutImagesNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutImagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutImagesNestedInput>;
export const ProductUpdateOneRequiredWithoutImagesNestedInputObjectZodSchema = makeSchema();
