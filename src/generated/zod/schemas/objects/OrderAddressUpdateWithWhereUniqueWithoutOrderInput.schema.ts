import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './OrderAddressWhereUniqueInput.schema';
import { OrderAddressUpdateWithoutOrderInputObjectSchema as OrderAddressUpdateWithoutOrderInputObjectSchema } from './OrderAddressUpdateWithoutOrderInput.schema';
import { OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema as OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedUpdateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderAddressWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrderAddressUpdateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedUpdateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressUpdateWithWhereUniqueWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUpdateWithWhereUniqueWithoutOrderInput>;
export const OrderAddressUpdateWithWhereUniqueWithoutOrderInputObjectZodSchema = makeSchema();
