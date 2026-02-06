import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutUserInputObjectSchema as OrderCreateWithoutUserInputObjectSchema } from './OrderCreateWithoutUserInput.schema';
import { OrderUncheckedCreateWithoutUserInputObjectSchema as OrderUncheckedCreateWithoutUserInputObjectSchema } from './OrderUncheckedCreateWithoutUserInput.schema';
import { OrderCreateOrConnectWithoutUserInputObjectSchema as OrderCreateOrConnectWithoutUserInputObjectSchema } from './OrderCreateOrConnectWithoutUserInput.schema';
import { OrderCreateManyUserInputEnvelopeObjectSchema as OrderCreateManyUserInputEnvelopeObjectSchema } from './OrderCreateManyUserInputEnvelope.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutUserInputObjectSchema), z.lazy(() => OrderCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrderCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrderWhereUniqueInputObjectSchema), z.lazy(() => OrderWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedCreateNestedManyWithoutUserInput>;
export const OrderUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
