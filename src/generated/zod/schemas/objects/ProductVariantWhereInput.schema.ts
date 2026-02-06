import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { CartItemListRelationFilterObjectSchema as CartItemListRelationFilterObjectSchema } from './CartItemListRelationFilter.schema';
import { OrderItemListRelationFilterObjectSchema as OrderItemListRelationFilterObjectSchema } from './OrderItemListRelationFilter.schema'

const productvariantwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductVariantWhereInputObjectSchema), z.lazy(() => ProductVariantWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductVariantWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductVariantWhereInputObjectSchema), z.lazy(() => ProductVariantWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(100)]).optional(),
  price: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(3)]).optional(),
  stock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  reservedStock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  imageObjectKey: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(512)]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  cartItems: z.lazy(() => CartItemListRelationFilterObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemListRelationFilterObjectSchema).optional()
}).strict();
export const ProductVariantWhereInputObjectSchema: z.ZodType<Prisma.ProductVariantWhereInput> = productvariantwhereinputSchema as unknown as z.ZodType<Prisma.ProductVariantWhereInput>;
export const ProductVariantWhereInputObjectZodSchema = productvariantwhereinputSchema;
