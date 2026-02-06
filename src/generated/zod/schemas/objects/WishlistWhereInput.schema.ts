import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { WishlistItemListRelationFilterObjectSchema as WishlistItemListRelationFilterObjectSchema } from './WishlistItemListRelationFilter.schema'

const wishlistwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WishlistWhereInputObjectSchema), z.lazy(() => WishlistWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WishlistWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WishlistWhereInputObjectSchema), z.lazy(() => WishlistWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  items: z.lazy(() => WishlistItemListRelationFilterObjectSchema).optional()
}).strict();
export const WishlistWhereInputObjectSchema: z.ZodType<Prisma.WishlistWhereInput> = wishlistwhereinputSchema as unknown as z.ZodType<Prisma.WishlistWhereInput>;
export const WishlistWhereInputObjectZodSchema = wishlistwhereinputSchema;
