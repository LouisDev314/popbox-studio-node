import { Router } from 'express';
import paymentRouter from './payment-router';

const v1Router: Router = Router();

v1Router.use('/payment', paymentRouter);

export default v1Router;
