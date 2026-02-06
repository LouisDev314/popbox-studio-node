import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderCreateWithoutAddressesInputObjectSchema as OrderCreateWithoutAddressesInputObjectSchema } from './OrderCreateWithoutAddressesInput.schema';
import { OrderUncheckedCreateWithoutAddressesInputObjectSchema as OrderUncheckedCreateWithoutAddressesInputObjectSchema } from './OrderUncheckedCreateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderCreateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutAddressesInputObjectSchema)])
}).strict();
export const OrderCreateOrConnectWithoutAddressesInputObjectSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateOrConnectWithoutAddressesInput>;
export const OrderCreateOrConnectWithoutAddressesInputObjectZodSchema = makeSchema();
