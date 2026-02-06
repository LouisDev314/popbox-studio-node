import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema as WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './WishlistUpdateOneRequiredWithoutItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  wishlist: z.lazy(() => WishlistUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional()
}).strict();
export const WishlistItemUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUpdateWithoutProductInput>;
export const WishlistItemUpdateWithoutProductInputObjectZodSchema = makeSchema();
