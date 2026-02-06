import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutCartItemsInputObjectSchema as ProductCreateWithoutCartItemsInputObjectSchema } from './ProductCreateWithoutCartItemsInput.schema';
import { ProductUncheckedCreateWithoutCartItemsInputObjectSchema as ProductUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCartItemsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutCartItemsInput>;
export const ProductCreateOrConnectWithoutCartItemsInputObjectZodSchema = makeSchema();
