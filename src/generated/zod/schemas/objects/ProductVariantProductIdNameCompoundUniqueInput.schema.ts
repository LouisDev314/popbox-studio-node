import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  name: z.string()
}).strict();
export const ProductVariantProductIdNameCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProductVariantProductIdNameCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantProductIdNameCompoundUniqueInput>;
export const ProductVariantProductIdNameCompoundUniqueInputObjectZodSchema = makeSchema();
