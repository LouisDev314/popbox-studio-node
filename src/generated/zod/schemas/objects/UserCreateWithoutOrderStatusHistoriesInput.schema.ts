import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { WishlistCreateNestedOneWithoutUserInputObjectSchema as WishlistCreateNestedOneWithoutUserInputObjectSchema } from './WishlistCreateNestedOneWithoutUserInput.schema';
import { CartCreateNestedOneWithoutUserInputObjectSchema as CartCreateNestedOneWithoutUserInputObjectSchema } from './CartCreateNestedOneWithoutUserInput.schema';
import { OrderCreateNestedManyWithoutUserInputObjectSchema as OrderCreateNestedManyWithoutUserInputObjectSchema } from './OrderCreateNestedManyWithoutUserInput.schema'

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
  orders: z.lazy(() => OrderCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutOrderStatusHistoriesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutOrderStatusHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutOrderStatusHistoriesInput>;
export const UserCreateWithoutOrderStatusHistoriesInputObjectZodSchema = makeSchema();
