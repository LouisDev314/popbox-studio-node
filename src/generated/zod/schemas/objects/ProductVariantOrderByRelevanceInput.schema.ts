import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantOrderByRelevanceFieldEnumSchema } from '../enums/ProductVariantOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ProductVariantOrderByRelevanceFieldEnumSchema, ProductVariantOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ProductVariantOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ProductVariantOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantOrderByRelevanceInput>;
export const ProductVariantOrderByRelevanceInputObjectZodSchema = makeSchema();
