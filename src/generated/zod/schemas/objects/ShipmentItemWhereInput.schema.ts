import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { ShipmentScalarRelationFilterObjectSchema as ShipmentScalarRelationFilterObjectSchema } from './ShipmentScalarRelationFilter.schema';
import { ShipmentWhereInputObjectSchema as ShipmentWhereInputObjectSchema } from './ShipmentWhereInput.schema';
import { OrderItemScalarRelationFilterObjectSchema as OrderItemScalarRelationFilterObjectSchema } from './OrderItemScalarRelationFilter.schema';
import { OrderItemWhereInputObjectSchema as OrderItemWhereInputObjectSchema } from './OrderItemWhereInput.schema'

const shipmentitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShipmentItemWhereInputObjectSchema), z.lazy(() => ShipmentItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShipmentItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShipmentItemWhereInputObjectSchema), z.lazy(() => ShipmentItemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderItemId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  shipment: z.union([z.lazy(() => ShipmentScalarRelationFilterObjectSchema), z.lazy(() => ShipmentWhereInputObjectSchema)]).optional(),
  orderItem: z.union([z.lazy(() => OrderItemScalarRelationFilterObjectSchema), z.lazy(() => OrderItemWhereInputObjectSchema)]).optional()
}).strict();
export const ShipmentItemWhereInputObjectSchema: z.ZodType<Prisma.ShipmentItemWhereInput> = shipmentitemwhereinputSchema as unknown as z.ZodType<Prisma.ShipmentItemWhereInput>;
export const ShipmentItemWhereInputObjectZodSchema = shipmentitemwhereinputSchema;
