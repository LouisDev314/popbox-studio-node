import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryOrderByRelevanceFieldEnumSchema } from '../enums/OrderStatusHistoryOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([OrderStatusHistoryOrderByRelevanceFieldEnumSchema, OrderStatusHistoryOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const OrderStatusHistoryOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryOrderByRelevanceInput>;
export const OrderStatusHistoryOrderByRelevanceInputObjectZodSchema = makeSchema();
