import { Router } from 'express';
// import { checkoutLimiter } from '../../../middleware/rate-limit';
// import validateBody from '../../../middleware/request-body-validation';

const paymentRouter: Router = Router();

// paymentRouter.post(
//   '/',
//   checkoutLimiter,
//   validateBody(TestSchema.pick({ email: true }).catchall(z.string()), 'User payment request error'),
//   async (req, res) => {
//     const { email, password, redirectUrl } = req.body;
//     const result = await makePayment(email, password, redirectUrl);
//     return res.send_ok('Register successful', result);
//   },
// );

export default paymentRouter;
