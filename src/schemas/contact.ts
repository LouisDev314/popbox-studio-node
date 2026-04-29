import { z } from 'zod';

export const inquiryTypes = [
  'product-request',
  'order-support',
  'shipping-support',
  'ticket-support',
  'general',
] as const;

export const contactBodySchema = z
  .object({
    firstName: z.string().trim().min(1, 'First name is required.').max(50),
    lastName: z.string().trim().min(1, 'Last name is required.').max(50).optional().or(z.literal('')),
    email: z.email('Invalid email address.'),
    inquiryType: z.enum(inquiryTypes),
    orderNumber: z.string().trim().max(50).optional().or(z.literal('')),
    requestedSeries: z.string().trim().max(120).optional().or(z.literal('')),
    message: z.string().trim().min(12, 'Message must be at least 12 characters.').max(1000),
  })
  .superRefine((values, ctx) => {
    const isSupport =
      values.inquiryType === 'order-support' ||
      values.inquiryType === 'shipping-support' ||
      values.inquiryType === 'ticket-support';

    if (isSupport && !values.orderNumber?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['orderNumber'],
        message: 'Order number is required for support requests.',
      });
    }

    if (values.inquiryType === 'product-request' && !values.requestedSeries?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['requestedSeries'],
        message: 'Please specify the series or product you want.',
      });
    }
  });

export type ContactBody = z.infer<typeof contactBodySchema>;
