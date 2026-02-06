import * as z from 'zod';
// prettier-ignore
export const ShipmentItemModelSchema = z.object({
    id: z.string(),
    shipmentId: z.string(),
    orderItemId: z.string(),
    quantity: z.number().int(),
    shipment: z.unknown(),
    orderItem: z.unknown()
}).strict();

export type ShipmentItemPureType = z.infer<typeof ShipmentItemModelSchema>;
