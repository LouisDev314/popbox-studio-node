import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderCreateWithoutPaymentsInputObjectSchema as OrderCreateWithoutPaymentsInputObjectSchema } from './OrderCreateWithoutPaymentsInput.schema';
import { OrderUncheckedCreateWithoutPaymentsInputObjectSchema as OrderUncheckedCreateWithoutPaymentsInputObjectSchema } from './OrderUncheckedCreateWithoutPaymentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderCreateWithoutPaymentsInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutPaymentsInputObjectSchema)])
}).strict();
export const OrderCreateOrConnectWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateOrConnectWithoutPaymentsInput>;
export const OrderCreateOrConnectWithoutPaymentsInputObjectZodSchema = makeSchema();
