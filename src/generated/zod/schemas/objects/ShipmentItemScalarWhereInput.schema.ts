import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema'

const shipmentitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentItemScalarWhereInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentItemScalarWhereInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderItemId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ShipmentItemScalarWhereInputObjectSchema: z.ZodType<Prisma.ShipmentItemScalarWhereInput> = shipmentitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.ShipmentItemScalarWhereInput>;
export const ShipmentItemScalarWhereInputObjectZodSchema = shipmentitemscalarwhereinputSchema;
