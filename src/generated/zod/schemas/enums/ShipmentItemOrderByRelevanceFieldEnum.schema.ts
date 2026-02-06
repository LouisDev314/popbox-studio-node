import * as z from 'zod';

export const ShipmentItemOrderByRelevanceFieldEnumSchema = z.enum(['id', 'shipmentId', 'orderItemId'])

export type ShipmentItemOrderByRelevanceFieldEnum = z.infer<typeof ShipmentItemOrderByRelevanceFieldEnumSchema>;