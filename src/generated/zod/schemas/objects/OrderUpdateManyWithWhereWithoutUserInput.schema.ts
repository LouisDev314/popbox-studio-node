import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderScalarWhereInputObjectSchema as OrderScalarWhereInputObjectSchema } from './OrderScalarWhereInput.schema';
import { OrderUpdateManyMutationInputObjectSchema as OrderUpdateManyMutationInputObjectSchema } from './OrderUpdateManyMutationInput.schema';
import { OrderUncheckedUpdateManyWithoutUserInputObjectSchema as OrderUncheckedUpdateManyWithoutUserInputObjectSchema } from './OrderUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrderUpdateManyMutationInputObjectSchema), z.lazy(() => OrderUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const OrderUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutUserInput>;
export const OrderUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
