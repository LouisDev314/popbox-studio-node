import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantProductIdNameCompoundUniqueInputObjectSchema as ProductVariantProductIdNameCompoundUniqueInputObjectSchema } from './ProductVariantProductIdNameCompoundUniqueInput.schema';
import { ProductVariantProductIdSortOrderCompoundUniqueInputObjectSchema as ProductVariantProductIdSortOrderCompoundUniqueInputObjectSchema } from './ProductVariantProductIdSortOrderCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId_name: z.lazy(() => ProductVariantProductIdNameCompoundUniqueInputObjectSchema).optional(),
  productId_sortOrder: z.lazy(() => ProductVariantProductIdSortOrderCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ProductVariantWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductVariantWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantWhereUniqueInput>;
export const ProductVariantWhereUniqueInputObjectZodSchema = makeSchema();
