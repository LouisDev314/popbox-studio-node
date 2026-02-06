import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateWithoutShipmentItemsInputObjectSchema as OrderItemCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedCreateWithoutShipmentItemsInput.schema';
import { OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema as OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateOrConnectWithoutShipmentItemsInput.schema';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderItemCreateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema).optional(),
  connect: z.lazy(() => OrderItemWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemCreateNestedOneWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateNestedOneWithoutShipmentItemsInput>;
export const OrderItemCreateNestedOneWithoutShipmentItemsInputObjectZodSchema = makeSchema();
