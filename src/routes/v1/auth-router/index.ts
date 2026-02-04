import { Router } from 'express';
import rateLimiter from '../../../middleware/rate-limiter';

const authRouter: Router = Router();

const authLimiter = rateLimiter(15,
  20,
  'Too many authentication attempts. Please try again later.',
);

// authRouter.post('/verify-email', emailBodyValidation, async (req, res) => {
//   const { email, isResetPassword } = req.body as Pick<IUser, 'email'> & { isResetPassword: boolean };
//   await verifyEmail(email, isResetPassword);
//   return res.send_ok('Email verified');
// });

export default authRouter;
