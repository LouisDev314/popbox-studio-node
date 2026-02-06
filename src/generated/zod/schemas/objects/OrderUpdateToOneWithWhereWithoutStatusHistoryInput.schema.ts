import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { OrderUpdateWithoutStatusHistoryInputObjectSchema as OrderUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUpdateWithoutStatusHistoryInput.schema';
import { OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema as OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema } from './OrderUncheckedUpdateWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrderUpdateWithoutStatusHistoryInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutStatusHistoryInputObjectSchema)])
}).strict();
export const OrderUpdateToOneWithWhereWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutStatusHistoryInput>;
export const OrderUpdateToOneWithWhereWithoutStatusHistoryInputObjectZodSchema = makeSchema();
