import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentArgsObjectSchema as PaymentArgsObjectSchema } from './PaymentArgs.schema'

const makeSchema = () => z.object({
  payment: z.union([z.boolean(), z.lazy(() => PaymentArgsObjectSchema)]).optional()
}).strict();
export const PaymentStatusHistoryIncludeObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryInclude>;
export const PaymentStatusHistoryIncludeObjectZodSchema = makeSchema();
