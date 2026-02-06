import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentCreateWithoutItemsInputObjectSchema as ShipmentCreateWithoutItemsInputObjectSchema } from './ShipmentCreateWithoutItemsInput.schema';
import { ShipmentUncheckedCreateWithoutItemsInputObjectSchema as ShipmentUncheckedCreateWithoutItemsInputObjectSchema } from './ShipmentUncheckedCreateWithoutItemsInput.schema';
import { ShipmentCreateOrConnectWithoutItemsInputObjectSchema as ShipmentCreateOrConnectWithoutItemsInputObjectSchema } from './ShipmentCreateOrConnectWithoutItemsInput.schema';
import { ShipmentWhereUniqueInputObjectSchema as ShipmentWhereUniqueInputObjectSchema } from './ShipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShipmentCreateWithoutItemsInputObjectSchema), z.lazy(() => ShipmentUncheckedCreateWithoutItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShipmentCreateOrConnectWithoutItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ShipmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const ShipmentCreateNestedOneWithoutItemsInputObjectSchema: z.ZodType<Prisma.ShipmentCreateNestedOneWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentCreateNestedOneWithoutItemsInput>;
export const ShipmentCreateNestedOneWithoutItemsInputObjectZodSchema = makeSchema();
