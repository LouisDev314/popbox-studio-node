import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './OrderStatusHistoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryListRelationFilterObjectSchema: z.ZodType<Prisma.OrderStatusHistoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryListRelationFilter>;
export const OrderStatusHistoryListRelationFilterObjectZodSchema = makeSchema();
