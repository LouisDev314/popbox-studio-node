import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional().nullable(),
  city: z.string().min(1),
  province: z.string().min(1),
  postalCode: z.string().min(1),
  countryCode: z.string().length(2),
  phone: z.string().optional().nullable(),
});

export const checkoutBodySchema = z.object({
  email: z.email(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.uuid(),
        quantity: z.coerce.number().int().min(1).max(20),
      }),
    )
    .min(1),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional().nullable(),
  billingSameAsShipping: z.boolean().optional(),
});

export const successQuerySchema = z.object({
  session_id: z.string().min(1),
});
