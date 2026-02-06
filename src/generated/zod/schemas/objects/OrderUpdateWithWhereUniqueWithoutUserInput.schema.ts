import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderUpdateWithoutUserInputObjectSchema as OrderUpdateWithoutUserInputObjectSchema } from './OrderUpdateWithoutUserInput.schema';
import { OrderUncheckedUpdateWithoutUserInputObjectSchema as OrderUncheckedUpdateWithoutUserInputObjectSchema } from './OrderUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrderUpdateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const OrderUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateWithWhereUniqueWithoutUserInput>;
export const OrderUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
