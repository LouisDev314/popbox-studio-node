import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemScalarWhereInputObjectSchema as OrderItemScalarWhereInputObjectSchema } from './OrderItemScalarWhereInput.schema';
import { OrderItemUpdateManyMutationInputObjectSchema as OrderItemUpdateManyMutationInputObjectSchema } from './OrderItemUpdateManyMutationInput.schema';
import { OrderItemUncheckedUpdateManyWithoutVariantInputObjectSchema as OrderItemUncheckedUpdateManyWithoutVariantInputObjectSchema } from './OrderItemUncheckedUpdateManyWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrderItemUpdateManyMutationInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateManyWithoutVariantInputObjectSchema)])
}).strict();
export const OrderItemUpdateManyWithWhereWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemUpdateManyWithWhereWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpdateManyWithWhereWithoutVariantInput>;
export const OrderItemUpdateManyWithWhereWithoutVariantInputObjectZodSchema = makeSchema();
