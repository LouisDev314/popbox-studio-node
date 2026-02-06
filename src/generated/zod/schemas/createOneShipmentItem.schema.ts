import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './objects/ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemCreateInputObjectSchema as ShipmentItemCreateInputObjectSchema } from './objects/ShipmentItemCreateInput.schema';
import { ShipmentItemUncheckedCreateInputObjectSchema as ShipmentItemUncheckedCreateInputObjectSchema } from './objects/ShipmentItemUncheckedCreateInput.schema';

export const ShipmentItemCreateOneSchema: z.ZodType<Prisma.ShipmentItemCreateArgs> = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), data: z.union([ShipmentItemCreateInputObjectSchema, ShipmentItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ShipmentItemCreateArgs>;

export const ShipmentItemCreateOneZodSchema = z.object({ select: ShipmentItemSelectObjectSchema.optional(), include: ShipmentItemIncludeObjectSchema.optional(), data: z.union([ShipmentItemCreateInputObjectSchema, ShipmentItemUncheckedCreateInputObjectSchema]) }).strict();