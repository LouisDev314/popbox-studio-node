import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderUpdateWithoutUserInputObjectSchema as OrderUpdateWithoutUserInputObjectSchema } from './OrderUpdateWithoutUserInput.schema';
import { OrderUncheckedUpdateWithoutUserInputObjectSchema as OrderUncheckedUpdateWithoutUserInputObjectSchema } from './OrderUncheckedUpdateWithoutUserInput.schema';
import { OrderCreateWithoutUserInputObjectSchema as OrderCreateWithoutUserInputObjectSchema } from './OrderCreateWithoutUserInput.schema';
import { OrderUncheckedCreateWithoutUserInputObjectSchema as OrderUncheckedCreateWithoutUserInputObjectSchema } from './OrderUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrderUpdateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderCreateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrderUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpsertWithWhereUniqueWithoutUserInput>;
export const OrderUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
