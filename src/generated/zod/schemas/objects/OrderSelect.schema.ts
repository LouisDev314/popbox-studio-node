import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { OrderAddressFindManySchema as OrderAddressFindManySchema } from '../findManyOrderAddress.schema';
import { PaymentFindManySchema as PaymentFindManySchema } from '../findManyPayment.schema';
import { ShipmentFindManySchema as ShipmentFindManySchema } from '../findManyShipment.schema';
import { OrderStatusHistoryFindManySchema as OrderStatusHistoryFindManySchema } from '../findManyOrderStatusHistory.schema';
import { OrderCountOutputTypeArgsObjectSchema as OrderCountOutputTypeArgsObjectSchema } from './OrderCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderNumber: z.boolean().optional(),
  userId: z.boolean().optional(),
  status: z.boolean().optional(),
  subtotalAmount: z.boolean().optional(),
  taxAmount: z.boolean().optional(),
  shippingAmount: z.boolean().optional(),
  discountAmount: z.boolean().optional(),
  totalAmount: z.boolean().optional(),
  currency: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  addresses: z.union([z.boolean(), z.lazy(() => OrderAddressFindManySchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  shipments: z.union([z.boolean(), z.lazy(() => ShipmentFindManySchema)]).optional(),
  statusHistory: z.union([z.boolean(), z.lazy(() => OrderStatusHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrderSelectObjectSchema: z.ZodType<Prisma.OrderSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderSelect>;
export const OrderSelectObjectZodSchema = makeSchema();
