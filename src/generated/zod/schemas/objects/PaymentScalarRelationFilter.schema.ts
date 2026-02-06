import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PaymentWhereInputObjectSchema).optional()
}).strict();
export const PaymentScalarRelationFilterObjectSchema: z.ZodType<Prisma.PaymentScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PaymentScalarRelationFilter>;
export const PaymentScalarRelationFilterObjectZodSchema = makeSchema();
