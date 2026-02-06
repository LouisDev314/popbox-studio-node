import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateWithoutOrderItemInputObjectSchema as ShipmentItemCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutOrderItemInput.schema';
import { ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema as ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateOrConnectWithoutOrderItemInput.schema';
import { ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema as ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema } from './ShipmentItemCreateManyOrderItemInputEnvelope.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema).array(), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema), z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInput>;
export const ShipmentItemUncheckedCreateNestedManyWithoutOrderItemInputObjectZodSchema = makeSchema();
