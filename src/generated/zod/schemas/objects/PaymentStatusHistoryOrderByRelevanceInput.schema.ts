import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryOrderByRelevanceFieldEnumSchema } from '../enums/PaymentStatusHistoryOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([PaymentStatusHistoryOrderByRelevanceFieldEnumSchema, PaymentStatusHistoryOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const PaymentStatusHistoryOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryOrderByRelevanceInput>;
export const PaymentStatusHistoryOrderByRelevanceInputObjectZodSchema = makeSchema();
