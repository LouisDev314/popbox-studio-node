import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  status: ShipmentStatusSchema.optional(),
  carrier: z.string().optional().nullable(),
  serviceLevel: z.string().optional().nullable(),
  trackingNumber: z.string().optional().nullable(),
  trackingUrl: z.string().optional().nullable(),
  shippedAt: z.coerce.date().optional().nullable(),
  deliveredAt: z.coerce.date().optional().nullable(),
  canceledAt: z.coerce.date().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ShipmentUncheckedCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.ShipmentUncheckedCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentUncheckedCreateWithoutItemsInput>;
export const ShipmentUncheckedCreateWithoutItemsInputObjectZodSchema = makeSchema();
