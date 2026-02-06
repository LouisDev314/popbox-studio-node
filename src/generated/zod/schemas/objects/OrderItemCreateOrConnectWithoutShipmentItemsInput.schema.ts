import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemCreateWithoutShipmentItemsInputObjectSchema as OrderItemCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedCreateWithoutShipmentItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrderItemCreateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema)])
}).strict();
export const OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemCreateOrConnectWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateOrConnectWithoutShipmentItemsInput>;
export const OrderItemCreateOrConnectWithoutShipmentItemsInputObjectZodSchema = makeSchema();
