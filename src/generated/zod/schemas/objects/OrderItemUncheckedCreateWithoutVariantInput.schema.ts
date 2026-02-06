import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string().optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().optional(),
  shipmentItems: z.lazy(() => ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema).optional()
}).strict();
export const OrderItemUncheckedCreateWithoutVariantInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedCreateWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedCreateWithoutVariantInput>;
export const OrderItemUncheckedCreateWithoutVariantInputObjectZodSchema = makeSchema();
