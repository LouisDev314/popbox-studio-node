import { Router } from 'express';
import { z } from 'zod';
import validateParams from '../../../middleware/request-param-validation';
import validateQuery from '../../../middleware/request-query-validation';
import { readValidatedParams, readValidatedQuery } from '../../../utils/validated-request';
import { getProductBySlug, getProductRecommendationsBySlug, listProducts } from '../../../services/product';
import {
  listProductsQuerySchema,
  productRecommendationsQuerySchema,
  productSlugParamsSchema,
} from '../../../schemas/product';

const productsRouter: Router = Router();

productsRouter.get('/', validateQuery(listProductsQuerySchema, 'product listing filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listProducts>[0]>(req);
  const result = await listProducts(query);
  return res.send_ok('Products retrieved', result);
});

productsRouter.get(
  '/:slug/recommendations',
  validateParams(productSlugParamsSchema, 'product slug'),
  validateQuery(productRecommendationsQuerySchema, 'product recommendation query'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productSlugParamsSchema>>(req);
    const query = readValidatedQuery<z.infer<typeof productRecommendationsQuerySchema>>(req);
    const result = await getProductRecommendationsBySlug(params.slug, query.limit);
    return res.send_ok('Product recommendations retrieved', result);
  },
);

productsRouter.get('/:slug', validateParams(productSlugParamsSchema, 'product slug'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof productSlugParamsSchema>>(req);
  const result = await getProductBySlug(params.slug);
  return res.send_ok('Product retrieved', result);
});

export default productsRouter;
