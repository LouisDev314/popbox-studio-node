import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './objects/PaymentStatusHistoryInclude.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './objects/PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryCreateInputObjectSchema as PaymentStatusHistoryCreateInputObjectSchema } from './objects/PaymentStatusHistoryCreateInput.schema';
import { PaymentStatusHistoryUncheckedCreateInputObjectSchema as PaymentStatusHistoryUncheckedCreateInputObjectSchema } from './objects/PaymentStatusHistoryUncheckedCreateInput.schema';
import { PaymentStatusHistoryUpdateInputObjectSchema as PaymentStatusHistoryUpdateInputObjectSchema } from './objects/PaymentStatusHistoryUpdateInput.schema';
import { PaymentStatusHistoryUncheckedUpdateInputObjectSchema as PaymentStatusHistoryUncheckedUpdateInputObjectSchema } from './objects/PaymentStatusHistoryUncheckedUpdateInput.schema';

export const PaymentStatusHistoryUpsertOneSchema: z.ZodType<Prisma.PaymentStatusHistoryUpsertArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), where: PaymentStatusHistoryWhereUniqueInputObjectSchema, create: z.union([ PaymentStatusHistoryCreateInputObjectSchema, PaymentStatusHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ PaymentStatusHistoryUpdateInputObjectSchema, PaymentStatusHistoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpsertArgs>;

export const PaymentStatusHistoryUpsertOneZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), include: PaymentStatusHistoryIncludeObjectSchema.optional(), where: PaymentStatusHistoryWhereUniqueInputObjectSchema, create: z.union([ PaymentStatusHistoryCreateInputObjectSchema, PaymentStatusHistoryUncheckedCreateInputObjectSchema ]), update: z.union([ PaymentStatusHistoryUpdateInputObjectSchema, PaymentStatusHistoryUncheckedUpdateInputObjectSchema ]) }).strict();