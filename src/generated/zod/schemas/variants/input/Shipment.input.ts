import * as z from 'zod';
import { ShipmentStatusSchema } from '../../enums/ShipmentStatus.schema';
// prettier-ignore
export const ShipmentInputSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    status: ShipmentStatusSchema,
    carrier: z.string().optional().nullable(),
    serviceLevel: z.string().optional().nullable(),
    trackingNumber: z.string().optional().nullable(),
    trackingUrl: z.string().optional().nullable(),
    shippedAt: z.date().optional().nullable(),
    deliveredAt: z.date().optional().nullable(),
    canceledAt: z.date().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    order: z.unknown(),
    items: z.array(z.unknown())
}).strict();

export type ShipmentInputType = z.infer<typeof ShipmentInputSchema>;
