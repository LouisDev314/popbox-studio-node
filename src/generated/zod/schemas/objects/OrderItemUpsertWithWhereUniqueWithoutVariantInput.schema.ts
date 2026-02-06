import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemUpdateWithoutVariantInputObjectSchema as OrderItemUpdateWithoutVariantInputObjectSchema } from './OrderItemUpdateWithoutVariantInput.schema';
import { OrderItemUncheckedUpdateWithoutVariantInputObjectSchema as OrderItemUncheckedUpdateWithoutVariantInputObjectSchema } from './OrderItemUncheckedUpdateWithoutVariantInput.schema';
import { OrderItemCreateWithoutVariantInputObjectSchema as OrderItemCreateWithoutVariantInputObjectSchema } from './OrderItemCreateWithoutVariantInput.schema';
import { OrderItemUncheckedCreateWithoutVariantInputObjectSchema as OrderItemUncheckedCreateWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrderItemUpdateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateWithoutVariantInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema)])
}).strict();
export const OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemUpsertWithWhereUniqueWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpsertWithWhereUniqueWithoutVariantInput>;
export const OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectZodSchema = makeSchema();
