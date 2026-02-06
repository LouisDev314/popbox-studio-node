import * as z from 'zod';
import { AddressTypeSchema } from '../../enums/AddressType.schema';
// prettier-ignore
export const OrderAddressModelSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    type: AddressTypeSchema,
    name: z.string().nullable(),
    line1: z.string().nullable(),
    line2: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    postalCode: z.string().nullable(),
    country: z.string().nullable(),
    phone: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    order: z.unknown()
}).strict();

export type OrderAddressPureType = z.infer<typeof OrderAddressModelSchema>;
