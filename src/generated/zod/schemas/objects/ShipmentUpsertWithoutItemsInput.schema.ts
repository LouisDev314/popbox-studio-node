import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentUpdateWithoutItemsInputObjectSchema as ShipmentUpdateWithoutItemsInputObjectSchema } from './ShipmentUpdateWithoutItemsInput.schema';
import { ShipmentUncheckedUpdateWithoutItemsInputObjectSchema as ShipmentUncheckedUpdateWithoutItemsInputObjectSchema } from './ShipmentUncheckedUpdateWithoutItemsInput.schema';
import { ShipmentCreateWithoutItemsInputObjectSchema as ShipmentCreateWithoutItemsInputObjectSchema } from './ShipmentCreateWithoutItemsInput.schema';
import { ShipmentUncheckedCreateWithoutItemsInputObjectSchema as ShipmentUncheckedCreateWithoutItemsInputObjectSchema } from './ShipmentUncheckedCreateWithoutItemsInput.schema';
import { ShipmentWhereInputObjectSchema as ShipmentWhereInputObjectSchema } from './ShipmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ShipmentUpdateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedUpdateWithoutItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => ShipmentCreateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedCreateWithoutItemsInputObjectSchema)]),
  where: z.lazy(() => ShipmentWhereInputObjectSchema).optional()
}).strict();
export const ShipmentUpsertWithoutItemsInputObjectSchema: z.ZodType<Prisma.ShipmentUpsertWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentUpsertWithoutItemsInput>;
export const ShipmentUpsertWithoutItemsInputObjectZodSchema = makeSchema();
