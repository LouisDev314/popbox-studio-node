import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { PaymentStatusHistoryFindManySchema as PaymentStatusHistoryFindManySchema } from '../findManyPaymentStatusHistory.schema';
import { PaymentCountOutputTypeArgsObjectSchema as PaymentCountOutputTypeArgsObjectSchema } from './PaymentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  statusHistory: z.union([z.boolean(), z.lazy(() => PaymentStatusHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PaymentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PaymentIncludeObjectSchema: z.ZodType<Prisma.PaymentInclude> = makeSchema() as unknown as z.ZodType<Prisma.PaymentInclude>;
export const PaymentIncludeObjectZodSchema = makeSchema();
