import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistArgsObjectSchema as WishlistArgsObjectSchema } from './WishlistArgs.schema';
import { CartArgsObjectSchema as CartArgsObjectSchema } from './CartArgs.schema';
import { OrderFindManySchema as OrderFindManySchema } from '../findManyOrder.schema';
import { OrderStatusHistoryFindManySchema as OrderStatusHistoryFindManySchema } from '../findManyOrderStatusHistory.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  wishlist: z.union([z.boolean(), z.lazy(() => WishlistArgsObjectSchema)]).optional(),
  cart: z.union([z.boolean(), z.lazy(() => CartArgsObjectSchema)]).optional(),
  orders: z.union([z.boolean(), z.lazy(() => OrderFindManySchema)]).optional(),
  orderStatusHistories: z.union([z.boolean(), z.lazy(() => OrderStatusHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
