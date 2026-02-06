import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderCreateWithoutStatusHistoryInputObjectSchema as OrderCreateWithoutStatusHistoryInputObjectSchema } from './OrderCreateWithoutStatusHistoryInput.schema';
import { OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema as OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedCreateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema)])
}).strict();
export const OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateOrConnectWithoutStatusHistoryInput>;
export const OrderCreateOrConnectWithoutStatusHistoryInputObjectZodSchema = makeSchema();
