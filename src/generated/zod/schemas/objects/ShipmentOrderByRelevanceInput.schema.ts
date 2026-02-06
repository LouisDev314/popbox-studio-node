import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentOrderByRelevanceFieldEnumSchema } from '../enums/ShipmentOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([ShipmentOrderByRelevanceFieldEnumSchema, ShipmentOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const ShipmentOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.ShipmentOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentOrderByRelevanceInput>;
export const ShipmentOrderByRelevanceInputObjectZodSchema = makeSchema();
