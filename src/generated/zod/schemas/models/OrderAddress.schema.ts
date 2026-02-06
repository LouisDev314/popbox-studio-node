import * as z from 'zod';
import { AddressTypeSchema } from '../enums/AddressType.schema';

export const OrderAddressSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  type: AddressTypeSchema,
  name: z.string().nullish(),
  line1: z.string().nullish(),
  line2: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  postalCode: z.string().nullish(),
  country: z.string().nullish(),
  phone: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type OrderAddressType = z.infer<typeof OrderAddressSchema>;
