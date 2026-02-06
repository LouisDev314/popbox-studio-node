import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithoutShipmentInputObjectSchema as ShipmentItemUpdateWithoutShipmentInputObjectSchema } from './ShipmentItemUpdateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedUpdateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ShipmentItemUpdateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema)])
}).strict();
export const ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateWithWhereUniqueWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateWithWhereUniqueWithoutShipmentInput>;
export const ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectZodSchema = makeSchema();
