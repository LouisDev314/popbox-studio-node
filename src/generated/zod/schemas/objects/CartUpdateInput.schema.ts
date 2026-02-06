import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutCartNestedInputObjectSchema as UserUpdateOneRequiredWithoutCartNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutCartNestedInput.schema';
import { CartItemUpdateManyWithoutCartNestedInputObjectSchema as CartItemUpdateManyWithoutCartNestedInputObjectSchema } from './CartItemUpdateManyWithoutCartNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCartNestedInputObjectSchema).optional(),
  items: z.lazy(() => CartItemUpdateManyWithoutCartNestedInputObjectSchema).optional()
}).strict();
export const CartUpdateInputObjectSchema: z.ZodType<Prisma.CartUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUpdateInput>;
export const CartUpdateInputObjectZodSchema = makeSchema();
