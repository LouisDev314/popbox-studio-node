import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentCreateWithoutItemsInputObjectSchema as ShipmentCreateWithoutItemsInputObjectSchema } from './ShipmentCreateWithoutItemsInput.schema';
import { ShipmentUncheckedCreateWithoutItemsInputObjectSchema as ShipmentUncheckedCreateWithoutItemsInputObjectSchema } from './ShipmentUncheckedCreateWithoutItemsInput.schema';
import { ShipmentCreateOrConnectWithoutItemsInputObjectSchema as ShipmentCreateOrConnectWithoutItemsInputObjectSchema } from './ShipmentCreateOrConnectWithoutItemsInput.schema';
import { ShipmentUpsertWithoutItemsInputObjectSchema as ShipmentUpsertWithoutItemsInputObjectSchema } from './ShipmentUpsertWithoutItemsInput.schema';
import { ShipmentWhereUniqueInputObjectSchema as ShipmentWhereUniqueInputObjectSchema } from './ShipmentWhereUniqueInput.schema';
import { ShipmentUpdateToOneWithWhereWithoutItemsInputObjectSchema as ShipmentUpdateToOneWithWhereWithoutItemsInputObjectSchema } from './ShipmentUpdateToOneWithWhereWithoutItemsInput.schema';
import { ShipmentUpdateWithoutItemsInputObjectSchema as ShipmentUpdateWithoutItemsInputObjectSchema } from './ShipmentUpdateWithoutItemsInput.schema';
import { ShipmentUncheckedUpdateWithoutItemsInputObjectSchema as ShipmentUncheckedUpdateWithoutItemsInputObjectSchema } from './ShipmentUncheckedUpdateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentCreateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShipmentCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ShipmentUpsertWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ShipmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ShipmentUpdateToOneWithWhereWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUpdateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedUpdateWithoutItemsInputObjectSchema)]).optional()
}).strict();
export const ShipmentUpdateOneRequiredWithoutItemsNestedInputObjectSchema: z.ZodType<Prisma.ShipmentUpdateOneRequiredWithoutItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentUpdateOneRequiredWithoutItemsNestedInput>;
export const ShipmentUpdateOneRequiredWithoutItemsNestedInputObjectZodSchema = makeSchema();
