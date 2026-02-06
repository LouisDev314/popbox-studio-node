import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const wishlistitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WishlistItemScalarWhereInputObjectSchema), z.lazy(() => WishlistItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WishlistItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WishlistItemScalarWhereInputObjectSchema), z.lazy(() => WishlistItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  wishlistId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WishlistItemScalarWhereInputObjectSchema: z.ZodType<Prisma.WishlistItemScalarWhereInput> = wishlistitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.WishlistItemScalarWhereInput>;
export const WishlistItemScalarWhereInputObjectZodSchema = wishlistitemscalarwhereinputSchema;
