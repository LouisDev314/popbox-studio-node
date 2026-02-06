import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

const shipmentitemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShipmentItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderItemId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ShipmentItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ShipmentItemScalarWhereWithAggregatesInput> = shipmentitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ShipmentItemScalarWhereWithAggregatesInput>;
export const ShipmentItemScalarWhereWithAggregatesInputObjectZodSchema = shipmentitemscalarwherewithaggregatesinputSchema;
