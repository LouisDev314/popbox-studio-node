import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const ActiveUserResultSchema = z.object({
    id: z.string(),
    supabaseUserId: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    role: UserRoleSchema,
    createdAt: z.date(),
    updatedAt: z.date().nullable()
}).strict();

export type ActiveUserResultType = z.infer<typeof ActiveUserResultSchema>;
