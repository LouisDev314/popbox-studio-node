import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutOrderInputObjectSchema as PaymentCreateWithoutOrderInputObjectSchema } from './PaymentCreateWithoutOrderInput.schema';
import { PaymentUncheckedCreateWithoutOrderInputObjectSchema as PaymentUncheckedCreateWithoutOrderInputObjectSchema } from './PaymentUncheckedCreateWithoutOrderInput.schema';
import { PaymentCreateOrConnectWithoutOrderInputObjectSchema as PaymentCreateOrConnectWithoutOrderInputObjectSchema } from './PaymentCreateOrConnectWithoutOrderInput.schema';
import { PaymentUpsertWithWhereUniqueWithoutOrderInputObjectSchema as PaymentUpsertWithWhereUniqueWithoutOrderInputObjectSchema } from './PaymentUpsertWithWhereUniqueWithoutOrderInput.schema';
import { PaymentCreateManyOrderInputEnvelopeObjectSchema as PaymentCreateManyOrderInputEnvelopeObjectSchema } from './PaymentCreateManyOrderInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithWhereUniqueWithoutOrderInputObjectSchema as PaymentUpdateWithWhereUniqueWithoutOrderInputObjectSchema } from './PaymentUpdateWithWhereUniqueWithoutOrderInput.schema';
import { PaymentUpdateManyWithWhereWithoutOrderInputObjectSchema as PaymentUpdateManyWithWhereWithoutOrderInputObjectSchema } from './PaymentUpdateManyWithWhereWithoutOrderInput.schema';
import { PaymentScalarWhereInputObjectSchema as PaymentScalarWhereInputObjectSchema } from './PaymentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PaymentUpsertWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => PaymentUpsertWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyOrderInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PaymentUpdateWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => PaymentUpdateWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PaymentUpdateManyWithWhereWithoutOrderInputObjectSchema), z.lazy(() => PaymentUpdateManyWithWhereWithoutOrderInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PaymentScalarWhereInputObjectSchema), z.lazy(() => PaymentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PaymentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutOrderNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutOrderNestedInput>;
export const PaymentUncheckedUpdateManyWithoutOrderNestedInputObjectZodSchema = makeSchema();
