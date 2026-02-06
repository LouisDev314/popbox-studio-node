import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistoryCreateManyInputObjectSchema as PaymentStatusHistoryCreateManyInputObjectSchema } from './objects/PaymentStatusHistoryCreateManyInput.schema';

export const PaymentStatusHistoryCreateManySchema: z.ZodType<Prisma.PaymentStatusHistoryCreateManyArgs> = z.object({ data: z.union([ PaymentStatusHistoryCreateManyInputObjectSchema, z.array(PaymentStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateManyArgs>;

export const PaymentStatusHistoryCreateManyZodSchema = z.object({ data: z.union([ PaymentStatusHistoryCreateManyInputObjectSchema, z.array(PaymentStatusHistoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();