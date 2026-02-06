import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutOrderInputObjectSchema as PaymentUpdateWithoutOrderInputObjectSchema } from './PaymentUpdateWithoutOrderInput.schema';
import { PaymentUncheckedUpdateWithoutOrderInputObjectSchema as PaymentUncheckedUpdateWithoutOrderInputObjectSchema } from './PaymentUncheckedUpdateWithoutOrderInput.schema';
import { PaymentCreateWithoutOrderInputObjectSchema as PaymentCreateWithoutOrderInputObjectSchema } from './PaymentCreateWithoutOrderInput.schema';
import { PaymentUncheckedCreateWithoutOrderInputObjectSchema as PaymentUncheckedCreateWithoutOrderInputObjectSchema } from './PaymentUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PaymentUpdateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutOrderInputObjectSchema)]),
  create: z.union([z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const PaymentUpsertWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutOrderInput>;
export const PaymentUpsertWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
