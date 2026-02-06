import * as z from 'zod';

export const ShipmentItemScalarFieldEnumSchema = z.enum(['id', 'shipmentId', 'orderItemId', 'quantity'])

export type ShipmentItemScalarFieldEnum = z.infer<typeof ShipmentItemScalarFieldEnumSchema>;