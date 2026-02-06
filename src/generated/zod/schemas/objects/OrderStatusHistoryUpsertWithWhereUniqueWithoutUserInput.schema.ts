import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithoutUserInputObjectSchema as OrderStatusHistoryUpdateWithoutUserInputObjectSchema } from './OrderStatusHistoryUpdateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateWithoutUserInput.schema';
import { OrderStatusHistoryCreateWithoutUserInputObjectSchema as OrderStatusHistoryCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrderStatusHistoryUpdateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInput>;
export const OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
