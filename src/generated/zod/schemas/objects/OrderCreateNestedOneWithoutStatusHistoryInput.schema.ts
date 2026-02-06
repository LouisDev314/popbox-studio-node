import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutStatusHistoryInputObjectSchema as OrderCreateWithoutStatusHistoryInputObjectSchema } from './OrderCreateWithoutStatusHistoryInput.schema';
import { OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema as OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedCreateWithoutStatusHistoryInput.schema';
import { OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema as OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema } from './OrderCreateOrConnectWithoutStatusHistoryInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateNestedOneWithoutStatusHistoryInput>;
export const OrderCreateNestedOneWithoutStatusHistoryInputObjectZodSchema = makeSchema();
