import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './objects/PaymentStatusHistoryWhereInput.schema';

export const PaymentStatusHistoryDeleteManySchema: z.ZodType<Prisma.PaymentStatusHistoryDeleteManyArgs> = z.object({ where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryDeleteManyArgs>;

export const PaymentStatusHistoryDeleteManyZodSchema = z.object({ where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict();