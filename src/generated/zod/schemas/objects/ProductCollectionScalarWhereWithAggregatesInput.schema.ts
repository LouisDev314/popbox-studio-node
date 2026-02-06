import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

const productcollectionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductCollectionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductCollectionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductCollectionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  productId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  collectionId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ProductCollectionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProductCollectionScalarWhereWithAggregatesInput> = productcollectionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProductCollectionScalarWhereWithAggregatesInput>;
export const ProductCollectionScalarWhereWithAggregatesInputObjectZodSchema = productcollectionscalarwherewithaggregatesinputSchema;
