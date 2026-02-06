import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { EnumUserRoleFieldUpdateOperationsInputObjectSchema as EnumUserRoleFieldUpdateOperationsInputObjectSchema } from './EnumUserRoleFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { WishlistUncheckedUpdateOneWithoutUserNestedInputObjectSchema as WishlistUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './WishlistUncheckedUpdateOneWithoutUserNestedInput.schema';
import { CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema as CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './CartUncheckedUpdateOneWithoutUserNestedInput.schema';
import { OrderUncheckedUpdateManyWithoutUserNestedInputObjectSchema as OrderUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './OrderUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  supabaseUserId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  role: z.union([UserRoleSchema, z.lazy(() => EnumUserRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deletedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  wishlist: z.lazy(() => WishlistUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  cart: z.lazy(() => CartUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  orders: z.lazy(() => OrderUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutOrderStatusHistoriesInput>;
export const UserUncheckedUpdateWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
