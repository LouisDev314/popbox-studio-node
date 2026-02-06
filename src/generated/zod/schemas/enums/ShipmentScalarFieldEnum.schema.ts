import * as z from 'zod';

export const ShipmentScalarFieldEnumSchema = z.enum(['id', 'orderId', 'status', 'carrier', 'serviceLevel', 'trackingNumber', 'trackingUrl', 'shippedAt', 'deliveredAt', 'canceledAt', 'metadata', 'createdAt', 'updatedAt'])

export type ShipmentScalarFieldEnum = z.infer<typeof ShipmentScalarFieldEnumSchema>;