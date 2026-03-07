import { Router } from 'express';
import { listTags } from '../../../services/catalog';

const tagsRouter: Router = Router();

tagsRouter.get('/', async (_req, res) => {
  const result = await listTags();
  return res.send_ok('Tags retrieved', result);
});

export default tagsRouter;
