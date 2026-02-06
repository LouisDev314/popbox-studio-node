import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const productimagescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductImageScalarWhereInputObjectSchema), z.lazy(() => ProductImageScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductImageScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductImageScalarWhereInputObjectSchema), z.lazy(() => ProductImageScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  objectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  altText: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ProductImageScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductImageScalarWhereInput> = productimagescalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductImageScalarWhereInput>;
export const ProductImageScalarWhereInputObjectZodSchema = productimagescalarwhereinputSchema;
