import { Router } from 'express';
import { z } from 'zod';
import requireGuestOrderAccess from '../../../middleware/guest-order-access';
import validateParams from '../../../middleware/request-param-validation';
import { getGuestOrder, getGuestTickets, revealAllTickets, revealTicket } from '../../../services/orders';

const ordersRouter: Router = Router();

const publicOrderParamsSchema = z.object({
  publicId: z.string().min(1),
});

const revealTicketParamsSchema = z.object({
  publicId: z.string().min(1),
  ticketId: z.string().uuid(),
});

ordersRouter.get('/:publicId', validateParams(publicOrderParamsSchema, 'order public id'), requireGuestOrderAccess, async (req, res) => {
  const result = await getGuestOrder(String(req.params.publicId));
  return res.send_ok('Order retrieved', result);
});

ordersRouter.get(
  '/:publicId/tickets',
  validateParams(publicOrderParamsSchema, 'order public id'),
  requireGuestOrderAccess,
  async (req, res) => {
    const result = await getGuestTickets(String(req.params.publicId));
    return res.send_ok('Order tickets retrieved', result);
  },
);

ordersRouter.post(
  '/:publicId/tickets/:ticketId/reveal',
  validateParams(revealTicketParamsSchema, 'ticket reveal params'),
  requireGuestOrderAccess,
  async (req, res) => {
    if (!req.orderAccess) {
      return res.send_unauthorized('Order access is required');
    }

    const result = await revealTicket(req.orderAccess.orderId, String(req.params.ticketId));
    return res.send_ok('Ticket revealed', result);
  },
);

ordersRouter.post(
  '/:publicId/tickets/reveal-all',
  validateParams(publicOrderParamsSchema, 'order public id'),
  requireGuestOrderAccess,
  async (req, res) => {
    if (!req.orderAccess) {
      return res.send_unauthorized('Order access is required');
    }

    const result = await revealAllTickets(req.orderAccess.orderId);
    return res.send_ok('All tickets revealed', result);
  },
);

export default ordersRouter;
