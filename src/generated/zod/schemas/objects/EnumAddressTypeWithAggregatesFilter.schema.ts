import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { NestedEnumAddressTypeWithAggregatesFilterObjectSchema as NestedEnumAddressTypeWithAggregatesFilterObjectSchema } from './NestedEnumAddressTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumAddressTypeFilterObjectSchema as NestedEnumAddressTypeFilterObjectSchema } from './NestedEnumAddressTypeFilter.schema'

const makeSchema = () => z.object({
  equals: AddressTypeSchema.optional(),
  in: AddressTypeSchema.array().optional(),
  notIn: AddressTypeSchema.array().optional(),
  not: z.union([AddressTypeSchema, z.lazy(() => NestedEnumAddressTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumAddressTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumAddressTypeFilterObjectSchema).optional()
}).strict();
export const EnumAddressTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumAddressTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAddressTypeWithAggregatesFilter>;
export const EnumAddressTypeWithAggregatesFilterObjectZodSchema = makeSchema();
