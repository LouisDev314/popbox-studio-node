import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemOrderByRelevanceFieldEnumSchema } from '../enums/OrderItemOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([OrderItemOrderByRelevanceFieldEnumSchema, OrderItemOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const OrderItemOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.OrderItemOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemOrderByRelevanceInput>;
export const OrderItemOrderByRelevanceInputObjectZodSchema = makeSchema();
