import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { WishlistScalarRelationFilterObjectSchema as WishlistScalarRelationFilterObjectSchema } from './WishlistScalarRelationFilter.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const wishlistitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WishlistItemWhereInputObjectSchema), z.lazy(() => WishlistItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WishlistItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WishlistItemWhereInputObjectSchema), z.lazy(() => WishlistItemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  wishlistId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  wishlist: z.union([z.lazy(() => WishlistScalarRelationFilterObjectSchema), z.lazy(() => WishlistWhereInputObjectSchema)]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional()
}).strict();
export const WishlistItemWhereInputObjectSchema: z.ZodType<Prisma.WishlistItemWhereInput> = wishlistitemwhereinputSchema as unknown as z.ZodType<Prisma.WishlistItemWhereInput>;
export const WishlistItemWhereInputObjectZodSchema = wishlistitemwhereinputSchema;
