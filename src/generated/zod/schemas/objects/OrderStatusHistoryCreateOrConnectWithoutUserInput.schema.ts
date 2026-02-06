import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryCreateWithoutUserInputObjectSchema as OrderStatusHistoryCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateOrConnectWithoutUserInput>;
export const OrderStatusHistoryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
