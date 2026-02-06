import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressCreateManyInputObjectSchema as OrderAddressCreateManyInputObjectSchema } from './objects/OrderAddressCreateManyInput.schema';

export const OrderAddressCreateManyAndReturnSchema: z.ZodType<Prisma.OrderAddressCreateManyAndReturnArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), data: z.union([ OrderAddressCreateManyInputObjectSchema, z.array(OrderAddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressCreateManyAndReturnArgs>;

export const OrderAddressCreateManyAndReturnZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), data: z.union([ OrderAddressCreateManyInputObjectSchema, z.array(OrderAddressCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();