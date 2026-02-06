import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  sortOrder: z.number().int()
}).strict();
export const ProductVariantProductIdSortOrderCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProductVariantProductIdSortOrderCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantProductIdSortOrderCompoundUniqueInput>;
export const ProductVariantProductIdSortOrderCompoundUniqueInputObjectZodSchema = makeSchema();
