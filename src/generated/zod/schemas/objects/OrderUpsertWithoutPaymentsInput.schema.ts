import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderUpdateWithoutPaymentsInputObjectSchema as OrderUpdateWithoutPaymentsInputObjectSchema } from './OrderUpdateWithoutPaymentsInput.schema';
import { OrderUncheckedUpdateWithoutPaymentsInputObjectSchema as OrderUncheckedUpdateWithoutPaymentsInputObjectSchema } from './OrderUncheckedUpdateWithoutPaymentsInput.schema';
import { OrderCreateWithoutPaymentsInputObjectSchema as OrderCreateWithoutPaymentsInputObjectSchema } from './OrderCreateWithoutPaymentsInput.schema';
import { OrderUncheckedCreateWithoutPaymentsInputObjectSchema as OrderUncheckedCreateWithoutPaymentsInputObjectSchema } from './OrderUncheckedCreateWithoutPaymentsInput.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrderUpdateWithoutPaymentsInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutPaymentsInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderCreateWithoutPaymentsInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutPaymentsInputObjectSchema)]),
  where: z.lazy(() => OrderWhereInputObjectSchema).optional()
}).strict();
export const OrderUpsertWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderUpsertWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpsertWithoutPaymentsInput>;
export const OrderUpsertWithoutPaymentsInputObjectZodSchema = makeSchema();
