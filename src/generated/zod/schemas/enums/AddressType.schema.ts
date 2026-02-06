import * as z from 'zod';

export const AddressTypeSchema = z.enum(['SHIPPING', 'BILLING'])

export type AddressType = z.infer<typeof AddressTypeSchema>;