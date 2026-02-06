import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './OrderAddressWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrderAddressWhereInputObjectSchema).optional()
}).strict();
export const OrderCountOutputTypeCountAddressesArgsObjectSchema = makeSchema();
export const OrderCountOutputTypeCountAddressesArgsObjectZodSchema = makeSchema();
