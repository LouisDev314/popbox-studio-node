import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';

export const ShipmentItemDeleteOneSchema: z.ZodType<Prisma.ShipmentItemDeleteArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShipmentItemDeleteArgs>;

export const ShipmentItemDeleteOneZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), where: ShipmentItemWhereUniqueInputObjectSchema }).strict();