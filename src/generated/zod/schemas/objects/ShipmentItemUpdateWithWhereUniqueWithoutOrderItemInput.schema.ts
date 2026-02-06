import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemUpdateWithoutOrderItemInputObjectSchema as ShipmentItemUpdateWithoutOrderItemInputObjectSchema } from './ShipmentItemUpdateWithoutOrderItemInput.schema';
import { ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedUpdateWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ShipmentItemUpdateWithoutOrderItemInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateWithoutOrderItemInputObjectSchema)])
}).strict();
export const ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInput>;
export const ShipmentItemUpdateWithWhereUniqueWithoutOrderItemInputObjectZodSchema = makeSchema();
