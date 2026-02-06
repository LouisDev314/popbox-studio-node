import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemOrderByRelevanceFieldEnumSchema } from '../enums/ShipmentItemOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ShipmentItemOrderByRelevanceFieldEnumSchema, ShipmentItemOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ShipmentItemOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ShipmentItemOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemOrderByRelevanceInput>;
export const ShipmentItemOrderByRelevanceInputObjectZodSchema = makeSchema();
