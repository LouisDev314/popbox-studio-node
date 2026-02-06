import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCountOutputTypeCountStatusHistoryArgsObjectSchema as PaymentCountOutputTypeCountStatusHistoryArgsObjectSchema } from './PaymentCountOutputTypeCountStatusHistoryArgs.schema'

const makeSchema = () => z.object({
  statusHistory: z.union([z.boolean(), z.lazy(() => PaymentCountOutputTypeCountStatusHistoryArgsObjectSchema)]).optional()
}).strict();
export const PaymentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PaymentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCountOutputTypeSelect>;
export const PaymentCountOutputTypeSelectObjectZodSchema = makeSchema();
