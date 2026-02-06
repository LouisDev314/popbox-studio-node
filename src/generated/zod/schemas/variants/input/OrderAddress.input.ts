import * as z from 'zod';
import { AddressTypeSchema } from '../../enums/AddressType.schema';
// prettier-ignore
export const OrderAddressInputSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    type: AddressTypeSchema,
    name: z.string().optional().nullable(),
    line1: z.string().optional().nullable(),
    line2: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    postalCode: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    order: z.unknown()
}).strict();

export type OrderAddressInputType = z.infer<typeof OrderAddressInputSchema>;
