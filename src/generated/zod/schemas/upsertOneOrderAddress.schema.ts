import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';
import { OrderAddressCreateInputObjectSchema as OrderAddressCreateInputObjectSchema } from './objects/OrderAddressCreateInput.schema';
import { OrderAddressUncheckedCreateInputObjectSchema as OrderAddressUncheckedCreateInputObjectSchema } from './objects/OrderAddressUncheckedCreateInput.schema';
import { OrderAddressUpdateInputObjectSchema as OrderAddressUpdateInputObjectSchema } from './objects/OrderAddressUpdateInput.schema';
import { OrderAddressUncheckedUpdateInputObjectSchema as OrderAddressUncheckedUpdateInputObjectSchema } from './objects/OrderAddressUncheckedUpdateInput.schema';

export const OrderAddressUpsertOneSchema: z.ZodType<Prisma.OrderAddressUpsertArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema, create: z.union([ OrderAddressCreateInputObjectSchema, OrderAddressUncheckedCreateInputObjectSchema ]), update: z.union([ OrderAddressUpdateInputObjectSchema, OrderAddressUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OrderAddressUpsertArgs>;

export const OrderAddressUpsertOneZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema, create: z.union([ OrderAddressCreateInputObjectSchema, OrderAddressUncheckedCreateInputObjectSchema ]), update: z.union([ OrderAddressUpdateInputObjectSchema, OrderAddressUncheckedUpdateInputObjectSchema ]) }).strict();