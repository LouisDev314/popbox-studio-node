import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemCreateInputObjectSchema as ShipmentItemCreateInputObjectSchema } from './objects/ShipmentItemCreateInput.schema';
import { ShipmentItemUncheckedCreateInputObjectSchema as ShipmentItemUncheckedCreateInputObjectSchema } from './objects/ShipmentItemUncheckedCreateInput.schema';
import { ShipmentItemUpdateInputObjectSchema as ShipmentItemUpdateInputObjectSchema } from './objects/ShipmentItemUpdateInput.schema';
import { ShipmentItemUncheckedUpdateInputObjectSchema as ShipmentItemUncheckedUpdateInputObjectSchema } from './objects/ShipmentItemUncheckedUpdateInput.schema';

export const ShipmentItemUpsertOneSchema: z.ZodType<Prisma.ShipmentItemUpsertArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema, create: z.union([ ShipmentItemCreateInputObjectSchema, ShipmentItemUncheckedCreateInputObjectSchema ]), update: z.union([ ShipmentItemUpdateInputObjectSchema, ShipmentItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ShipmentItemUpsertArgs>;

export const ShipmentItemUpsertOneZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema, create: z.union([ ShipmentItemCreateInputObjectSchema, ShipmentItemUncheckedCreateInputObjectSchema ]), update: z.union([ ShipmentItemUpdateInputObjectSchema, ShipmentItemUncheckedUpdateInputObjectSchema ]) }).strict();