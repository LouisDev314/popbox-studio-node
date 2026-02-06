import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentStatusSchema } from '../enums/ShipmentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ShipmentItemUncheckedCreateNestedManyWithoutShipmentInputObjectSchema as ShipmentItemUncheckedCreateNestedManyWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedCreateNestedManyWithoutShipmentInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
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
  items: z.lazy(() => ShipmentItemUncheckedCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const ShipmentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ShipmentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentUncheckedCreateInput>;
export const ShipmentUncheckedCreateInputObjectZodSchema = makeSchema();
