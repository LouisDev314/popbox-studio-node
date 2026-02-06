import * as z from 'zod';

export const PaymentStatusSchema = z.enum(['PENDING', 'REQUIRES_ACTION', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELED'])

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;