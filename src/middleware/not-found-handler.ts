import type { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res) => {
  res.send_notFound('Route not found', { path: req.path });
};

export default notFoundHandler;
