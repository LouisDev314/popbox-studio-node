import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { CartCreateNestedOneWithoutUserInputObjectSchema as CartCreateNestedOneWithoutUserInputObjectSchema } from './CartCreateNestedOneWithoutUserInput.schema';
import { OrderCreateNestedManyWithoutUserInputObjectSchema as OrderCreateNestedManyWithoutUserInputObjectSchema } from './OrderCreateNestedManyWithoutUserInput.schema';
import { OrderStatusHistoryCreateNestedManyWithoutUserInputObjectSchema as OrderStatusHistoryCreateNestedManyWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().max(100).optional().nullable(),
  role: UserRoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  deletedAt: z.coerce.date().optional().nullable(),
  cart: z.lazy(() => CartCreateNestedOneWithoutUserInputObjectSchema).optional(),
  orders: z.lazy(() => OrderCreateNestedManyWithoutUserInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutWishlistInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutWishlistInput>;
export const UserCreateWithoutWishlistInputObjectZodSchema = makeSchema();
