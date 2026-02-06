import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { OrderUpdateWithoutPaymentsInputObjectSchema as OrderUpdateWithoutPaymentsInputObjectSchema } from './OrderUpdateWithoutPaymentsInput.schema';
import { OrderUncheckedUpdateWithoutPaymentsInputObjectSchema as OrderUncheckedUpdateWithoutPaymentsInputObjectSchema } from './OrderUncheckedUpdateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrderUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutPaymentsInputObjectSchema)])
}).strict();
export const OrderUpdateToOneWithWhereWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutPaymentsInput>;
export const OrderUpdateToOneWithWhereWithoutPaymentsInputObjectZodSchema = makeSchema();
