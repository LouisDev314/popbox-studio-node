import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  fromStatus: z.boolean().optional(),
  toStatus: z.boolean().optional(),
  reason: z.boolean().optional(),
  changedBy: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const OrderStatusHistorySelectObjectSchema: z.ZodType<Prisma.OrderStatusHistorySelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistorySelect>;
export const OrderStatusHistorySelectObjectZodSchema = makeSchema();
