import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PaymentStatusHistoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryWhereUniqueInput>;
export const PaymentStatusHistoryWhereUniqueInputObjectZodSchema = makeSchema();
