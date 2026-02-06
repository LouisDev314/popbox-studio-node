import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema as WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './WishlistUncheckedCreateNestedOneWithoutUserInput.schema';
import { CartUncheckedCreateNestedOneWithoutUserInputObjectSchema as CartUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './CartUncheckedCreateNestedOneWithoutUserInput.schema';
import { OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrderUncheckedCreateNestedManyWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().max(100).optional().nullable(),
  role: UserRoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  wishlist: z.lazy(() => WishlistUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  cart: z.lazy(() => CartUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  orders: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
