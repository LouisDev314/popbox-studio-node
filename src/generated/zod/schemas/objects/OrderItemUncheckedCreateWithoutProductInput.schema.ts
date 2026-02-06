import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  variantId: z.string(),
  productName: z.string(),
  variantName: z.string().optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().optional(),
  shipmentItems: z.lazy(() => ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema).optional()
}).strict();
export const OrderItemUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedCreateWithoutProductInput>;
export const OrderItemUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
