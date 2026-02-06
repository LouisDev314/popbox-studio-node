import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const OrderStatusHistoryIncludeObjectSchema: z.ZodType<Prisma.OrderStatusHistoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryInclude>;
export const OrderStatusHistoryIncludeObjectZodSchema = makeSchema();
