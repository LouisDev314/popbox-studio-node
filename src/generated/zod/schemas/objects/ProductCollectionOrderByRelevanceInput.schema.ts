import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionOrderByRelevanceFieldEnumSchema } from '../enums/ProductCollectionOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ProductCollectionOrderByRelevanceFieldEnumSchema, ProductCollectionOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ProductCollectionOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ProductCollectionOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionOrderByRelevanceInput>;
export const ProductCollectionOrderByRelevanceInputObjectZodSchema = makeSchema();
