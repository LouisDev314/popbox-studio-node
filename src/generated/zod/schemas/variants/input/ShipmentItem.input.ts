import * as z from 'zod';
// prettier-ignore
export const ShipmentItemInputSchema = z.object({
    id: z.string(),
    shipmentId: z.string(),
    orderItemId: z.string(),
    quantity: z.number().int(),
    shipment: z.unknown(),
    orderItem: z.unknown()
}).strict();

export type ShipmentItemInputType = z.infer<typeof ShipmentItemInputSchema>;
