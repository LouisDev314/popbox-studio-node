import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentIncludeObjectSchema as PaymentIncludeObjectSchema } from './objects/PaymentInclude.schema';
import { PaymentOrderByWithRelationInputObjectSchema as PaymentOrderByWithRelationInputObjectSchema } from './objects/PaymentOrderByWithRelationInput.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './objects/PaymentWhereInput.schema';
import { PaymentWhereUniqueInputObjectSchema as PaymentWhereUniqueInputObjectSchema } from './objects/PaymentWhereUniqueInput.schema';
import { PaymentScalarFieldEnumSchema } from './enums/PaymentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PaymentFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    status: z.boolean().optional(),
    amount: z.boolean().optional(),
    currency: z.boolean().optional(),
    stripePaymentIntentId: z.boolean().optional(),
    stripeChargeId: z.boolean().optional(),
    stripeCheckoutSessionId: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    idempotencyKey: z.boolean().optional(),
    failureCode: z.boolean().optional(),
    failureMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    succeededAt: z.boolean().optional(),
    canceledAt: z.boolean().optional(),
    order: z.boolean().optional(),
    statusHistory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PaymentSelect>;

export const PaymentFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    status: z.boolean().optional(),
    amount: z.boolean().optional(),
    currency: z.boolean().optional(),
    stripePaymentIntentId: z.boolean().optional(),
    stripeChargeId: z.boolean().optional(),
    stripeCheckoutSessionId: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    idempotencyKey: z.boolean().optional(),
    failureCode: z.boolean().optional(),
    failureMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    succeededAt: z.boolean().optional(),
    canceledAt: z.boolean().optional(),
    order: z.boolean().optional(),
    statusHistory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PaymentFindFirstOrThrowSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({ select: PaymentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PaymentIncludeObjectSchema.optional()), orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentScalarFieldEnumSchema, PaymentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PaymentFindFirstOrThrowArgs>;

export const PaymentFindFirstOrThrowZodSchema = z.object({ select: PaymentFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PaymentIncludeObjectSchema.optional()), orderBy: z.union([PaymentOrderByWithRelationInputObjectSchema, PaymentOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentWhereInputObjectSchema.optional(), cursor: PaymentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentScalarFieldEnumSchema, PaymentScalarFieldEnumSchema.array()]).optional() }).strict();