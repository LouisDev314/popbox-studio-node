import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema as UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutWishlistNestedInput.schema';
import { WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema as WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema } from './WishlistItemUpdateManyWithoutWishlistNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema).optional(),
  items: z.lazy(() => WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema).optional()
}).strict();
export const WishlistUpdateInputObjectSchema: z.ZodType<Prisma.WishlistUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateInput>;
export const WishlistUpdateInputObjectZodSchema = makeSchema();
