import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressOrderByRelevanceFieldEnumSchema } from '../enums/OrderAddressOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([OrderAddressOrderByRelevanceFieldEnumSchema, OrderAddressOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const OrderAddressOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.OrderAddressOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressOrderByRelevanceInput>;
export const OrderAddressOrderByRelevanceInputObjectZodSchema = makeSchema();
