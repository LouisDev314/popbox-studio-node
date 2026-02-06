import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressUpdateManyMutationInputObjectSchema as OrderAddressUpdateManyMutationInputObjectSchema } from './objects/OrderAddressUpdateManyMutationInput.schema';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './objects/OrderAddressWhereInput.schema';

export const OrderAddressUpdateManyAndReturnSchema: z.ZodType<Prisma.OrderAddressUpdateManyAndReturnArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), data: OrderAddressUpdateManyMutationInputObjectSchema, where: OrderAddressWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressUpdateManyAndReturnArgs>;

export const OrderAddressUpdateManyAndReturnZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), data: OrderAddressUpdateManyMutationInputObjectSchema, where: OrderAddressWhereInputObjectSchema.optional() }).strict();