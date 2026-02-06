import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryScalarWhereInputObjectSchema as OrderStatusHistoryScalarWhereInputObjectSchema } from './OrderStatusHistoryScalarWhereInput.schema';
import { OrderStatusHistoryUpdateManyMutationInputObjectSchema as OrderStatusHistoryUpdateManyMutationInputObjectSchema } from './OrderStatusHistoryUpdateManyMutationInput.schema';
import { OrderStatusHistoryUncheckedUpdateManyWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedUpdateManyWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrderStatusHistoryUpdateManyMutationInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateManyWithoutOrderInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput>;
export const OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectZodSchema = makeSchema();
