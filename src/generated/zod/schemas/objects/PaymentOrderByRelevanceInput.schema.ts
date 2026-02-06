import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentOrderByRelevanceFieldEnumSchema } from '../enums/PaymentOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([PaymentOrderByRelevanceFieldEnumSchema, PaymentOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const PaymentOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.PaymentOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentOrderByRelevanceInput>;
export const PaymentOrderByRelevanceInputObjectZodSchema = makeSchema();
