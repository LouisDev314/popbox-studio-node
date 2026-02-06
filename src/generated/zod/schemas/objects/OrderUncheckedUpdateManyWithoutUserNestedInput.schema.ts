import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutUserInputObjectSchema as OrderCreateWithoutUserInputObjectSchema } from './OrderCreateWithoutUserInput.schema';
import { OrderUncheckedCreateWithoutUserInputObjectSchema as OrderUncheckedCreateWithoutUserInputObjectSchema } from './OrderUncheckedCreateWithoutUserInput.schema';
import { OrderCreateOrConnectWithoutUserInputObjectSchema as OrderCreateOrConnectWithoutUserInputObjectSchema } from './OrderCreateOrConnectWithoutUserInput.schema';
import { OrderUpsertWithWhereUniqueWithoutUserInputObjectSchema as OrderUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './OrderUpsertWithWhereUniqueWithoutUserInput.schema';
import { OrderCreateManyUserInputEnvelopeObjectSchema as OrderCreateManyUserInputEnvelopeObjectSchema } from './OrderCreateManyUserInputEnvelope.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderUpdateWithWhereUniqueWithoutUserInputObjectSchema as OrderUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './OrderUpdateWithWhereUniqueWithoutUserInput.schema';
import { OrderUpdateManyWithWhereWithoutUserInputObjectSchema as OrderUpdateManyWithWhereWithoutUserInputObjectSchema } from './OrderUpdateManyWithWhereWithoutUserInput.schema';
import { OrderScalarWhereInputObjectSchema as OrderScalarWhereInputObjectSchema } from './OrderScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutUserInputObjectSchema), z.lazy(() => OrderCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrderCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrderUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrderWhereUniqueInputObjectSchema), z.lazy(() => OrderWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrderWhereUniqueInputObjectSchema), z.lazy(() => OrderWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrderWhereUniqueInputObjectSchema), z.lazy(() => OrderWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrderWhereUniqueInputObjectSchema), z.lazy(() => OrderWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrderUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => OrderUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrderScalarWhereInputObjectSchema), z.lazy(() => OrderScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrderUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput>;
export const OrderUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
