import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentCreateWithoutOrderInputObjectSchema as PaymentCreateWithoutOrderInputObjectSchema } from './PaymentCreateWithoutOrderInput.schema';
import { PaymentUncheckedCreateWithoutOrderInputObjectSchema as PaymentUncheckedCreateWithoutOrderInputObjectSchema } from './PaymentUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PaymentCreateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const PaymentCreateOrConnectWithoutOrderInputObjectSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateOrConnectWithoutOrderInput>;
export const PaymentCreateOrConnectWithoutOrderInputObjectZodSchema = makeSchema();
