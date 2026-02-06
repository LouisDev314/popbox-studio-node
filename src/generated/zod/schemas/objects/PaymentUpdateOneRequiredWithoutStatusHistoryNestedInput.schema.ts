import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateWithoutStatusHistoryInputObjectSchema as PaymentCreateWithoutStatusHistoryInputObjectSchema } from './PaymentCreateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedCreateWithoutStatusHistoryInput.schema';
import { PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema as PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema } from './PaymentCreateOrConnectWithoutStatusHistoryInput.schema';
import { PaymentUpsertWithoutStatusHistoryInputObjectSchema as PaymentUpsertWithoutStatusHistoryInputObjectSchema } from './PaymentUpsertWithoutStatusHistoryInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './PaymentWhereUniqueInput.schema';
import { PaymentUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema as PaymentUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema } from './PaymentUpdateToOneWithWhereWithoutStatusHistoryInput.schema';
import { PaymentUpdateWithoutStatusHistoryInputObjectSchema as PaymentUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUpdateWithoutStatusHistoryInput.schema';
import { PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema as PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './PaymentUncheckedUpdateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedCreateWithoutStatusHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutStatusHistoryInputObjectSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutStatusHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PaymentUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => PaymentUncheckedUpdateWithoutStatusHistoryInputObjectSchema)]).optional()
}).strict();
export const PaymentUpdateOneRequiredWithoutStatusHistoryNestedInputObjectSchema: z.ZodType<Prisma.PaymentUpdateOneRequiredWithoutStatusHistoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUpdateOneRequiredWithoutStatusHistoryNestedInput>;
export const PaymentUpdateOneRequiredWithoutStatusHistoryNestedInputObjectZodSchema = makeSchema();
