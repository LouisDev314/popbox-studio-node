import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemWhereInputObjectSchema as OrderItemWhereInputObjectSchema } from './OrderItemWhereInput.schema';
import { OrderItemUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUpdateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedUpdateWithoutShipmentItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrderItemUpdateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema)])
}).strict();
export const OrderItemUpdateToOneWithWhereWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemUpdateToOneWithWhereWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpdateToOneWithWhereWithoutShipmentItemsInput>;
export const OrderItemUpdateToOneWithWhereWithoutShipmentItemsInputObjectZodSchema = makeSchema();
