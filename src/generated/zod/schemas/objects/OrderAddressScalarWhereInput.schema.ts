import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumAddressTypeFilterObjectSchema as EnumAddressTypeFilterObjectSchema } from './EnumAddressTypeFilter.schema';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const orderaddressscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderAddressScalarWhereInputObjectSchema), z.lazy(() => OrderAddressScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderAddressScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderAddressScalarWhereInputObjectSchema), z.lazy(() => OrderAddressScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumAddressTypeFilterObjectSchema), AddressTypeSchema]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  line1: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  line2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  city: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  state: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  postalCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  country: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderAddressScalarWhereInputObjectSchema: z.ZodType<Prisma.OrderAddressScalarWhereInput> = orderaddressscalarwhereinputSchema as unknown as z.ZodType<Prisma.OrderAddressScalarWhereInput>;
export const OrderAddressScalarWhereInputObjectZodSchema = orderaddressscalarwhereinputSchema;
