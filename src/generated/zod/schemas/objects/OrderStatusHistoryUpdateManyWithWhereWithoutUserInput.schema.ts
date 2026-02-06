import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryScalarWhereInputObjectSchema as OrderStatusHistoryScalarWhereInputObjectSchema } from './OrderStatusHistoryScalarWhereInput.schema';
import { OrderStatusHistoryUpdateManyMutationInputObjectSchema as OrderStatusHistoryUpdateManyMutationInputObjectSchema } from './OrderStatusHistoryUpdateManyMutationInput.schema';
import { OrderStatusHistoryUncheckedUpdateManyWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedUpdateManyWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrderStatusHistoryUpdateManyMutationInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithWhereWithoutUserInput>;
export const OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
