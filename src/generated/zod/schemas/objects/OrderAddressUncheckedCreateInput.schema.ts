import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  type: AddressTypeSchema,
  name: z.string().max(100).optional().nullable(),
  line1: z.string().max(255).optional().nullable(),
  line2: z.string().max(255).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(100).optional().nullable(),
  postalCode: z.string().max(20).optional().nullable(),
  country: z.string().max(2).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const OrderAddressUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrderAddressUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUncheckedCreateInput>;
export const OrderAddressUncheckedCreateInputObjectZodSchema = makeSchema();
