import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionScalarWhereInputObjectSchema as ProductCollectionScalarWhereInputObjectSchema } from './ProductCollectionScalarWhereInput.schema';
import { ProductCollectionUpdateManyMutationInputObjectSchema as ProductCollectionUpdateManyMutationInputObjectSchema } from './ProductCollectionUpdateManyMutationInput.schema';
import { ProductCollectionUncheckedUpdateManyWithoutCollectionInputObjectSchema as ProductCollectionUncheckedUpdateManyWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedUpdateManyWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductCollectionUpdateManyMutationInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateManyWithoutCollectionInputObjectSchema)])
}).strict();
export const ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateManyWithWhereWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyWithWhereWithoutCollectionInput>;
export const ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectZodSchema = makeSchema();
