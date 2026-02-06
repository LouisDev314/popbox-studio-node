import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressCreateWithoutOrderInputObjectSchema as OrderAddressCreateWithoutOrderInputObjectSchema } from './OrderAddressCreateWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateWithoutOrderInput.schema';
import { OrderAddressCreateOrConnectWithoutOrderInputObjectSchema as OrderAddressCreateOrConnectWithoutOrderInputObjectSchema } from './OrderAddressCreateOrConnectWithoutOrderInput.schema';
import { OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectSchema as OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectSchema } from './OrderAddressUpsertWithWhereUniqueWithoutOrderInput.schema';
import { OrderAddressCreateManyOrderInputEnvelopeObjectSchema as OrderAddressCreateManyOrderInputEnvelopeObjectSchema } from './OrderAddressCreateManyOrderInputEnvelope.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './OrderAddressWhereUniqueInput.schema';
import { OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectSchema as OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectSchema } from './OrderAddressUpdateWithWhereUniqueWithoutOrderInput.schema';
import { OrderAddressUpdateManyWithWhereWithoutOrderInputObjectSchema as OrderAddressUpdateManyWithWhereWithoutOrderInputObjectSchema } from './OrderAddressUpdateManyWithWhereWithoutOrderInput.schema';
import { OrderAddressScalarWhereInputObjectSchema as OrderAddressScalarWhereInputObjectSchema } from './OrderAddressScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderAddressCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderAddressCreateManyOrderInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrderAddressWhereUniqueInputObjectSchema), z.lazy(() => OrderAddressWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrderAddressWhereUniqueInputObjectSchema), z.lazy(() => OrderAddressWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrderAddressWhereUniqueInputObjectSchema), z.lazy(() => OrderAddressWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrderAddressWhereUniqueInputObjectSchema), z.lazy(() => OrderAddressWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrderAddressUpdateManyWithWhereWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUpdateManyWithWhereWithoutOrderInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrderAddressScalarWhereInputObjectSchema), z.lazy(() => OrderAddressScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrderAddressUpdateManyWithoutOrderNestedInputObjectSchema: z.ZodType<Prisma.OrderAddressUpdateManyWithoutOrderNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUpdateManyWithoutOrderNestedInput>;
export const OrderAddressUpdateManyWithoutOrderNestedInputObjectZodSchema = makeSchema();
