import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const wishlistitemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => WishlistItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => WishlistItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WishlistItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WishlistItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => WishlistItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  wishlistId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WishlistItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.WishlistItemScalarWhereWithAggregatesInput> = wishlistitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.WishlistItemScalarWhereWithAggregatesInput>;
export const WishlistItemScalarWhereWithAggregatesInputObjectZodSchema = wishlistitemscalarwherewithaggregatesinputSchema;
