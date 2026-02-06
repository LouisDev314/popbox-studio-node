import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './OrderStatusHistoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).optional()
}).strict();
export const OrderCountOutputTypeCountStatusHistoryArgsObjectSchema = makeSchema();
export const OrderCountOutputTypeCountStatusHistoryArgsObjectZodSchema = makeSchema();
