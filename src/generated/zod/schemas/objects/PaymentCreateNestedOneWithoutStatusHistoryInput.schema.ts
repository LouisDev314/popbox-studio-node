import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutStatusHistoryInputObjectSchema as PaymentCreateWithoutStatusHistoryInputObjectSchema } from './PaymentCreateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedCreateWithoutStatusHistoryInput.schema';
import { PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema as PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema } from './PaymentCreateOrConnectWithoutStatusHistoryInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputObjectSchema).optional()
}).strict();
export const PaymentCreateNestedOneWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateNestedOneWithoutStatusHistoryInput>;
export const PaymentCreateNestedOneWithoutStatusHistoryInputObjectZodSchema = makeSchema();
