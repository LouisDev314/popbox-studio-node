import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { ProductVariantArgsObjectSchema as ProductVariantArgsObjectSchema } from './ProductVariantArgs.schema';
import { ShipmentItemFindManySchema as ShipmentItemFindManySchema } from '../findManyShipmentItem.schema';
import { OrderItemCountOutputTypeArgsObjectSchema as OrderItemCountOutputTypeArgsObjectSchema } from './OrderItemCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  productId: z.boolean().optional(),
  variantId: z.boolean().optional(),
  productName: z.boolean().optional(),
  variantName: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unitPrice: z.boolean().optional(),
  currency: z.boolean().optional(),
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  variant: z.union([z.boolean(), z.lazy(() => ProductVariantArgsObjectSchema)]).optional(),
  shipmentItems: z.union([z.boolean(), z.lazy(() => ShipmentItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrderItemCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrderItemSelectObjectSchema: z.ZodType<Prisma.OrderItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemSelect>;
export const OrderItemSelectObjectZodSchema = makeSchema();
