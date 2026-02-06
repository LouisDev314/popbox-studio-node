import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderAddressCountOrderByAggregateInputObjectSchema as OrderAddressCountOrderByAggregateInputObjectSchema } from './OrderAddressCountOrderByAggregateInput.schema';
import { OrderAddressMaxOrderByAggregateInputObjectSchema as OrderAddressMaxOrderByAggregateInputObjectSchema } from './OrderAddressMaxOrderByAggregateInput.schema';
import { OrderAddressMinOrderByAggregateInputObjectSchema as OrderAddressMinOrderByAggregateInputObjectSchema } from './OrderAddressMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  line1: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  line2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  state: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  postalCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  country: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => OrderAddressCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OrderAddressMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OrderAddressMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OrderAddressOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OrderAddressOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressOrderByWithAggregationInput>;
export const OrderAddressOrderByWithAggregationInputObjectZodSchema = makeSchema();
