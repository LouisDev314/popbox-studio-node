import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ShipmentItemCreateNestedManyWithoutShipmentInputObjectSchema as ShipmentItemCreateNestedManyWithoutShipmentInputObjectSchema } from './ShipmentItemCreateNestedManyWithoutShipmentInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: ShipmentStatusSchema.optional(),
  carrier: z.string().max(50).optional().nullable(),
  serviceLevel: z.string().max(80).optional().nullable(),
  trackingNumber: z.string().max(100).optional().nullable(),
  trackingUrl: z.string().max(512).optional().nullable(),
  shippedAt: z.coerce.date().optional().nullable(),
  deliveredAt: z.coerce.date().optional().nullable(),
  canceledAt: z.coerce.date().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  items: z.lazy(() => ShipmentItemCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const ShipmentCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.ShipmentCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentCreateWithoutOrderInput>;
export const ShipmentCreateWithoutOrderInputObjectZodSchema = makeSchema();
