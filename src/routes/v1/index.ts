import { Router } from 'express';
import homeRouter from './home-router';
import collectionsRouter from './collections-router';
import tagsRouter from './tags-router';
import productsRouter from './products-router';
import searchRouter from './search-router';
import ordersRouter from './orders-router';
import adminRouter from './admin-router';
import checkoutRouter from './checkout-router';
import legalRouter from './legal-router';

const v1Router: Router = Router();

v1Router.use('/home', homeRouter);
v1Router.use('/collections', collectionsRouter);
v1Router.use('/tags', tagsRouter);
v1Router.use('/products', productsRouter);
v1Router.use('/search', searchRouter);
v1Router.use('/orders', ordersRouter);
v1Router.use('/legal', legalRouter);
v1Router.use('/admin', adminRouter);
v1Router.use('/checkout', checkoutRouter);

export default v1Router;
