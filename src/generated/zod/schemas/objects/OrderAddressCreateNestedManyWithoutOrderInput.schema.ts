import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressCreateWithoutOrderInputObjectSchema as OrderAddressCreateWithoutOrderInputObjectSchema } from './OrderAddressCreateWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateWithoutOrderInput.schema';
import { OrderAddressCreateOrConnectWithoutOrderInputObjectSchema as OrderAddressCreateOrConnectWithoutOrderInputObjectSchema } from './OrderAddressCreateOrConnectWithoutOrderInput.schema';
import { OrderAddressCreateManyOrderInputEnvelopeObjectSchema as OrderAddressCreateManyOrderInputEnvelopeObjectSchema } from './OrderAddressCreateManyOrderInputEnvelope.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './OrderAddressWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderAddressCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderAddressCreateManyOrderInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrderAddressWhereUniqueInputObjectSchema), z.lazy(() => OrderAddressWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrderAddressCreateNestedManyWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressCreateNestedManyWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressCreateNestedManyWithoutOrderInput>;
export const OrderAddressCreateNestedManyWithoutOrderInputObjectZodSchema = makeSchema();
