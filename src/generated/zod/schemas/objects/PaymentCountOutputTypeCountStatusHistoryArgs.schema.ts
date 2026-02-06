import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './PaymentStatusHistoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).optional()
}).strict();
export const PaymentCountOutputTypeCountStatusHistoryArgsObjectSchema = makeSchema();
export const PaymentCountOutputTypeCountStatusHistoryArgsObjectZodSchema = makeSchema();
