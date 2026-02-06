import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemScalarWhereInputObjectSchema as ShipmentItemScalarWhereInputObjectSchema } from './ShipmentItemScalarWhereInput.schema';
import { ShipmentItemUpdateManyMutationInputObjectSchema as ShipmentItemUpdateManyMutationInputObjectSchema } from './ShipmentItemUpdateManyMutationInput.schema';
import { ShipmentItemUncheckedUpdateManyWithoutOrderItemInputObjectSchema as ShipmentItemUncheckedUpdateManyWithoutOrderItemInputObjectSchema } from './ShipmentItemUncheckedUpdateManyWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ShipmentItemUpdateManyMutationInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateManyWithoutOrderItemInputObjectSchema)])
}).strict();
export const ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateManyWithWhereWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyWithWhereWithoutOrderItemInput>;
export const ShipmentItemUpdateManyWithWhereWithoutOrderItemInputObjectZodSchema = makeSchema();
