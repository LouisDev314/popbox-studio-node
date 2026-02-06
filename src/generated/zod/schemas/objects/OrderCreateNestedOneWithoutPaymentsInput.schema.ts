import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutPaymentsInputObjectSchema as OrderCreateWithoutPaymentsInputObjectSchema } from './OrderCreateWithoutPaymentsInput.schema';
import { OrderUncheckedCreateWithoutPaymentsInputObjectSchema as OrderUncheckedCreateWithoutPaymentsInputObjectSchema } from './OrderUncheckedCreateWithoutPaymentsInput.schema';
import { OrderCreateOrConnectWithoutPaymentsInputObjectSchema as OrderCreateOrConnectWithoutPaymentsInputObjectSchema } from './OrderCreateOrConnectWithoutPaymentsInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutPaymentsInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutPaymentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutPaymentsInputObjectSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrderCreateNestedOneWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateNestedOneWithoutPaymentsInput>;
export const OrderCreateNestedOneWithoutPaymentsInputObjectZodSchema = makeSchema();
