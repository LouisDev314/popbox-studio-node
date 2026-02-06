import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateWithoutAddressesInputObjectSchema as OrderCreateWithoutAddressesInputObjectSchema } from './OrderCreateWithoutAddressesInput.schema';
import { OrderUncheckedCreateWithoutAddressesInputObjectSchema as OrderUncheckedCreateWithoutAddressesInputObjectSchema } from './OrderUncheckedCreateWithoutAddressesInput.schema';
import { OrderCreateOrConnectWithoutAddressesInputObjectSchema as OrderCreateOrConnectWithoutAddressesInputObjectSchema } from './OrderCreateOrConnectWithoutAddressesInput.schema';
import { OrderUpsertWithoutAddressesInputObjectSchema as OrderUpsertWithoutAddressesInputObjectSchema } from './OrderUpsertWithoutAddressesInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './OrderWhereUniqueInput.schema';
import { OrderUpdateToOneWithWhereWithoutAddressesInputObjectSchema as OrderUpdateToOneWithWhereWithoutAddressesInputObjectSchema } from './OrderUpdateToOneWithWhereWithoutAddressesInput.schema';
import { OrderUpdateWithoutAddressesInputObjectSchema as OrderUpdateWithoutAddressesInputObjectSchema } from './OrderUpdateWithoutAddressesInput.schema';
import { OrderUncheckedUpdateWithoutAddressesInputObjectSchema as OrderUncheckedUpdateWithoutAddressesInputObjectSchema } from './OrderUncheckedUpdateWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderCreateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedCreateWithoutAddressesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutAddressesInputObjectSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutAddressesInputObjectSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrderUpdateToOneWithWhereWithoutAddressesInputObjectSchema), z.lazy(() => OrderUpdateWithoutAddressesInputObjectSchema), z.lazy(() => OrderUncheckedUpdateWithoutAddressesInputObjectSchema)]).optional()
}).strict();
export const OrderUpdateOneRequiredWithoutAddressesNestedInputObjectSchema: z.ZodType<Prisma.OrderUpdateOneRequiredWithoutAddressesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateOneRequiredWithoutAddressesNestedInput>;
export const OrderUpdateOneRequiredWithoutAddressesNestedInputObjectZodSchema = makeSchema();
