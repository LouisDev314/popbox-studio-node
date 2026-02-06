import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { CategoryUpdateOneRequiredWithoutProductsNestedInputObjectSchema as CategoryUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './CategoryUpdateOneRequiredWithoutProductsNestedInput.schema';
import { ProductVariantUpdateManyWithoutProductNestedInputObjectSchema as ProductVariantUpdateManyWithoutProductNestedInputObjectSchema } from './ProductVariantUpdateManyWithoutProductNestedInput.schema';
import { ProductImageUpdateManyWithoutProductNestedInputObjectSchema as ProductImageUpdateManyWithoutProductNestedInputObjectSchema } from './ProductImageUpdateManyWithoutProductNestedInput.schema';
import { ProductCollectionUpdateManyWithoutProductNestedInputObjectSchema as ProductCollectionUpdateManyWithoutProductNestedInputObjectSchema } from './ProductCollectionUpdateManyWithoutProductNestedInput.schema';
import { CartItemUpdateManyWithoutProductNestedInputObjectSchema as CartItemUpdateManyWithoutProductNestedInputObjectSchema } from './CartItemUpdateManyWithoutProductNestedInput.schema';
import { OrderItemUpdateManyWithoutProductNestedInputObjectSchema as OrderItemUpdateManyWithoutProductNestedInputObjectSchema } from './OrderItemUpdateManyWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string().max(150), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  vendor: z.union([z.string().max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional(),
  variants: z.lazy(() => ProductVariantUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  images: z.lazy(() => ProductImageUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemUpdateManyWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUpdateWithoutWishlistItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithoutWishlistItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithoutWishlistItemsInput>;
export const ProductUpdateWithoutWishlistItemsInputObjectZodSchema = makeSchema();
