import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemUpdateManyMutationInputObjectSchema as ShipmentItemUpdateManyMutationInputObjectSchema } from './objects/ShipmentItemUpdateManyMutationInput.schema';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './objects/ShipmentItemWhereInput.schema';

export const ShipmentItemUpdateManySchema: z.ZodType<Prisma.ShipmentItemUpdateManyArgs> = z.object({ data: ShipmentItemUpdateManyMutationInputObjectSchema, where: ShipmentItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyArgs>;

export const ShipmentItemUpdateManyZodSchema = z.object({ data: ShipmentItemUpdateManyMutationInputObjectSchema, where: ShipmentItemWhereInputObjectSchema.optional() }).strict();