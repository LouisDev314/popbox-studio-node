import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './PaymentStatusHistoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PaymentStatusHistorySelectObjectSchema).optional(),
  include: z.lazy(() => PaymentStatusHistoryIncludeObjectSchema).optional()
}).strict();
export const PaymentStatusHistoryArgsObjectSchema = makeSchema();
export const PaymentStatusHistoryArgsObjectZodSchema = makeSchema();
