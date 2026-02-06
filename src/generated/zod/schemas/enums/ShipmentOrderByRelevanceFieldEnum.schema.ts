import * as z from 'zod';

export const ShipmentOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderId', 'carrier', 'serviceLevel', 'trackingNumber', 'trackingUrl'])

export type ShipmentOrderByRelevanceFieldEnum = z.infer<typeof ShipmentOrderByRelevanceFieldEnumSchema>;