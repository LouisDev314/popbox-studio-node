import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentUpdateWithoutStatusHistoryInputObjectSchema as PaymentUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUpdateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedUpdateWithoutStatusHistoryInput.schema';
import { PaymentCreateWithoutStatusHistoryInputObjectSchema as PaymentCreateWithoutStatusHistoryInputObjectSchema } from './PaymentCreateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedCreateWithoutStatusHistoryInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PaymentUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema)]),
  create: z.union([z.lazy(() => PaymentCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema)]),
  where: z.lazy(() => PaymentWhereInputObjectSchema).optional()
}).strict();
export const PaymentUpsertWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.PaymentUpsertWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpsertWithoutStatusHistoryInput>;
export const PaymentUpsertWithoutStatusHistoryInputObjectZodSchema = makeSchema();
