import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithoutOrderInputObjectSchema as OrderStatusHistoryUpdateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUpdateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrderStatusHistoryUpdateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput>;
export const OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
