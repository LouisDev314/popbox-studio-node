import { Router } from 'express';
import homeRouter from './home-router';
import collectionsRouter from './collections-router';
import tagsRouter from './tags-router';
import productsRouter from './products-router';
import searchRouter from './search-router';

const v1Router: Router = Router();

v1Router.use('/home', homeRouter);
v1Router.use('/collections', collectionsRouter);
v1Router.use('/tags', tagsRouter);
v1Router.use('/products', productsRouter);
v1Router.use('/search', searchRouter);

export default v1Router;
