import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemUpdateManyMutationInputObjectSchema as ShipmentItemUpdateManyMutationInputObjectSchema } from './objects/ShipmentItemUpdateManyMutationInput.schema';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './objects/ShipmentItemWhereInput.schema';

export const ShipmentItemUpdateManyAndReturnSchema: z.ZodType<Prisma.ShipmentItemUpdateManyAndReturnArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), data: ShipmentItemUpdateManyMutationInputObjectSchema, where: ShipmentItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyAndReturnArgs>;

export const ShipmentItemUpdateManyAndReturnZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), data: ShipmentItemUpdateManyMutationInputObjectSchema, where: ShipmentItemWhereInputObjectSchema.optional() }).strict();