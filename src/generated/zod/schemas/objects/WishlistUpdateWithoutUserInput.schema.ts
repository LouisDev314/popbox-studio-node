import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema as WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema } from './WishlistItemUpdateManyWithoutWishlistNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  items: z.lazy(() => WishlistItemUpdateManyWithoutWishlistNestedInputObjectSchema).optional()
}).strict();
export const WishlistUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUpdateWithoutUserInput>;
export const WishlistUpdateWithoutUserInputObjectZodSchema = makeSchema();
