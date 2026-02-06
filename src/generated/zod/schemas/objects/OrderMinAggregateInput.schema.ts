import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderNumber: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  subtotalAmount: z.literal(true).optional(),
  taxAmount: z.literal(true).optional(),
  shippingAmount: z.literal(true).optional(),
  discountAmount: z.literal(true).optional(),
  totalAmount: z.literal(true).optional(),
  currency: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const OrderMinAggregateInputObjectSchema: z.ZodType<Prisma.OrderMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrderMinAggregateInputType>;
export const OrderMinAggregateInputObjectZodSchema = makeSchema();
