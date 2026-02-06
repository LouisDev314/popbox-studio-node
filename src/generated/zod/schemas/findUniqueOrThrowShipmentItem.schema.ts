import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';

export const ShipmentItemFindUniqueOrThrowSchema: z.ZodType<Prisma.ShipmentItemFindUniqueOrThrowArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShipmentItemFindUniqueOrThrowArgs>;

export const ShipmentItemFindUniqueOrThrowZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict();