import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressUpdateManyMutationInputObjectSchema as OrderAddressUpdateManyMutationInputObjectSchema } from './objects/OrderAddressUpdateManyMutationInput.schema';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './objects/OrderAddressWhereInput.schema';

export const OrderAddressUpdateManySchema: z.ZodType<Prisma.OrderAddressUpdateManyArgs> = z.object({ data: OrderAddressUpdateManyMutationInputObjectSchema, where: OrderAddressWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressUpdateManyArgs>;

export const OrderAddressUpdateManyZodSchema = z.object({ data: OrderAddressUpdateManyMutationInputObjectSchema, where: OrderAddressWhereInputObjectSchema.optional() }).strict();