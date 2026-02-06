import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutStatusHistoryInputObjectSchema as PaymentCreateWithoutStatusHistoryInputObjectSchema } from './PaymentCreateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedCreateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PaymentCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema)])
}).strict();
export const PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateOrConnectWithoutStatusHistoryInput>;
export const PaymentCreateOrConnectWithoutStatusHistoryInputObjectZodSchema = makeSchema();
