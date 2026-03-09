import { Router } from 'express';
import paymentRouter from './payment-router';
import homeRouter from './home-router';

const v1Router: Router = Router();

v1Router.use('/payment', paymentRouter);
v1Router.use('/home', homeRouter);

export default v1Router;
