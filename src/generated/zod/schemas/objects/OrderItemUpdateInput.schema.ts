import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema as BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { OrderUpdateOneRequiredWithoutItemsNestedInputObjectSchema as OrderUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './OrderUpdateOneRequiredWithoutItemsNestedInput.schema';
import { ProductUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutOrderItemsNestedInput.schema';
import { ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema as ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema } from './ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInput.schema';
import { ShipmentItemUpdateManyWithoutOrderItemNestedInputObjectSchema as ShipmentItemUpdateManyWithoutOrderItemNestedInputObjectSchema } from './ShipmentItemUpdateManyWithoutOrderItemNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  productName: z.union([z.string().max(150), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  variantName: z.union([z.string().max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  unitPrice: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  currency: z.union([z.string().max(3), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  order: z.lazy(() => OrderUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema).optional(),
  variant: z.lazy(() => ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema).optional(),
  shipmentItems: z.lazy(() => ShipmentItemUpdateManyWithoutOrderItemNestedInputObjectSchema).optional()
}).strict();
export const OrderItemUpdateInputObjectSchema: z.ZodType<Prisma.OrderItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUpdateInput>;
export const OrderItemUpdateInputObjectZodSchema = makeSchema();
