import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutAddressesInputObjectSchema as OrderCreateWithoutAddressesInputObjectSchema } from './OrderCreateWithoutAddressesInput.schema';
import { OrderUncheckedCreateWithoutAddressesInputObjectSchema as OrderUncheckedCreateWithoutAddressesInputObjectSchema } from './OrderUncheckedCreateWithoutAddressesInput.schema';
import { OrderCreateOrConnectWithoutAddressesInputObjectSchema as OrderCreateOrConnectWithoutAddressesInputObjectSchema } from './OrderCreateOrConnectWithoutAddressesInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutAddressesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutAddressesInputObjectSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrderCreateNestedOneWithoutAddressesInputObjectSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateNestedOneWithoutAddressesInput>;
export const OrderCreateNestedOneWithoutAddressesInputObjectZodSchema = makeSchema();
