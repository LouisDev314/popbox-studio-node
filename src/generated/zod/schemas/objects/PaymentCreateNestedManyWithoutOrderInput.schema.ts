import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutOrderInputObjectSchema as PaymentCreateWithoutOrderInputObjectSchema } from './PaymentCreateWithoutOrderInput.schema';
import { PaymentUncheckedCreateWithoutOrderInputObjectSchema as PaymentUncheckedCreateWithoutOrderInputObjectSchema } from './PaymentUncheckedCreateWithoutOrderInput.schema';
import { PaymentCreateOrConnectWithoutOrderInputObjectSchema as PaymentCreateOrConnectWithoutOrderInputObjectSchema } from './PaymentCreateOrConnectWithoutOrderInput.schema';
import { PaymentCreateManyOrderInputEnvelopeObjectSchema as PaymentCreateManyOrderInputEnvelopeObjectSchema } from './PaymentCreateManyOrderInputEnvelope.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => PaymentCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentCreateManyOrderInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PaymentWhereUniqueInputObjectSchema), z.lazy(() => PaymentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PaymentCreateNestedManyWithoutOrderInputObjectSchema: z.ZodType<Prisma.PaymentCreateNestedManyWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateNestedManyWithoutOrderInput>;
export const PaymentCreateNestedManyWithoutOrderInputObjectZodSchema = makeSchema();
