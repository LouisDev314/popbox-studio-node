import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema';
import { PaymentUpdateWithoutStatusHistoryInputObjectSchema as PaymentUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUpdateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedUpdateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PaymentUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema)])
}).strict();
export const PaymentUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.PaymentUpdateToOneWithWhereWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateToOneWithWhereWithoutStatusHistoryInput>;
export const PaymentUpdateToOneWithWhereWithoutStatusHistoryInputObjectZodSchema = makeSchema();
