import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { NestedEnumAddressTypeFilterObjectSchema as NestedEnumAddressTypeFilterObjectSchema } from './NestedEnumAddressTypeFilter.schema'

const makeSchema = () => z.object({
  equals: AddressTypeSchema.optional(),
  in: AddressTypeSchema.array().optional(),
  notIn: AddressTypeSchema.array().optional(),
  not: z.union([AddressTypeSchema, z.lazy(() => NestedEnumAddressTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumAddressTypeFilterObjectSchema: z.ZodType<Prisma.EnumAddressTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAddressTypeFilter>;
export const EnumAddressTypeFilterObjectZodSchema = makeSchema();
