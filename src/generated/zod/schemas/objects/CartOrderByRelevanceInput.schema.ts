import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartOrderByRelevanceFieldEnumSchema } from '../enums/CartOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([CartOrderByRelevanceFieldEnumSchema, CartOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const CartOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.CartOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.CartOrderByRelevanceInput>;
export const CartOrderByRelevanceInputObjectZodSchema = makeSchema();
