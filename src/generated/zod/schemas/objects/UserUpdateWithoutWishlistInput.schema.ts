import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { EnumUserRoleFieldUpdateOperationsInputObjectSchema as EnumUserRoleFieldUpdateOperationsInputObjectSchema } from './EnumUserRoleFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { CartUpdateOneWithoutUserNestedInputObjectSchema as CartUpdateOneWithoutUserNestedInputObjectSchema } from './CartUpdateOneWithoutUserNestedInput.schema';
import { OrderUpdateManyWithoutUserNestedInputObjectSchema as OrderUpdateManyWithoutUserNestedInputObjectSchema } from './OrderUpdateManyWithoutUserNestedInput.schema';
import { OrderStatusHistoryUpdateManyWithoutUserNestedInputObjectSchema as OrderStatusHistoryUpdateManyWithoutUserNestedInputObjectSchema } from './OrderStatusHistoryUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  supabaseUserId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string().max(100), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  role: z.union([UserRoleSchema, z.lazy(() => EnumUserRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  deletedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  cart: z.lazy(() => CartUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  orders: z.lazy(() => OrderUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutWishlistInput>;
export const UserUpdateWithoutWishlistInputObjectZodSchema = makeSchema();
