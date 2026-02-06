import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryUpdateManyMutationInputObjectSchema as PaymentStatusHistoryUpdateManyMutationInputObjectSchema } from './objects/PaymentStatusHistoryUpdateManyMutationInput.schema';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './objects/PaymentStatusHistoryWhereInput.schema';

export const PaymentStatusHistoryUpdateManyAndReturnSchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateManyAndReturnArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), data: PaymentStatusHistoryUpdateManyMutationInputObjectSchema, where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateManyAndReturnArgs>;

export const PaymentStatusHistoryUpdateManyAndReturnZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), data: PaymentStatusHistoryUpdateManyMutationInputObjectSchema, where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict();