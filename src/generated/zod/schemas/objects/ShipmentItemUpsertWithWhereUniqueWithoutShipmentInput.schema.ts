import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithoutShipmentInputObjectSchema as ShipmentItemUpdateWithoutShipmentInputObjectSchema } from './ShipmentItemUpdateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedUpdateWithoutShipmentInput.schema';
import { ShipmentItemCreateWithoutShipmentInputObjectSchema as ShipmentItemCreateWithoutShipmentInputObjectSchema } from './ShipmentItemCreateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ShipmentItemUpdateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema)])
}).strict();
export const ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpsertWithWhereUniqueWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpsertWithWhereUniqueWithoutShipmentInput>;
export const ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectZodSchema = makeSchema();
