import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutCollectionsInputObjectSchema as ProductCreateNestedOneWithoutCollectionsInputObjectSchema } from './ProductCreateNestedOneWithoutCollectionsInput.schema';
import { CollectionCreateNestedOneWithoutProductsInputObjectSchema as CollectionCreateNestedOneWithoutProductsInputObjectSchema } from './CollectionCreateNestedOneWithoutProductsInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.number().int().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutCollectionsInputObjectSchema),
  collection: z.lazy(() => CollectionCreateNestedOneWithoutProductsInputObjectSchema)
}).strict();
export const ProductCollectionCreateInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateInput>;
export const ProductCollectionCreateInputObjectZodSchema = makeSchema();
