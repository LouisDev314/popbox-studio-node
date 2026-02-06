import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderUpdateWithoutAddressesInputObjectSchema as OrderUpdateWithoutAddressesInputObjectSchema } from './OrderUpdateWithoutAddressesInput.schema';
import { OrderUncheckedUpdateWithoutAddressesInputObjectSchema as OrderUncheckedUpdateWithoutAddressesInputObjectSchema } from './OrderUncheckedUpdateWithoutAddressesInput.schema';
import { OrderCreateWithoutAddressesInputObjectSchema as OrderCreateWithoutAddressesInputObjectSchema } from './OrderCreateWithoutAddressesInput.schema';
import { OrderUncheckedCreateWithoutAddressesInputObjectSchema as OrderUncheckedCreateWithoutAddressesInputObjectSchema } from './OrderUncheckedCreateWithoutAddressesInput.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrderUpdateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutAddressesInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderCreateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutAddressesInputObjectSchema)]),
  where: z.lazy(() => OrderWhereInputObjectSchema).optional()
}).strict();
export const OrderUpsertWithoutAddressesInputObjectSchema: z.ZodType<Prisma.OrderUpsertWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpsertWithoutAddressesInput>;
export const OrderUpsertWithoutAddressesInputObjectZodSchema = makeSchema();
