import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActiveUserOrderByRelevanceFieldEnumSchema } from '../enums/ActiveUserOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ActiveUserOrderByRelevanceFieldEnumSchema, ActiveUserOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ActiveUserOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ActiveUserOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserOrderByRelevanceInput>;
export const ActiveUserOrderByRelevanceInputObjectZodSchema = makeSchema();
