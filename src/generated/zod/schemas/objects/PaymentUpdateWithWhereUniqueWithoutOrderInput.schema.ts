import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateWithoutOrderInputObjectSchema as PaymentUpdateWithoutOrderInputObjectSchema } from './PaymentUpdateWithoutOrderInput.schema';
import { PaymentUncheckedUpdateWithoutOrderInputObjectSchema as PaymentUncheckedUpdateWithoutOrderInputObjectSchema } from './PaymentUncheckedUpdateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PaymentUpdateWithoutOrderInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutOrderInputObjectSchema)])
}).strict();
export const PaymentUpdateWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutOrderInput>;
export const PaymentUpdateWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
