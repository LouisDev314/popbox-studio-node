import { Router } from 'express';
import homeRouter from './home-router';
import collectionsRouter from './collections-router';
import tagsRouter from './tags-router';
import productsRouter from './products-router';
import searchRouter from './search-router';
import checkoutRouter from './checkout-router';
import ordersRouter from './orders-router';
import webhooksRouter from './webhooks-router';
import adminRouter from './admin-router';

const v1Router: Router = Router();

v1Router.use('/home', homeRouter);
v1Router.use('/collections', collectionsRouter);
v1Router.use('/tags', tagsRouter);
v1Router.use('/products', productsRouter);
v1Router.use('/search', searchRouter);
v1Router.use('/checkout', checkoutRouter);
v1Router.use('/orders', ordersRouter);
v1Router.use('/admin', adminRouter);
v1Router.use('/webhooks', webhooksRouter);

export default v1Router;
