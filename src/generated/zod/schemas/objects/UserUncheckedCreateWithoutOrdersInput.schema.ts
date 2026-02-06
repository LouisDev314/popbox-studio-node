import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema as WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './WishlistUncheckedCreateNestedOneWithoutUserInput.schema';
import { CartUncheckedCreateNestedOneWithoutUserInputObjectSchema as CartUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './CartUncheckedCreateNestedOneWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: UserRoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  deletedAt: z.coerce.date().optional().nullable(),
  wishlist: z.lazy(() => WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutOrdersInput>;
export const UserUncheckedCreateWithoutOrdersInputObjectZodSchema = makeSchema();
