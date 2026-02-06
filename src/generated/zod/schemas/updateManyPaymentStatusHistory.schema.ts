import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistoryUpdateManyMutationInputObjectSchema as PaymentStatusHistoryUpdateManyMutationInputObjectSchema } from './objects/PaymentStatusHistoryUpdateManyMutationInput.schema';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './objects/PaymentStatusHistoryWhereInput.schema';

export const PaymentStatusHistoryUpdateManySchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateManyArgs> = z.object({ data: PaymentStatusHistoryUpdateManyMutationInputObjectSchema, where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateManyArgs>;

export const PaymentStatusHistoryUpdateManyZodSchema = z.object({ data: PaymentStatusHistoryUpdateManyMutationInputObjectSchema, where: PaymentStatusHistoryWhereInputObjectSchema.optional() }).strict();