import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumAddressTypeFilterObjectSchema as EnumAddressTypeFilterObjectSchema } from './EnumAddressTypeFilter.schema';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { OrderScalarRelationFilterObjectSchema as OrderScalarRelationFilterObjectSchema } from './OrderScalarRelationFilter.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema'

const orderaddresswhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderAddressWhereInputObjectSchema), z.lazy(() => OrderAddressWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderAddressWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderAddressWhereInputObjectSchema), z.lazy(() => OrderAddressWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumAddressTypeFilterObjectSchema), AddressTypeSchema]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  line1: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  line2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  city: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  state: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  postalCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(20)]).optional().nullable(),
  country: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(2)]).optional().nullable(),
  phone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(30)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  order: z.union([z.lazy(() => OrderScalarRelationFilterObjectSchema), z.lazy(() => OrderWhereInputObjectSchema)]).optional()
}).strict();
export const OrderAddressWhereInputObjectSchema: z.ZodType<Prisma.OrderAddressWhereInput> = orderaddresswhereinputSchema as unknown as z.ZodType<Prisma.OrderAddressWhereInput>;
export const OrderAddressWhereInputObjectZodSchema = orderaddresswhereinputSchema;
