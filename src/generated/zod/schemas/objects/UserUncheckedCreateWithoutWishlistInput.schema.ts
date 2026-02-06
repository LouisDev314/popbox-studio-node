import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { CartUncheckedCreateNestedOneWithoutUserInputObjectSchema as CartUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './CartUncheckedCreateNestedOneWithoutUserInput.schema';
import { OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrderUncheckedCreateNestedManyWithoutUserInput.schema';
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
  cart: z.lazy(() => CartUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  orders: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutWishlistInput>;
export const UserUncheckedCreateWithoutWishlistInputObjectZodSchema = makeSchema();
