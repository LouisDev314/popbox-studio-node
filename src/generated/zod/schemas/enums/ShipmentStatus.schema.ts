import * as z from 'zod';

export const ShipmentStatusSchema = z.enum(['PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'LOST', 'RETURNED', 'CANCELED'])

export type ShipmentStatus = z.infer<typeof ShipmentStatusSchema>;