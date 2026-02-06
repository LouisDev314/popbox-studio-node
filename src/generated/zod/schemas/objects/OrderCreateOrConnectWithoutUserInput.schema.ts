import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderCreateWithoutUserInputObjectSchema as OrderCreateWithoutUserInputObjectSchema } from './OrderCreateWithoutUserInput.schema';
import { OrderUncheckedCreateWithoutUserInputObjectSchema as OrderUncheckedCreateWithoutUserInputObjectSchema } from './OrderUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderCreateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrderCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateOrConnectWithoutUserInput>;
export const OrderCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
