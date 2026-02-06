import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemCreateWithoutOrderItemInputObjectSchema as ShipmentItemCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema)])
}).strict();
export const ShipmentItemCreateOrConnectWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateOrConnectWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateOrConnectWithoutOrderItemInput>;
export const ShipmentItemCreateOrConnectWithoutOrderItemInputObjectZodSchema = makeSchema();
