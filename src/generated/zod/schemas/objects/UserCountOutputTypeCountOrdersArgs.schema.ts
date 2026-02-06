import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountOrdersArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountOrdersArgsObjectZodSchema = makeSchema();
