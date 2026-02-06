import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: AddressTypeSchema,
  name: z.string().optional().nullable(),
  line1: z.string().optional().nullable(),
  line2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const OrderAddressUncheckedCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderAddressUncheckedCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressUncheckedCreateWithoutOrderInput>;
export const OrderAddressUncheckedCreateWithoutOrderInputObjectZodSchema = makeSchema();
