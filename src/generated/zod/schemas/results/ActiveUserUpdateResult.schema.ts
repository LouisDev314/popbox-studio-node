import * as z from 'zod';
export const ActiveUserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().optional(),
  role: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date().optional()
}));