import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { OrderItemOrderByRelationAggregateInputObjectSchema as OrderItemOrderByRelationAggregateInputObjectSchema } from './OrderItemOrderByRelationAggregateInput.schema';
import { OrderAddressOrderByRelationAggregateInputObjectSchema as OrderAddressOrderByRelationAggregateInputObjectSchema } from './OrderAddressOrderByRelationAggregateInput.schema';
import { PaymentOrderByRelationAggregateInputObjectSchema as PaymentOrderByRelationAggregateInputObjectSchema } from './PaymentOrderByRelationAggregateInput.schema';
import { ShipmentOrderByRelationAggregateInputObjectSchema as ShipmentOrderByRelationAggregateInputObjectSchema } from './ShipmentOrderByRelationAggregateInput.schema';
import { OrderStatusHistoryOrderByRelationAggregateInputObjectSchema as OrderStatusHistoryOrderByRelationAggregateInputObjectSchema } from './OrderStatusHistoryOrderByRelationAggregateInput.schema';
import { OrderOrderByRelevanceInputObjectSchema as OrderOrderByRelevanceInputObjectSchema } from './OrderOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderNumber: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  subtotalAmount: SortOrderSchema.optional(),
  taxAmount: SortOrderSchema.optional(),
  shippingAmount: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  items: z.lazy(() => OrderItemOrderByRelationAggregateInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressOrderByRelationAggregateInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentOrderByRelationAggregateInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentOrderByRelationAggregateInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => OrderOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const OrderOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrderOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderOrderByWithRelationInput>;
export const OrderOrderByWithRelationInputObjectZodSchema = makeSchema();
