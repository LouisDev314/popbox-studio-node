import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressCreateManyInputObjectSchema as OrderAddressCreateManyInputObjectSchema } from './objects/OrderAddressCreateManyInput.schema';

export const OrderAddressCreateManySchema: z.ZodType<Prisma.OrderAddressCreateManyArgs> = z.object({ data: z.union([ OrderAddressCreateManyInputObjectSchema, z.array(OrderAddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressCreateManyArgs>;

export const OrderAddressCreateManyZodSchema = z.object({ data: z.union([ OrderAddressCreateManyInputObjectSchema, z.array(OrderAddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();