import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './objects/PaymentStatusHistoryInclude.schema';
import { PaymentStatusHistoryUpdateInputObjectSchema as PaymentStatusHistoryUpdateInputObjectSchema } from './objects/PaymentStatusHistoryUpdateInput.schema';
import { PaymentStatusHistoryUncheckedUpdateInputObjectSchema as PaymentStatusHistoryUncheckedUpdateInputObjectSchema } from './objects/PaymentStatusHistoryUncheckedUpdateInput.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './objects/PaymentStatusHistoryWhereUniqueInput.schema';

export const PaymentStatusHistoryUpdateOneSchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), data: z.union([PaymentStatusHistoryUpdateInputObjectSchema, PaymentStatusHistoryUncheckedUpdateInputObjectSchema]), where: PaymentStatusHistoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateArgs>;

export const PaymentStatusHistoryUpdateOneZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), data: z.union([PaymentStatusHistoryUpdateInputObjectSchema, PaymentStatusHistoryUncheckedUpdateInputObjectSchema]), where: PaymentStatusHistoryWhereUniqueInputObjectSchema }).strict();