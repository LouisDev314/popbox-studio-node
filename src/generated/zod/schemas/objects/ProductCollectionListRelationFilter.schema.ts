import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './ProductCollectionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProductCollectionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProductCollectionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProductCollectionWhereInputObjectSchema).optional()
}).strict();
export const ProductCollectionListRelationFilterObjectSchema: z.ZodType<Prisma.ProductCollectionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionListRelationFilter>;
export const ProductCollectionListRelationFilterObjectZodSchema = makeSchema();
