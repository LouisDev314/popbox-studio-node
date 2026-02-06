import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    supabaseUserId: z.string(),
    email: z.string(),
    name: z.string().optional().nullable(),
    role: UserRoleSchema,
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    deletedAt: z.date().optional().nullable(),
    wishlist: z.unknown().optional().nullable(),
    cart: z.unknown().optional().nullable(),
    orders: z.array(z.unknown()),
    orderStatusHistories: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
