import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountOrdersArgsObjectSchema as UserCountOutputTypeCountOrdersArgsObjectSchema } from './UserCountOutputTypeCountOrdersArgs.schema';
import { UserCountOutputTypeCountOrderStatusHistoriesArgsObjectSchema as UserCountOutputTypeCountOrderStatusHistoriesArgsObjectSchema } from './UserCountOutputTypeCountOrderStatusHistoriesArgs.schema'

const makeSchema = () => z.object({
  orders: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOrdersArgsObjectSchema)]).optional(),
  orderStatusHistories: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOrderStatusHistoriesArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
