import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemUpdateWithoutVariantInputObjectSchema as OrderItemUpdateWithoutVariantInputObjectSchema } from './OrderItemUpdateWithoutVariantInput.schema';
import { OrderItemUncheckedUpdateWithoutVariantInputObjectSchema as OrderItemUncheckedUpdateWithoutVariantInputObjectSchema } from './OrderItemUncheckedUpdateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrderItemUpdateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateWithoutVariantInputObjectSchema)])
}).strict();
export const OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemUpdateWithWhereUniqueWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpdateWithWhereUniqueWithoutVariantInput>;
export const OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectZodSchema = makeSchema();
