import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemUpdateInputObjectSchema as ShipmentItemUpdateInputObjectSchema } from './objects/ShipmentItemUpdateInput.schema';
import { ShipmentItemUncheckedUpdateInputObjectSchema as ShipmentItemUncheckedUpdateInputObjectSchema } from './objects/ShipmentItemUncheckedUpdateInput.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';

export const ShipmentItemUpdateOneSchema: z.ZodType<Prisma.ShipmentItemUpdateArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), data: z.union([ShipmentItemUpdateInputObjectSchema, ShipmentItemUncheckedUpdateInputObjectSchema]), where: ShipmentItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShipmentItemUpdateArgs>;

export const ShipmentItemUpdateOneZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), data: z.union([ShipmentItemUpdateInputObjectSchema, ShipmentItemUncheckedUpdateInputObjectSchema]), where: ShipmentItemWhereUniqueInputObjectSchema }).strict();