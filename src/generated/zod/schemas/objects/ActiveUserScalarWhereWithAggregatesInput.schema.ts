import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumUserRoleWithAggregatesFilterObjectSchema as EnumUserRoleWithAggregatesFilterObjectSchema } from './EnumUserRoleWithAggregatesFilter.schema';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const activeuserscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ActiveUserScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ActiveUserScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActiveUserScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActiveUserScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ActiveUserScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  supabaseUserId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  role: z.union([z.lazy(() => EnumUserRoleWithAggregatesFilterObjectSchema), UserRoleSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ActiveUserScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ActiveUserScalarWhereWithAggregatesInput> = activeuserscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ActiveUserScalarWhereWithAggregatesInput>;
export const ActiveUserScalarWhereWithAggregatesInputObjectZodSchema = activeuserscalarwherewithaggregatesinputSchema;
