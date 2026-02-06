import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistorySelectObjectSchema as PaymentStatusHistorySelectObjectSchema } from './objects/PaymentStatusHistorySelect.schema';
import { PaymentStatusHistoryCreateManyInputObjectSchema as PaymentStatusHistoryCreateManyInputObjectSchema } from './objects/PaymentStatusHistoryCreateManyInput.schema';

export const PaymentStatusHistoryCreateManyAndReturnSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateManyAndReturnArgs> = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), data: z.union([ PaymentStatusHistoryCreateManyInputObjectSchema, z.array(PaymentStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateManyAndReturnArgs>;

export const PaymentStatusHistoryCreateManyAndReturnZodSchema = z.object({ select: PaymentStatusHistorySelectObjectSchema.optional(), data: z.union([ PaymentStatusHistoryCreateManyInputObjectSchema, z.array(PaymentStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();