import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { EnumShipmentStatusWithAggregatesFilterObjectSchema as EnumShipmentStatusWithAggregatesFilterObjectSchema } from './EnumShipmentStatusWithAggregatesFilter.schema';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const shipmentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumShipmentStatusWithAggregatesFilterObjectSchema), ShipmentStatusSchema]).optional(),
  carrier: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  serviceLevel: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(80)]).optional().nullable(),
  trackingNumber: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  trackingUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(512)]).optional().nullable(),
  shippedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  deliveredAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  canceledAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ShipmentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ShipmentScalarWhereWithAggregatesInput> = shipmentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ShipmentScalarWhereWithAggregatesInput>;
export const ShipmentScalarWhereWithAggregatesInputObjectZodSchema = shipmentscalarwherewithaggregatesinputSchema;
