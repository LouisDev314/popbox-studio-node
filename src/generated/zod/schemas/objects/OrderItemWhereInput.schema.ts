import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { OrderScalarRelationFilterObjectSchema as OrderScalarRelationFilterObjectSchema } from './OrderScalarRelationFilter.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductVariantScalarRelationFilterObjectSchema as ProductVariantScalarRelationFilterObjectSchema } from './ProductVariantScalarRelationFilter.schema';
import { ProductVariantWhereInputObjectSchema as ProductVariantWhereInputObjectSchema } from './ProductVariantWhereInput.schema';
import { ShipmentItemListRelationFilterObjectSchema as ShipmentItemListRelationFilterObjectSchema } from './ShipmentItemListRelationFilter.schema'

const orderitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderItemWhereInputObjectSchema), z.lazy(() => OrderItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderItemWhereInputObjectSchema), z.lazy(() => OrderItemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  variantId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(150)]).optional(),
  variantName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  unitPrice: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(3)]).optional(),
  order: z.union([z.lazy(() => OrderScalarRelationFilterObjectSchema), z.lazy(() => OrderWhereInputObjectSchema)]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  variant: z.union([z.lazy(() => ProductVariantScalarRelationFilterObjectSchema), z.lazy(() => ProductVariantWhereInputObjectSchema)]).optional(),
  shipmentItems: z.lazy(() => ShipmentItemListRelationFilterObjectSchema).optional()
}).strict();
export const OrderItemWhereInputObjectSchema: z.ZodType<Prisma.OrderItemWhereInput> = orderitemwhereinputSchema as unknown as z.ZodType<Prisma.OrderItemWhereInput>;
export const OrderItemWhereInputObjectZodSchema = orderitemwhereinputSchema;
