import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderUpdateWithoutStatusHistoryInputObjectSchema as OrderUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUpdateWithoutStatusHistoryInput.schema';
import { OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema as OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedUpdateWithoutStatusHistoryInput.schema';
import { OrderCreateWithoutStatusHistoryInputObjectSchema as OrderCreateWithoutStatusHistoryInputObjectSchema } from './OrderCreateWithoutStatusHistoryInput.schema';
import { OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema as OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedCreateWithoutStatusHistoryInput.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrderUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderCreateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutStatusHistoryInputObjectSchema)]),
  where: z.lazy(() => OrderWhereInputObjectSchema).optional()
}).strict();
export const OrderUpsertWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.OrderUpsertWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpsertWithoutStatusHistoryInput>;
export const OrderUpsertWithoutStatusHistoryInputObjectZodSchema = makeSchema();
