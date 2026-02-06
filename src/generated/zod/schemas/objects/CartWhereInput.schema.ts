import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { CartItemListRelationFilterObjectSchema as CartItemListRelationFilterObjectSchema } from './CartItemListRelationFilter.schema'

const cartwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CartWhereInputObjectSchema), z.lazy(() => CartWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CartWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CartWhereInputObjectSchema), z.lazy(() => CartWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  items: z.lazy(() => CartItemListRelationFilterObjectSchema).optional()
}).strict();
export const CartWhereInputObjectSchema: z.ZodType<Prisma.CartWhereInput> = cartwhereinputSchema as unknown as z.ZodType<Prisma.CartWhereInput>;
export const CartWhereInputObjectZodSchema = cartwhereinputSchema;
