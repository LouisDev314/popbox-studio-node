import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutCollectionsInputObjectSchema as ProductCreateNestedOneWithoutCollectionsInputObjectSchema } from './ProductCreateNestedOneWithoutCollectionsInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.number().int().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutCollectionsInputObjectSchema)
}).strict();
export const ProductCollectionCreateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateWithoutCollectionInput>;
export const ProductCollectionCreateWithoutCollectionInputObjectZodSchema = makeSchema();
