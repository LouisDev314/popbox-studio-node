import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateOrConnectWithoutPaymentInput.schema';
import { PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectSchema as PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInput.schema';
import { PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema as PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema } from './PaymentStatusHistoryCreateManyPaymentInputEnvelope.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectSchema as PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInput.schema';
import { PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectSchema as PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInput.schema';
import { PaymentStatusHistoryScalarWhereInputObjectSchema as PaymentStatusHistoryScalarWhereInputObjectSchema } from './PaymentStatusHistoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema).array(), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PaymentStatusHistoryUpdateManyWithoutPaymentNestedInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateManyWithoutPaymentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateManyWithoutPaymentNestedInput>;
export const PaymentStatusHistoryUpdateManyWithoutPaymentNestedInputObjectZodSchema = makeSchema();
