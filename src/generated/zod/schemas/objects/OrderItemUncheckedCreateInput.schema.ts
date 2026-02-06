import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  productName: z.string().max(150),
  variantName: z.string().max(100).optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().max(3).optional(),
  shipmentItems: z.lazy(() => ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema).optional()
}).strict();
export const OrderItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedCreateInput>;
export const OrderItemUncheckedCreateInputObjectZodSchema = makeSchema();
