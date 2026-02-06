import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateWithoutShipmentInputObjectSchema as ShipmentItemCreateWithoutShipmentInputObjectSchema } from './ShipmentItemCreateWithoutShipmentInput.schema';
import { ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema as ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutShipmentInput.schema';
import { ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema as ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema } from './ShipmentItemCreateOrConnectWithoutShipmentInput.schema';
import { ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectSchema as ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectSchema } from './ShipmentItemUpsertWithWhereUniqueWithoutShipmentInput.schema';
import { ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema as ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema } from './ShipmentItemCreateManyShipmentInputEnvelope.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectSchema as ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectSchema } from './ShipmentItemUpdateWithWhereUniqueWithoutShipmentInput.schema';
import { ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectSchema as ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectSchema } from './ShipmentItemUpdateManyWithWhereWithoutShipmentInput.schema';
import { ShipmentItemScalarWhereInputObjectSchema as ShipmentItemScalarWhereInputObjectSchema } from './ShipmentItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemCreateWithoutShipmentInputObjectSchema).array(), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemCreateOrConnectWithoutShipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUpsertWithWhereUniqueWithoutShipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUpdateWithWhereUniqueWithoutShipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectSchema), z.lazy(() => ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShipmentItemScalarWhereInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ShipmentItemUncheckedUpdateManyWithoutShipmentNestedInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedUpdateManyWithoutShipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedUpdateManyWithoutShipmentNestedInput>;
export const ShipmentItemUncheckedUpdateManyWithoutShipmentNestedInputObjectZodSchema = makeSchema();
