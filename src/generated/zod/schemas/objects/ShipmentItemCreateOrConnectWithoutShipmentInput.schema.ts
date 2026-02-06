import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemCreateWithoutShipmentInputObjectSchema as ShipmentItemCreateWithoutShipmentInputObjectSchema } from './ShipmentItemCreateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema)])
}).strict();
export const ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateOrConnectWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateOrConnectWithoutShipmentInput>;
export const ShipmentItemCreateOrConnectWithoutShipmentInputObjectZodSchema = makeSchema();
