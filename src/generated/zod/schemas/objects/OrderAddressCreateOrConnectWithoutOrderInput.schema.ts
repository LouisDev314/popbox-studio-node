import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './OrderAddressWhereUniqueInput.schema';
import { OrderAddressCreateWithoutOrderInputObjectSchema as OrderAddressCreateWithoutOrderInputObjectSchema } from './OrderAddressCreateWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateWithoutOrderInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderAddressWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderAddressCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderAddressUncheckedCreateWithoutOrderInputObjectSchema)])
}).strict();
export const OrderAddressCreateOrConnectWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressCreateOrConnectWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressCreateOrConnectWithoutOrderInput>;
export const OrderAddressCreateOrConnectWithoutOrderInputObjectZodSchema = makeSchema();
