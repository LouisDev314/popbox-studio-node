import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { OrderUpdateWithoutAddressesInputObjectSchema as OrderUpdateWithoutAddressesInputObjectSchema } from './OrderUpdateWithoutAddressesInput.schema';
import { OrderUncheckedUpdateWithoutAddressesInputObjectSchema as OrderUncheckedUpdateWithoutAddressesInputObjectSchema } from './OrderUncheckedUpdateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrderUpdateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutAddressesInputObjectSchema)])
}).strict();
export const OrderUpdateToOneWithWhereWithoutAddressesInputObjectSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutAddressesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutAddressesInput>;
export const OrderUpdateToOneWithWhereWithoutAddressesInputObjectZodSchema = makeSchema();
