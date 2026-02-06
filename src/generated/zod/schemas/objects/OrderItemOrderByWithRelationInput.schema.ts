import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './OrderOrderByWithRelationInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { ProductVariantOrderByWithRelationInputObjectSchema as ProductVariantOrderByWithRelationInputObjectSchema } from './ProductVariantOrderByWithRelationInput.schema';
import { ShipmentItemOrderByRelationAggregateInputObjectSchema as ShipmentItemOrderByRelationAggregateInputObjectSchema } from './ShipmentItemOrderByRelationAggregateInput.schema';
import { OrderItemOrderByRelevanceInputObjectSchema as OrderItemOrderByRelevanceInputObjectSchema } from './OrderItemOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  variantId: SortOrderSchema.optional(),
  productName: SortOrderSchema.optional(),
  variantName: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quantity: SortOrderSchema.optional(),
  unitPrice: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputObjectSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  variant: z.lazy(() => ProductVariantOrderByWithRelationInputObjectSchema).optional(),
  shipmentItems: z.lazy(() => ShipmentItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => OrderItemOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const OrderItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrderItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemOrderByWithRelationInput>;
export const OrderItemOrderByWithRelationInputObjectZodSchema = makeSchema();
