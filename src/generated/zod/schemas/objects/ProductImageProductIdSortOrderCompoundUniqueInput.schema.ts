import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  sortOrder: z.number().int()
}).strict();
export const ProductImageProductIdSortOrderCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProductImageProductIdSortOrderCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageProductIdSortOrderCompoundUniqueInput>;
export const ProductImageProductIdSortOrderCompoundUniqueInputObjectZodSchema = makeSchema();
