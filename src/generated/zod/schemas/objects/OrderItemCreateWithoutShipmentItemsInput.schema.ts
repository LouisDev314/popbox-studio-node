import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateNestedOneWithoutItemsInputObjectSchema as OrderCreateNestedOneWithoutItemsInputObjectSchema } from './OrderCreateNestedOneWithoutItemsInput.schema';
import { ProductCreateNestedOneWithoutOrderItemsInputObjectSchema as ProductCreateNestedOneWithoutOrderItemsInputObjectSchema } from './ProductCreateNestedOneWithoutOrderItemsInput.schema';
import { ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema as ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateNestedOneWithoutOrderItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productName: z.string().max(150),
  variantName: z.string().max(100).optional().nullable(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().max(3).optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutItemsInputObjectSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderItemsInputObjectSchema),
  variant: z.lazy(() => ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema)
}).strict();
export const OrderItemCreateWithoutShipmentItemsInputObjectSchema: z.ZodType<Prisma.OrderItemCreateWithoutShipmentItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateWithoutShipmentItemsInput>;
export const OrderItemCreateWithoutShipmentItemsInputObjectZodSchema = makeSchema();
