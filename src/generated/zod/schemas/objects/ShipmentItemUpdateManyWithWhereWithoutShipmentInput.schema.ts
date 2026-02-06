import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemScalarWhereInputObjectSchema as ShipmentItemScalarWhereInputObjectSchema } from './ShipmentItemScalarWhereInput.schema';
import { ShipmentItemUpdateManyMutationInputObjectSchema as ShipmentItemUpdateManyMutationInputObjectSchema } from './ShipmentItemUpdateManyMutationInput.schema';
import { ShipmentItemUncheckedUpdateManyWithoutShipmentInputObjectSchema as ShipmentItemUncheckedUpdateManyWithoutShipmentInputObjectSchema } from './ShipmentItemUncheckedUpdateManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ShipmentItemUpdateManyMutationInputObjectSchema), z.lazy(() => ShipmentItemUncheckedUpdateManyWithoutShipmentInputObjectSchema)])
}).strict();
export const ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateManyWithWhereWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyWithWhereWithoutShipmentInput>;
export const ShipmentItemUpdateManyWithWhereWithoutShipmentInputObjectZodSchema = makeSchema();
