import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionOrderByRelevanceFieldEnumSchema } from '../enums/CollectionOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([CollectionOrderByRelevanceFieldEnumSchema, CollectionOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const CollectionOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.CollectionOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionOrderByRelevanceInput>;
export const CollectionOrderByRelevanceInputObjectZodSchema = makeSchema();
