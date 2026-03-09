import { Router } from 'express';
import { listCollections } from '../../../services/catalog';

const collectionsRouter: Router = Router();

collectionsRouter.get('/', async (_req, res) => {
  const result = await listCollections();
  return res.send_ok('Collections retrieved', result);
});

export default collectionsRouter;
