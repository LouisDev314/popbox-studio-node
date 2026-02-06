import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserOrderByWithRelationInputObjectSchema as ActiveUserOrderByWithRelationInputObjectSchema } from './objects/ActiveUserOrderByWithRelationInput.schema';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';
import { ActiveUserScalarFieldEnumSchema } from './enums/ActiveUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActiveUserFindFirstSelectSchema: z.ZodType<Prisma.ActiveUserSelect> = z.object({
    id: z.boolean().optional(),
    supabaseUserId: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ActiveUserSelect>;

export const ActiveUserFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    supabaseUserId: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ActiveUserFindFirstSchema: z.ZodType<Prisma.ActiveUserFindFirstArgs> = z.object({ select: ActiveUserFindFirstSelectSchema.optional(),  orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActiveUserScalarFieldEnumSchema, ActiveUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserFindFirstArgs>;

export const ActiveUserFindFirstZodSchema = z.object({ select: ActiveUserFindFirstSelectSchema.optional(),  orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActiveUserScalarFieldEnumSchema, ActiveUserScalarFieldEnumSchema.array()]).optional() }).strict();