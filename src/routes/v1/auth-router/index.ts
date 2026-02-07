import { Router } from 'express';
import rateLimiter from '../../../middleware/rate-limiter';
import validateBody from '../../../middleware/request-body-validation';
import { z } from 'zod';
import { UserInputSchema } from '../../../generated/zod/schemas';
import {
  deleteOwnAccount,
  loginWithEmailPassword,
  registerWithEmailPassword,
} from '../../../services/auth';
import { AuthedRequest, requireAuth } from '../../../middleware/token-auth';
import supabase from '../../../config/supabase';
import Exception from '../../../utils/Exception';
import { HttpStatusCode } from 'axios';

const authRouter: Router = Router();

const authLimiter = rateLimiter(15,
  20,
  'Too many authentication attempts. Please try again later.',
);

authRouter.post('/register',
  authLimiter,
  validateBody(
    UserInputSchema.pick({ email: true }).catchall(z.string()),
    'User register request body error',
  ),
  async (req, res) => {
    const { email, password, redirectUrl } = req.body;
    const result = await registerWithEmailPassword(
      email,
      password,
      redirectUrl,
    );
    return res.send_ok('Register successful', result);
});

authRouter.post('/login',
  authLimiter,
  validateBody(
    UserInputSchema.pick({ email: true }).catchall(z.string()),
    'User login request body error',
  ),
  async (req, res) => {
    const { email, password } = req.body;
    const session = await loginWithEmailPassword(email, password);
    return res.send_ok('Login successful', session);
});

authRouter.post('/logout',
  requireAuth,
  async (_req, res) => {
    await supabase.auth.signOut();
    return res.send_ok('Logged out');
});

authRouter.delete('/account',
  requireAuth,
  async (req: AuthedRequest, res) => {
    const result = await deleteOwnAccount(req.auth!.userId);
    return res.send_noContent('Successfully deleted user', result);
});

export default authRouter;
