import { Router } from 'express';
import paymentRouter from './payment-router';
import homeRouter from './home-router';
import collectionsRouter from './collections-router';
import tagsRouter from './tags-router';
import productsRouter from './products-router';

const v1Router: Router = Router();

v1Router.use('/payment', paymentRouter);
v1Router.use('/home', homeRouter);
v1Router.use('/collections', collectionsRouter);
v1Router.use('/tags', tagsRouter);
v1Router.use('/products', productsRouter);

export default v1Router;
