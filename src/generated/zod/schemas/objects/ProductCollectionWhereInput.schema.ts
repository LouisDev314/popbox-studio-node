import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { CollectionScalarRelationFilterObjectSchema as CollectionScalarRelationFilterObjectSchema } from './CollectionScalarRelationFilter.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './CollectionWhereInput.schema'

const productcollectionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductCollectionWhereInputObjectSchema), z.lazy(() => ProductCollectionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductCollectionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductCollectionWhereInputObjectSchema), z.lazy(() => ProductCollectionWhereInputObjectSchema).array()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  collectionId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  collection: z.union([z.lazy(() => CollectionScalarRelationFilterObjectSchema), z.lazy(() => CollectionWhereInputObjectSchema)]).optional()
}).strict();
export const ProductCollectionWhereInputObjectSchema: z.ZodType<Prisma.ProductCollectionWhereInput> = productcollectionwhereinputSchema as unknown as z.ZodType<Prisma.ProductCollectionWhereInput>;
export const ProductCollectionWhereInputObjectZodSchema = productcollectionwhereinputSchema;
