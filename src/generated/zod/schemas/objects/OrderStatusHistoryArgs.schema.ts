import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistorySelectObjectSchema as OrderStatusHistorySelectObjectSchema } from './OrderStatusHistorySelect.schema';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './OrderStatusHistoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OrderStatusHistorySelectObjectSchema).optional(),
  include: z.lazy(() => OrderStatusHistoryIncludeObjectSchema).optional()
}).strict();
export const OrderStatusHistoryArgsObjectSchema = makeSchema();
export const OrderStatusHistoryArgsObjectZodSchema = makeSchema();
