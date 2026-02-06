import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumShipmentStatusFilterObjectSchema as EnumShipmentStatusFilterObjectSchema } from './EnumShipmentStatusFilter.schema';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { OrderScalarRelationFilterObjectSchema as OrderScalarRelationFilterObjectSchema } from './OrderScalarRelationFilter.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { ShipmentItemListRelationFilterObjectSchema as ShipmentItemListRelationFilterObjectSchema } from './ShipmentItemListRelationFilter.schema'

const shipmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentWhereInputObjectSchema), z.lazy(() => ShipmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentWhereInputObjectSchema), z.lazy(() => ShipmentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumShipmentStatusFilterObjectSchema), ShipmentStatusSchema]).optional(),
  carrier: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  serviceLevel: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(80)]).optional().nullable(),
  trackingNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  trackingUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(512)]).optional().nullable(),
  shippedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  deliveredAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  canceledAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  order: z.union([z.lazy(() => OrderScalarRelationFilterObjectSchema), z.lazy(() => OrderWhereInputObjectSchema)]).optional(),
  items: z.lazy(() => ShipmentItemListRelationFilterObjectSchema).optional()
}).strict();
export const ShipmentWhereInputObjectSchema: z.ZodType<Prisma.ShipmentWhereInput> = shipmentwhereinputSchema as unknown as z.ZodType<Prisma.ShipmentWhereInput>;
export const ShipmentWhereInputObjectZodSchema = shipmentwhereinputSchema;
