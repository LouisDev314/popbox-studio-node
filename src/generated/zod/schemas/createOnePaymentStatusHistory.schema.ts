import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './objects/PaymentStatusHistoryInclude.schema';
import { PaymentStatusHistoryCreateInputObjectSchema as PaymentStatusHistoryCreateInputObjectSchema } from './objects/PaymentStatusHistoryCreateInput.schema';
import { PaymentStatusHistoryUncheckedCreateInputObjectSchema as PaymentStatusHistoryUncheckedCreateInputObjectSchema } from './objects/PaymentStatusHistoryUncheckedCreateInput.schema';

export const PaymentStatusHistoryCreateOneSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), data: z.union([PaymentStatusHistoryCreateInputObjectSchema, PaymentStatusHistoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateArgs>;

export const PaymentStatusHistoryCreateOneZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), data: z.union([PaymentStatusHistoryCreateInputObjectSchema, PaymentStatusHistoryUncheckedCreateInputObjectSchema]) }).strict();