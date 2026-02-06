import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateWithoutShipmentInputObjectSchema as ShipmentItemCreateWithoutShipmentInputObjectSchema } from './ShipmentItemCreateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutShipmentInput.schema';
import { ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema as ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema } from './ShipmentItemCreateOrConnectWithoutShipmentInput.schema';
import { ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema as ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema } from './ShipmentItemCreateManyShipmentInputEnvelope.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema).array(), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ShipmentItemUncheckedCreateNestedManyWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedCreateNestedManyWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedCreateNestedManyWithoutShipmentInput>;
export const ShipmentItemUncheckedCreateNestedManyWithoutShipmentInputObjectZodSchema = makeSchema();
