import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const ActiveUserInputSchema = z.object({
    id: z.string(),
    supabaseUserId: z.string(),
    email: z.string(),
    name: z.string().optional().nullable(),
    role: UserRoleSchema,
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable()
}).strict();

export type ActiveUserInputType = z.infer<typeof ActiveUserInputSchema>;
