import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithoutOrderItemInputObjectSchema as ShipmentItemUpdateWithoutOrderItemInputObjectSchema } from './ShipmentItemUpdateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedUpdateWithoutOrderItemInput.schema';
import { ShipmentItemCreateWithoutOrderItemInputObjectSchema as ShipmentItemCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemCreateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedCreateWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ShipmentItemUpdateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema)]),
  create: z.union([z.lazy(() => ShipmentItemCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema)])
}).strict();
export const ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInput>;
export const ShipmentItemUpsertWithWhereUniqueWithoutOrderItemInputObjectZodSchema = makeSchema();
