import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';

export const ShipmentItemFindUniqueSchema: z.ZodType<Prisma.ShipmentItemFindUniqueArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShipmentItemFindUniqueArgs>;

export const ShipmentItemFindUniqueZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict();