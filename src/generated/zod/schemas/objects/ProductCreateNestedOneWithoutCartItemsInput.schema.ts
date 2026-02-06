import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutCartItemsInputObjectSchema as ProductCreateWithoutCartItemsInputObjectSchema } from './ProductCreateWithoutCartItemsInput.schema';
import { ProductUncheckedCreateWithoutCartItemsInputObjectSchema as ProductUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCartItemsInput.schema';
import { ProductCreateOrConnectWithoutCartItemsInputObjectSchema as ProductCreateOrConnectWithoutCartItemsInputObjectSchema } from './ProductCreateOrConnectWithoutCartItemsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutCartItemsInput>;
export const ProductCreateNestedOneWithoutCartItemsInputObjectZodSchema = makeSchema();
