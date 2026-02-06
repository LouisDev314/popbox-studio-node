import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateWithoutShipmentItemsInputObjectSchema as OrderItemCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedCreateWithoutShipmentItemsInput.schema';
import { OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema as OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateOrConnectWithoutShipmentItemsInput.schema';
import { OrderItemUpsertWithoutShipmentItemsInputObjectSchema as OrderItemUpsertWithoutShipmentItemsInputObjectSchema } from './OrderItemUpsertWithoutShipmentItemsInput.schema';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemUpdateToOneWithWhereWithoutShipmentItemsInputObjectSchema as OrderItemUpdateToOneWithWhereWithoutShipmentItemsInputObjectSchema } from './OrderItemUpdateToOneWithWhereWithoutShipmentItemsInput.schema';
import { OrderItemUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUpdateWithoutShipmentItemsInput.schema';
import { OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema as OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema } from './OrderItemUncheckedUpdateWithoutShipmentItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderItemCreateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrderItemCreateOrConnectWithoutShipmentItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => OrderItemUpsertWithoutShipmentItemsInputObjectSchema).optional(),
  connect: z.lazy(() => OrderItemWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrderItemUpdateToOneWithWhereWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUpdateWithoutShipmentItemsInputObjectSchema), z.lazy(() => OrderItemUncheckedUpdateWithoutShipmentItemsInputObjectSchema)]).optional()
}).strict();
export const OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema: z.ZodType<Prisma.OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInput>;
export const OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectZodSchema = makeSchema();
