import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { CategoryScalarRelationFilterObjectSchema as CategoryScalarRelationFilterObjectSchema } from './CategoryScalarRelationFilter.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { ProductVariantListRelationFilterObjectSchema as ProductVariantListRelationFilterObjectSchema } from './ProductVariantListRelationFilter.schema';
import { ProductImageListRelationFilterObjectSchema as ProductImageListRelationFilterObjectSchema } from './ProductImageListRelationFilter.schema';
import { ProductCollectionListRelationFilterObjectSchema as ProductCollectionListRelationFilterObjectSchema } from './ProductCollectionListRelationFilter.schema';
import { WishlistItemListRelationFilterObjectSchema as WishlistItemListRelationFilterObjectSchema } from './WishlistItemListRelationFilter.schema';
import { CartItemListRelationFilterObjectSchema as CartItemListRelationFilterObjectSchema } from './CartItemListRelationFilter.schema';
import { OrderItemListRelationFilterObjectSchema as OrderItemListRelationFilterObjectSchema } from './OrderItemListRelationFilter.schema'

const productwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductWhereInputObjectSchema), z.lazy(() => ProductWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductWhereInputObjectSchema), z.lazy(() => ProductWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(150)]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  vendor: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  category: z.union([z.lazy(() => CategoryScalarRelationFilterObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema)]).optional(),
  variants: z.lazy(() => ProductVariantListRelationFilterObjectSchema).optional(),
  images: z.lazy(() => ProductImageListRelationFilterObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionListRelationFilterObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemListRelationFilterObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemListRelationFilterObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemListRelationFilterObjectSchema).optional()
}).strict();
export const ProductWhereInputObjectSchema: z.ZodType<Prisma.ProductWhereInput> = productwhereinputSchema as unknown as z.ZodType<Prisma.ProductWhereInput>;
export const ProductWhereInputObjectZodSchema = productwhereinputSchema;
