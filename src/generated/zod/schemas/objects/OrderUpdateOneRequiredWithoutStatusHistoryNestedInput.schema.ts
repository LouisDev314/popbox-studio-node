import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutStatusHistoryInputObjectSchema as OrderCreateWithoutStatusHistoryInputObjectSchema } from './OrderCreateWithoutStatusHistoryInput.schema';
import { OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema as OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedCreateWithoutStatusHistoryInput.schema';
import { OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema as OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema } from './OrderCreateOrConnectWithoutStatusHistoryInput.schema';
import { OrderUpsertWithoutStatusHistoryInputObjectSchema as OrderUpsertWithoutStatusHistoryInputObjectSchema } from './OrderUpsertWithoutStatusHistoryInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema as OrderUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema } from './OrderUpdateToOneWithWhereWithoutStatusHistoryInput.schema';
import { OrderUpdateWithoutStatusHistoryInputObjectSchema as OrderUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUpdateWithoutStatusHistoryInput.schema';
import { OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema as OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedUpdateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutStatusHistoryInputObjectSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutStatusHistoryInputObjectSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrderUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema)]).optional()
}).strict();
export const OrderUpdateOneRequiredWithoutStatusHistoryNestedInputObjectSchema: z.ZodType<Prisma.OrderUpdateOneRequiredWithoutStatusHistoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateOneRequiredWithoutStatusHistoryNestedInput>;
export const OrderUpdateOneRequiredWithoutStatusHistoryNestedInputObjectZodSchema = makeSchema();
