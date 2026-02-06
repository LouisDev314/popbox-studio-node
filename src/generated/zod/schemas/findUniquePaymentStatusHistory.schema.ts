import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './objects/PaymentStatusHistoryInclude.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './objects/PaymentStatusHistoryWhereUniqueInput.schema';

export const PaymentStatusHistoryFindUniqueSchema: z.ZodType<Prisma.PaymentStatusHistoryFindUniqueArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), where: PaymentStatusHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryFindUniqueArgs>;

export const PaymentStatusHistoryFindUniqueZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), where: PaymentStatusHistoryWhereUniqueInputObjectSchema }).strict();