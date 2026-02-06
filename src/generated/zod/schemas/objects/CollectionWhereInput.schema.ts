import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { ProductCollectionListRelationFilterObjectSchema as ProductCollectionListRelationFilterObjectSchema } from './ProductCollectionListRelationFilter.schema'

const collectionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CollectionWhereInputObjectSchema), z.lazy(() => CollectionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CollectionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CollectionWhereInputObjectSchema), z.lazy(() => CollectionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(150)]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  products: z.lazy(() => ProductCollectionListRelationFilterObjectSchema).optional()
}).strict();
export const CollectionWhereInputObjectSchema: z.ZodType<Prisma.CollectionWhereInput> = collectionwhereinputSchema as unknown as z.ZodType<Prisma.CollectionWhereInput>;
export const CollectionWhereInputObjectZodSchema = collectionwhereinputSchema;
