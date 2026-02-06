import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumUserRoleFilterObjectSchema as EnumUserRoleFilterObjectSchema } from './EnumUserRoleFilter.schema';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { WishlistNullableScalarRelationFilterObjectSchema as WishlistNullableScalarRelationFilterObjectSchema } from './WishlistNullableScalarRelationFilter.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema';
import { CartNullableScalarRelationFilterObjectSchema as CartNullableScalarRelationFilterObjectSchema } from './CartNullableScalarRelationFilter.schema';
import { CartWhereInputObjectSchema as CartWhereInputObjectSchema } from './CartWhereInput.schema';
import { OrderListRelationFilterObjectSchema as OrderListRelationFilterObjectSchema } from './OrderListRelationFilter.schema';
import { OrderStatusHistoryListRelationFilterObjectSchema as OrderStatusHistoryListRelationFilterObjectSchema } from './OrderStatusHistoryListRelationFilter.schema'

const userwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  supabaseUserId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  role: z.union([z.lazy(() => EnumUserRoleFilterObjectSchema), UserRoleSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  deletedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  wishlist: z.union([z.lazy(() => WishlistNullableScalarRelationFilterObjectSchema), z.lazy(() => WishlistWhereInputObjectSchema)]).optional(),
  cart: z.union([z.lazy(() => CartNullableScalarRelationFilterObjectSchema), z.lazy(() => CartWhereInputObjectSchema)]).optional(),
  orders: z.lazy(() => OrderListRelationFilterObjectSchema).optional(),
  orderStatusHistories: z.lazy(() => OrderStatusHistoryListRelationFilterObjectSchema).optional()
}).strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> = userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;
