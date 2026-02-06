import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema as WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './WishlistUpdateOneRequiredWithoutItemsNestedInput.schema';
import { ProductUpdateOneRequiredWithoutWishlistItemsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutWishlistItemsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutWishlistItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  wishlist: z.lazy(() => WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutWishlistItemsNestedInputObjectSchema).optional()
}).strict();
export const WishlistItemUpdateInputObjectSchema: z.ZodType<Prisma.WishlistItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUpdateInput>;
export const WishlistItemUpdateInputObjectZodSchema = makeSchema();
