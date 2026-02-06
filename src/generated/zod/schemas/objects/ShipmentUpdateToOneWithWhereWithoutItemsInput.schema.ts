import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentWhereInputObjectSchema as ShipmentWhereInputObjectSchema } from './ShipmentWhereInput.schema';
import { ShipmentUpdateWithoutItemsInputObjectSchema as ShipmentUpdateWithoutItemsInputObjectSchema } from './ShipmentUpdateWithoutItemsInput.schema';
import { ShipmentUncheckedUpdateWithoutItemsInputObjectSchema as ShipmentUncheckedUpdateWithoutItemsInputObjectSchema } from './ShipmentUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ShipmentUpdateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedUpdateWithoutItemsInputObjectSchema)])
}).strict();
export const ShipmentUpdateToOneWithWhereWithoutItemsInputObjectSchema: z.ZodType<Prisma.ShipmentUpdateToOneWithWhereWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentUpdateToOneWithWhereWithoutItemsInput>;
export const ShipmentUpdateToOneWithWhereWithoutItemsInputObjectZodSchema = makeSchema();
