import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumUserRoleFilterObjectSchema as EnumUserRoleFilterObjectSchema } from './EnumUserRoleFilter.schema';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const activeuserwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ActiveUserWhereInputObjectSchema), z.lazy(() => ActiveUserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActiveUserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActiveUserWhereInputObjectSchema), z.lazy(() => ActiveUserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  supabaseUserId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  role: z.union([z.lazy(() => EnumUserRoleFilterObjectSchema), UserRoleSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ActiveUserWhereInputObjectSchema: z.ZodType<Prisma.ActiveUserWhereInput> = activeuserwhereinputSchema as unknown as z.ZodType<Prisma.ActiveUserWhereInput>;
export const ActiveUserWhereInputObjectZodSchema = activeuserwhereinputSchema;
