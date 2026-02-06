import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './OrderAddressWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OrderAddressWhereInputObjectSchema).optional(),
  some: z.lazy(() => OrderAddressWhereInputObjectSchema).optional(),
  none: z.lazy(() => OrderAddressWhereInputObjectSchema).optional()
}).strict();
export const OrderAddressListRelationFilterObjectSchema: z.ZodType<Prisma.OrderAddressListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressListRelationFilter>;
export const OrderAddressListRelationFilterObjectZodSchema = makeSchema();
