import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUpdateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedUpdateWithoutShipmentItemsInput.schema';
import { OrderItemCreateWithoutShipmentItemsInputObjectSchema as OrderItemCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedCreateWithoutShipmentItemsInput.schema';
import { OrderItemWhereInputObjectSchema as OrderItemWhereInputObjectSchema } from './OrderItemWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrderItemUpdateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => OrderItemCreateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema)]),
  where: z.lazy(() => OrderItemWhereInputObjectSchema).optional()
}).strict();
export const OrderItemUpsertWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemUpsertWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpsertWithoutShipmentItemsInput>;
export const OrderItemUpsertWithoutShipmentItemsInputObjectZodSchema = makeSchema();
