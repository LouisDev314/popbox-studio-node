import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemOrderByRelevanceFieldEnumSchema } from '../enums/CartItemOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([CartItemOrderByRelevanceFieldEnumSchema, CartItemOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const CartItemOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.CartItemOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemOrderByRelevanceInput>;
export const CartItemOrderByRelevanceInputObjectZodSchema = makeSchema();
