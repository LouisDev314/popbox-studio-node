import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './objects/ShipmentItemWhereInput.schema';

export const ShipmentItemDeleteManySchema: z.ZodType<Prisma.ShipmentItemDeleteManyArgs> = z.object({ where: ShipmentItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemDeleteManyArgs>;

export const ShipmentItemDeleteManyZodSchema = z.object({ where: ShipmentItemWhereInputObjectSchema.optional() }).strict();