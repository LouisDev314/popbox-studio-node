import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemCreateWithoutVariantInputObjectSchema as OrderItemCreateWithoutVariantInputObjectSchema } from './OrderItemCreateWithoutVariantInput.schema';
import { OrderItemUncheckedCreateWithoutVariantInputObjectSchema as OrderItemUncheckedCreateWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateWithoutVariantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema)])
}).strict();
export const OrderItemCreateOrConnectWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemCreateOrConnectWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateOrConnectWithoutVariantInput>;
export const OrderItemCreateOrConnectWithoutVariantInputObjectZodSchema = makeSchema();
