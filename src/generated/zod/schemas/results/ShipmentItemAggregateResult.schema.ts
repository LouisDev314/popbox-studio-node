import * as z from 'zod';
export const ShipmentItemAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    shipmentId: z.number(),
    orderItemId: z.number(),
    quantity: z.number(),
    shipment: z.number(),
    orderItem: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    shipmentId: z.string().nullable(),
    orderItemId: z.string().nullable(),
    quantity: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    shipmentId: z.string().nullable(),
    orderItemId: z.string().nullable(),
    quantity: z.number().int().nullable()
  }).nullable().optional()});