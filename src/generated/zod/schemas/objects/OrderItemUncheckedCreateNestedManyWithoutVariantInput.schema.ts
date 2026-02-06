import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateWithoutVariantInputObjectSchema as OrderItemCreateWithoutVariantInputObjectSchema } from './OrderItemCreateWithoutVariantInput.schema';
import { OrderItemUncheckedCreateWithoutVariantInputObjectSchema as OrderItemUncheckedCreateWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateWithoutVariantInput.schema';
import { OrderItemCreateOrConnectWithoutVariantInputObjectSchema as OrderItemCreateOrConnectWithoutVariantInputObjectSchema } from './OrderItemCreateOrConnectWithoutVariantInput.schema';
import { OrderItemCreateManyVariantInputEnvelopeObjectSchema as OrderItemCreateManyVariantInputEnvelopeObjectSchema } from './OrderItemCreateManyVariantInputEnvelope.schema';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema).array(), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderItemCreateOrConnectWithoutVariantInputObjectSchema), z.lazy(() => OrderItemCreateOrConnectWithoutVariantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderItemCreateManyVariantInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrderItemWhereUniqueInputObjectSchema), z.lazy(() => OrderItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedCreateNestedManyWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedCreateNestedManyWithoutVariantInput>;
export const OrderItemUncheckedCreateNestedManyWithoutVariantInputObjectZodSchema = makeSchema();
