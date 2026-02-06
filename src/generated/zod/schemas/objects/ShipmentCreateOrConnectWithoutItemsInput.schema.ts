import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentWhereUniqueInputObjectSchema as ShipmentWhereUniqueInputObjectSchema } from './ShipmentWhereUniqueInput.schema';
import { ShipmentCreateWithoutItemsInputObjectSchema as ShipmentCreateWithoutItemsInputObjectSchema } from './ShipmentCreateWithoutItemsInput.schema';
import { ShipmentUncheckedCreateWithoutItemsInputObjectSchema as ShipmentUncheckedCreateWithoutItemsInputObjectSchema } from './ShipmentUncheckedCreateWithoutItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ShipmentCreateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedCreateWithoutItemsInputObjectSchema)])
}).strict();
export const ShipmentCreateOrConnectWithoutItemsInputObjectSchema: z.ZodType<Prisma.ShipmentCreateOrConnectWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentCreateOrConnectWithoutItemsInput>;
export const ShipmentCreateOrConnectWithoutItemsInputObjectZodSchema = makeSchema();
