import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemCreateManyInputObjectSchema as ShipmentItemCreateManyInputObjectSchema } from './objects/ShipmentItemCreateManyInput.schema';

export const ShipmentItemCreateManySchema: z.ZodType<Prisma.ShipmentItemCreateManyArgs> = z.object({ data: z.union([ ShipmentItemCreateManyInputObjectSchema, z.array(ShipmentItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyArgs>;

export const ShipmentItemCreateManyZodSchema = z.object({ data: z.union([ ShipmentItemCreateManyInputObjectSchema, z.array(ShipmentItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();