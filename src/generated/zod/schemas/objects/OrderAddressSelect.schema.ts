import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  type: z.boolean().optional(),
  name: z.boolean().optional(),
  line1: z.boolean().optional(),
  line2: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  country: z.boolean().optional(),
  phone: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional()
}).strict();
export const OrderAddressSelectObjectSchema: z.ZodType<Prisma.OrderAddressSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressSelect>;
export const OrderAddressSelectObjectZodSchema = makeSchema();
