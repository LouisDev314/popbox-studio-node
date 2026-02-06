import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    supabaseUserId: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    role: UserRoleSchema,
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable(),
    wishlist: z.unknown().nullable(),
    cart: z.unknown().nullable(),
    orders: z.array(z.unknown()),
    orderStatusHistories: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
