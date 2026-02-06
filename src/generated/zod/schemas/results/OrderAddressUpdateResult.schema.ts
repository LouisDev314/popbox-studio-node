import * as z from 'zod';
export const OrderAddressUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  orderId: z.string(),
  type: z.unknown(),
  name: z.string().optional(),
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  order: z.unknown()
}));