import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { WishlistCreateNestedOneWithoutUserInputObjectSchema as WishlistCreateNestedOneWithoutUserInputObjectSchema } from './WishlistCreateNestedOneWithoutUserInput.schema';
import { CartCreateNestedOneWithoutUserInputObjectSchema as CartCreateNestedOneWithoutUserInputObjectSchema } from './CartCreateNestedOneWithoutUserInput.schema';
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
  wishlist: z.lazy(() => WishlistCreateNestedOneWithoutUserInputObjectSchema).optional(),
  cart: z.lazy(() => CartCreateNestedOneWithoutUserInputObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutOrdersInput>;
export const UserCreateWithoutOrdersInputObjectZodSchema = makeSchema();
