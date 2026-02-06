import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutOrderItemsInputObjectSchema as ProductCreateNestedOneWithoutOrderItemsInputObjectSchema } from './ProductCreateNestedOneWithoutOrderItemsInput.schema';
import { ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema as ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateNestedOneWithoutOrderItemsInput.schema';
import { ShipmentItemCreateNestedManyWithoutOrderItemInputObjectSchema as ShipmentItemCreateNestedManyWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateNestedManyWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productName: z.string().max(150),
  variantName: z.string().max(100).optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().max(3).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderItemsInputObjectSchema),
  variant: z.lazy(() => ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema),
  shipmentItems: z.lazy(() => ShipmentItemCreateNestedManyWithoutOrderItemInputObjectSchema).optional()
}).strict();
export const OrderItemCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderItemCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateWithoutOrderInput>;
export const OrderItemCreateWithoutOrderInputObjectZodSchema = makeSchema();
