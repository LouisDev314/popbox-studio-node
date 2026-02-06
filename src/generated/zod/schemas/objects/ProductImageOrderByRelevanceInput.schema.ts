import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductImageOrderByRelevanceFieldEnumSchema } from '../enums/ProductImageOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ProductImageOrderByRelevanceFieldEnumSchema, ProductImageOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ProductImageOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ProductImageOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageOrderByRelevanceInput>;
export const ProductImageOrderByRelevanceInputObjectZodSchema = makeSchema();
