import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateWithoutOrderItemInputObjectSchema as ShipmentItemCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutOrderItemInput.schema';
import { ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema as ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateOrConnectWithoutOrderItemInput.schema';
import { ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectSchema as ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectSchema } from './ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInput.schema';
import { ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema as ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema } from './ShipmentItemCreateManyOrderItemInputEnvelope.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectSchema as ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectSchema } from './ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInput.schema';
import { ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectSchema as ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectSchema } from './ShipmentItemUpdateManyWithWhereWithoutOrderItemInput.schema';
import { ShipmentItemScalarWhereInputObjectSchema as ShipmentItemScalarWhereInputObjectSchema } from './ShipmentItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema).array(), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShipmentItemScalarWhereInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ShipmentItemUpdateManyWithoutOrderItemNestedInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateManyWithoutOrderItemNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyWithoutOrderItemNestedInput>;
export const ShipmentItemUpdateManyWithoutOrderItemNestedInputObjectZodSchema = makeSchema();
