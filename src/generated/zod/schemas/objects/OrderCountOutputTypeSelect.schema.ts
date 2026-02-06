import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCountOutputTypeCountItemsArgsObjectSchema as OrderCountOutputTypeCountItemsArgsObjectSchema } from './OrderCountOutputTypeCountItemsArgs.schema';
import { OrderCountOutputTypeCountAddressesArgsObjectSchema as OrderCountOutputTypeCountAddressesArgsObjectSchema } from './OrderCountOutputTypeCountAddressesArgs.schema';
import { OrderCountOutputTypeCountPaymentsArgsObjectSchema as OrderCountOutputTypeCountPaymentsArgsObjectSchema } from './OrderCountOutputTypeCountPaymentsArgs.schema';
import { OrderCountOutputTypeCountShipmentsArgsObjectSchema as OrderCountOutputTypeCountShipmentsArgsObjectSchema } from './OrderCountOutputTypeCountShipmentsArgs.schema';
import { OrderCountOutputTypeCountStatusHistoryArgsObjectSchema as OrderCountOutputTypeCountStatusHistoryArgsObjectSchema } from './OrderCountOutputTypeCountStatusHistoryArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountItemsArgsObjectSchema)]).optional(),
  addresses: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountAddressesArgsObjectSchema)]).optional(),
  payments: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountPaymentsArgsObjectSchema)]).optional(),
  shipments: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountShipmentsArgsObjectSchema)]).optional(),
  statusHistory: z.union([z.boolean(), z.lazy(() => OrderCountOutputTypeCountStatusHistoryArgsObjectSchema)]).optional()
}).strict();
export const OrderCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrderCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderCountOutputTypeSelect>;
export const OrderCountOutputTypeSelectObjectZodSchema = makeSchema();
