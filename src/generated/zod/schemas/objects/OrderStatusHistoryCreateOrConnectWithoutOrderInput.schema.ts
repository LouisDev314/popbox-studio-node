import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryCreateWithoutOrderInputObjectSchema as OrderStatusHistoryCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateOrConnectWithoutOrderInput>;
export const OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectZodSchema = makeSchema();
