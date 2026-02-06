import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistOrderByRelevanceFieldEnumSchema } from '../enums/WishlistOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([WishlistOrderByRelevanceFieldEnumSchema, WishlistOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const WishlistOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.WishlistOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistOrderByRelevanceInput>;
export const WishlistOrderByRelevanceInputObjectZodSchema = makeSchema();
