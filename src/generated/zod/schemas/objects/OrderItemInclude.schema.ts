import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { ProductVariantArgsObjectSchema as ProductVariantArgsObjectSchema } from './ProductVariantArgs.schema';
import { ShipmentItemFindManySchema as ShipmentItemFindManySchema } from '../findManyShipmentItem.schema';
import { OrderItemCountOutputTypeArgsObjectSchema as OrderItemCountOutputTypeArgsObjectSchema } from './OrderItemCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  variant: z.union([z.boolean(), z.lazy(() => ProductVariantArgsObjectSchema)]).optional(),
  shipmentItems: z.union([z.boolean(), z.lazy(() => ShipmentItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrderItemCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrderItemIncludeObjectSchema: z.ZodType<Prisma.OrderItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemInclude>;
export const OrderItemIncludeObjectZodSchema = makeSchema();
