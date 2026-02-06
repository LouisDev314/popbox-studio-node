import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const productvariantscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductVariantScalarWhereInputObjectSchema), z.lazy(() => ProductVariantScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductVariantScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductVariantScalarWhereInputObjectSchema), z.lazy(() => ProductVariantScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  price: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  stock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  reservedStock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  imageObjectKey: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ProductVariantScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductVariantScalarWhereInput> = productvariantscalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductVariantScalarWhereInput>;
export const ProductVariantScalarWhereInputObjectZodSchema = productvariantscalarwhereinputSchema;
