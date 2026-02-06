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
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  addresses: z.union([z.boolean(), z.lazy(() => OrderAddressFindManySchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => PaymentFindManySchema)]).optional(),
  shipments: z.union([z.boolean(), z.lazy(() => ShipmentFindManySchema)]).optional(),
  statusHistory: z.union([z.boolean(), z.lazy(() => OrderStatusHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrderIncludeObjectSchema: z.ZodType<Prisma.OrderInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrderInclude>;
export const OrderIncludeObjectZodSchema = makeSchema();
