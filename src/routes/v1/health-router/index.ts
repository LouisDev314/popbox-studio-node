import { Router } from 'express';
import { pg } from '../../../db';

const healthRouter: Router = Router();

healthRouter.get('/', async (_req, res) => {
  try {
    await pg`select 1`;
    return res.send_ok('Healthy', {
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  } catch {
    return false;
  }
});

export default healthRouter;
