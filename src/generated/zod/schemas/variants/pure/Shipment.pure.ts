import * as z from 'zod';
import { ShipmentStatusSchema } from '../../enums/ShipmentStatus.schema';
// prettier-ignore
export const ShipmentModelSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    status: ShipmentStatusSchema,
    carrier: z.string().nullable(),
    serviceLevel: z.string().nullable(),
    trackingNumber: z.string().nullable(),
    trackingUrl: z.string().nullable(),
    shippedAt: z.date().nullable(),
    deliveredAt: z.date().nullable(),
    canceledAt: z.date().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    order: z.unknown(),
    items: z.array(z.unknown())
}).strict();

export type ShipmentPureType = z.infer<typeof ShipmentModelSchema>;
