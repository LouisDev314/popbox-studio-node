import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressUpdateInputObjectSchema as OrderAddressUpdateInputObjectSchema } from './objects/OrderAddressUpdateInput.schema';
import { OrderAddressUncheckedUpdateInputObjectSchema as OrderAddressUncheckedUpdateInputObjectSchema } from './objects/OrderAddressUncheckedUpdateInput.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';

export const OrderAddressUpdateOneSchema: z.ZodType<Prisma.OrderAddressUpdateArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), data: z.union([OrderAddressUpdateInputObjectSchema, OrderAddressUncheckedUpdateInputObjectSchema]), where: OrderAddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderAddressUpdateArgs>;

export const OrderAddressUpdateOneZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), data: z.union([OrderAddressUpdateInputObjectSchema, OrderAddressUncheckedUpdateInputObjectSchema]), where: OrderAddressWhereUniqueInputObjectSchema }).strict();