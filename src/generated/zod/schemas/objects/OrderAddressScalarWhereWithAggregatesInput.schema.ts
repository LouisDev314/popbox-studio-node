import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { EnumAddressTypeWithAggregatesFilterObjectSchema as EnumAddressTypeWithAggregatesFilterObjectSchema } from './EnumAddressTypeWithAggregatesFilter.schema';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const orderaddressscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderAddressScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderAddressScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderAddressScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderAddressScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderAddressScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumAddressTypeWithAggregatesFilterObjectSchema), AddressTypeSchema]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  line1: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  line2: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  city: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  state: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  postalCode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(20)]).optional().nullable(),
  country: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(2)]).optional().nullable(),
  phone: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(30)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderAddressScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OrderAddressScalarWhereWithAggregatesInput> = orderaddressscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OrderAddressScalarWhereWithAggregatesInput>;
export const OrderAddressScalarWhereWithAggregatesInputObjectZodSchema = orderaddressscalarwherewithaggregatesinputSchema;
