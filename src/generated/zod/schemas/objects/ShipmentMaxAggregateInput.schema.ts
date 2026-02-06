import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  carrier: z.literal(true).optional(),
  serviceLevel: z.literal(true).optional(),
  trackingNumber: z.literal(true).optional(),
  trackingUrl: z.literal(true).optional(),
  shippedAt: z.literal(true).optional(),
  deliveredAt: z.literal(true).optional(),
  canceledAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ShipmentMaxAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentMaxAggregateInputType>;
export const ShipmentMaxAggregateInputObjectZodSchema = makeSchema();
