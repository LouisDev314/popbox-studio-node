import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  productName: z.string(),
  variantName: z.string().optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().optional()
}).strict();
export const OrderItemUncheckedCreateWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedCreateWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedCreateWithoutShipmentItemsInput>;
export const OrderItemUncheckedCreateWithoutShipmentItemsInputObjectZodSchema = makeSchema();
