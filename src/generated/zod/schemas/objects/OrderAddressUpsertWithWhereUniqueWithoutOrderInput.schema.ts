import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './OrderAddressWhereUniqueInput.schema';
import { OrderAddressUpdateWithoutOrderInputObjectSchema as OrderAddressUpdateWithoutOrderInputObjectSchema } from './OrderAddressUpdateWithoutOrderInput.schema';
import { OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema as OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedUpdateWithoutOrderInput.schema';
import { OrderAddressCreateWithoutOrderInputObjectSchema as OrderAddressCreateWithoutOrderInputObjectSchema } from './OrderAddressCreateWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderAddressWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrderAddressUpdateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressUpsertWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUpsertWithWhereUniqueWithoutOrderInput>;
export const OrderAddressUpsertWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
