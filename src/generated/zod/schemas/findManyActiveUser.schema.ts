import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserOrderByWithRelationInputObjectSchema as ActiveUserOrderByWithRelationInputObjectSchema } from './objects/ActiveUserOrderByWithRelationInput.schema';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';
import { ActiveUserScalarFieldEnumSchema } from './enums/ActiveUserScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActiveUserFindManySelectSchema: z.ZodType<Prisma.ActiveUserSelect> = z.object({
    id: z.boolean().optional(),
    supabaseUserId: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ActiveUserSelect>;

export const ActiveUserFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    supabaseUserId: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ActiveUserFindManySchema: z.ZodType<Prisma.ActiveUserFindManyArgs> = z.object({ select: ActiveUserFindManySelectSchema.optional(),  orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActiveUserScalarFieldEnumSchema, ActiveUserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserFindManyArgs>;

export const ActiveUserFindManyZodSchema = z.object({ select: ActiveUserFindManySelectSchema.optional(),  orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActiveUserScalarFieldEnumSchema, ActiveUserScalarFieldEnumSchema.array()]).optional() }).strict();