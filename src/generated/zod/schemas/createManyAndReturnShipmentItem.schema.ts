import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemCreateManyInputObjectSchema as ShipmentItemCreateManyInputObjectSchema } from './objects/ShipmentItemCreateManyInput.schema';

export const ShipmentItemCreateManyAndReturnSchema: z.ZodType<Prisma.ShipmentItemCreateManyAndReturnArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), data: z.union([ ShipmentItemCreateManyInputObjectSchema, z.array(ShipmentItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyAndReturnArgs>;

export const ShipmentItemCreateManyAndReturnZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), data: z.union([ ShipmentItemCreateManyInputObjectSchema, z.array(ShipmentItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();