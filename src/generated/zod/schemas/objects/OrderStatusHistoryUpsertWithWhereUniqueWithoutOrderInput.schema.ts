import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithoutOrderInputObjectSchema as OrderStatusHistoryUpdateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUpdateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateWithoutOrderInput.schema';
import { OrderStatusHistoryCreateWithoutOrderInputObjectSchema as OrderStatusHistoryCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrderStatusHistoryUpdateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput>;
export const OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
