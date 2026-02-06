import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const productimagewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductImageWhereInputObjectSchema), z.lazy(() => ProductImageWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductImageWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductImageWhereInputObjectSchema), z.lazy(() => ProductImageWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  objectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(512)]).optional(),
  altText: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(150)]).optional().nullable(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional()
}).strict();
export const ProductImageWhereInputObjectSchema: z.ZodType<Prisma.ProductImageWhereInput> = productimagewhereinputSchema as unknown as z.ZodType<Prisma.ProductImageWhereInput>;
export const ProductImageWhereInputObjectZodSchema = productimagewhereinputSchema;
