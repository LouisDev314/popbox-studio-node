import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumShipmentStatusFilterObjectSchema as EnumShipmentStatusFilterObjectSchema } from './EnumShipmentStatusFilter.schema';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const shipmentscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentScalarWhereInputObjectSchema), z.lazy(() => ShipmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentScalarWhereInputObjectSchema), z.lazy(() => ShipmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumShipmentStatusFilterObjectSchema), ShipmentStatusSchema]).optional(),
  carrier: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  serviceLevel: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  trackingNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  trackingUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  shippedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  deliveredAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  canceledAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ShipmentScalarWhereInputObjectSchema: z.ZodType<Prisma.ShipmentScalarWhereInput> = shipmentscalarwhereinputSchema as unknown as z.ZodType<Prisma.ShipmentScalarWhereInput>;
export const ShipmentScalarWhereInputObjectZodSchema = shipmentscalarwhereinputSchema;
