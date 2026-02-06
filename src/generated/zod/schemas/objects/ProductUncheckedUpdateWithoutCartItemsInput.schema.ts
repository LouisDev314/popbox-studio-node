import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { ProductVariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema as ProductVariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './ProductVariantUncheckedUpdateManyWithoutProductNestedInput.schema';
import { ProductImageUncheckedUpdateManyWithoutProductNestedInputObjectSchema as ProductImageUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './ProductImageUncheckedUpdateManyWithoutProductNestedInput.schema';
import { ProductCollectionUncheckedUpdateManyWithoutProductNestedInputObjectSchema as ProductCollectionUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './ProductCollectionUncheckedUpdateManyWithoutProductNestedInput.schema';
import { WishlistItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema as WishlistItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './WishlistItemUncheckedUpdateManyWithoutProductNestedInput.schema';
import { OrderItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema as OrderItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './OrderItemUncheckedUpdateManyWithoutProductNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  vendor: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  categoryId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  variants: z.lazy(() => ProductVariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  images: z.lazy(() => ProductImageUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional()
}).strict();
export const ProductUncheckedUpdateWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedUpdateWithoutCartItemsInput>;
export const ProductUncheckedUpdateWithoutCartItemsInputObjectZodSchema = makeSchema();
