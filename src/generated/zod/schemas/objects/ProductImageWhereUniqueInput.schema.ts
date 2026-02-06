import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductImageProductIdSortOrderCompoundUniqueInputObjectSchema as ProductImageProductIdSortOrderCompoundUniqueInputObjectSchema } from './ProductImageProductIdSortOrderCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId_sortOrder: z.lazy(() => ProductImageProductIdSortOrderCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ProductImageWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductImageWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageWhereUniqueInput>;
export const ProductImageWhereUniqueInputObjectZodSchema = makeSchema();
