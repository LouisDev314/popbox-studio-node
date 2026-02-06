import * as z from 'zod';
// prettier-ignore
export const ShipmentItemResultSchema = z.object({
    id: z.string(),
    shipmentId: z.string(),
    orderItemId: z.string(),
    quantity: z.number().int(),
    shipment: z.unknown(),
    orderItem: z.unknown()
}).strict();

export type ShipmentItemResultType = z.infer<typeof ShipmentItemResultSchema>;
