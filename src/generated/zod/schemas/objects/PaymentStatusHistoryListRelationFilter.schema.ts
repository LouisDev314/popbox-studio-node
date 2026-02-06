import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './PaymentStatusHistoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).optional()
}).strict();
export const PaymentStatusHistoryListRelationFilterObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryListRelationFilter>;
export const PaymentStatusHistoryListRelationFilterObjectZodSchema = makeSchema();
