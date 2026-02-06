import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderOrderByRelevanceFieldEnumSchema } from '../enums/OrderOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([OrderOrderByRelevanceFieldEnumSchema, OrderOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const OrderOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.OrderOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderOrderByRelevanceInput>;
export const OrderOrderByRelevanceInputObjectZodSchema = makeSchema();
