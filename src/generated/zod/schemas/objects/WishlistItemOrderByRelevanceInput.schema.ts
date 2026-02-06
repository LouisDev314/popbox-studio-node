import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemOrderByRelevanceFieldEnumSchema } from '../enums/WishlistItemOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([WishlistItemOrderByRelevanceFieldEnumSchema, WishlistItemOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const WishlistItemOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.WishlistItemOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemOrderByRelevanceInput>;
export const WishlistItemOrderByRelevanceInputObjectZodSchema = makeSchema();
