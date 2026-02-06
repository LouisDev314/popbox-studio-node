import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithoutUserInputObjectSchema as OrderStatusHistoryUpdateWithoutUserInputObjectSchema } from './OrderStatusHistoryUpdateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrderStatusHistoryUpdateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInput>;
export const OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
