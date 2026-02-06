import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionCreateNestedOneWithoutProductsInputObjectSchema as CollectionCreateNestedOneWithoutProductsInputObjectSchema } from './CollectionCreateNestedOneWithoutProductsInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.number().int().optional(),
  collection: z.lazy(() => CollectionCreateNestedOneWithoutProductsInputObjectSchema)
}).strict();
export const ProductCollectionCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateWithoutProductInput>;
export const ProductCollectionCreateWithoutProductInputObjectZodSchema = makeSchema();
