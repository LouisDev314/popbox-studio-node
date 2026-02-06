import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema'

const nestedenumaddresstypefilterSchema = z.object({
  equals: AddressTypeSchema.optional(),
  in: AddressTypeSchema.array().optional(),
  notIn: AddressTypeSchema.array().optional(),
  not: z.union([AddressTypeSchema, z.lazy(() => NestedEnumAddressTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumAddressTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumAddressTypeFilter> = nestedenumaddresstypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumAddressTypeFilter>;
export const NestedEnumAddressTypeFilterObjectZodSchema = nestedenumaddresstypefilterSchema;
