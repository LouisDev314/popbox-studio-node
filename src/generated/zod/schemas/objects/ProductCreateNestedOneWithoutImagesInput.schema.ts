import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutImagesInputObjectSchema as ProductCreateWithoutImagesInputObjectSchema } from './ProductCreateWithoutImagesInput.schema';
import { ProductUncheckedCreateWithoutImagesInputObjectSchema as ProductUncheckedCreateWithoutImagesInputObjectSchema } from './ProductUncheckedCreateWithoutImagesInput.schema';
import { ProductCreateOrConnectWithoutImagesInputObjectSchema as ProductCreateOrConnectWithoutImagesInputObjectSchema } from './ProductCreateOrConnectWithoutImagesInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutImagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutImagesInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutImagesInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutImagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutImagesInput>;
export const ProductCreateNestedOneWithoutImagesInputObjectZodSchema = makeSchema();
