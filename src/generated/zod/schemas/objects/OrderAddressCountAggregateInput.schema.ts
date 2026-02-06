import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  name: z.literal(true).optional(),
  line1: z.literal(true).optional(),
  line2: z.literal(true).optional(),
  city: z.literal(true).optional(),
  state: z.literal(true).optional(),
  postalCode: z.literal(true).optional(),
  country: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OrderAddressCountAggregateInputObjectSchema: z.ZodType<Prisma.OrderAddressCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressCountAggregateInputType>;
export const OrderAddressCountAggregateInputObjectZodSchema = makeSchema();
