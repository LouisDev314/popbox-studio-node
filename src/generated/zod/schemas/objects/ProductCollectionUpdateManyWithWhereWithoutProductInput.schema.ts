import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionScalarWhereInputObjectSchema as ProductCollectionScalarWhereInputObjectSchema } from './ProductCollectionScalarWhereInput.schema';
import { ProductCollectionUpdateManyMutationInputObjectSchema as ProductCollectionUpdateManyMutationInputObjectSchema } from './ProductCollectionUpdateManyMutationInput.schema';
import { ProductCollectionUncheckedUpdateManyWithoutProductInputObjectSchema as ProductCollectionUncheckedUpdateManyWithoutProductInputObjectSchema } from './ProductCollectionUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductCollectionUpdateManyMutationInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const ProductCollectionUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyWithWhereWithoutProductInput>;
export const ProductCollectionUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
