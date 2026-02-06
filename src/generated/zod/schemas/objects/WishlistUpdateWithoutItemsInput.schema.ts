import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema as UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutWishlistNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWishlistNestedInputObjectSchema).optional()
}).strict();
export const WishlistUpdateWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistUpdateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateWithoutItemsInput>;
export const WishlistUpdateWithoutItemsInputObjectZodSchema = makeSchema();
