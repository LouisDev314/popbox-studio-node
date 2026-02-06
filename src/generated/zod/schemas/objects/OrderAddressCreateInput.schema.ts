import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema';
import { OrderCreateNestedOneWithoutAddressesInputObjectSchema as OrderCreateNestedOneWithoutAddressesInputObjectSchema } from './OrderCreateNestedOneWithoutAddressesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: AddressTypeSchema,
  name: z.string().max(100).optional().nullable(),
  line1: z.string().max(255).optional().nullable(),
  line2: z.string().max(255).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(100).optional().nullable(),
  postalCode: z.string().max(20).optional().nullable(),
  country: z.string().max(2).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutAddressesInputObjectSchema)
}).strict();
export const OrderAddressCreateInputObjectSchema: z.ZodType<Prisma.OrderAddressCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressCreateInput>;
export const OrderAddressCreateInputObjectZodSchema = makeSchema();
