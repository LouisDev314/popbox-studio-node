import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import requireAdminAuth from '../../../middleware/admin-auth';
import validateBody from '../../../middleware/request-body-validation';
import validateParams from '../../../middleware/request-param-validation';
import validateQuery from '../../../middleware/request-query-validation';
import {
  createCollection,
  createKujiPrize,
  createProduct,
  createTag,
  deleteKujiPrize,
  deleteProductImage,
  listAdminCollections,
  listAdminProducts,
  listAdminTags,
  listKujiPrizes,
  reorderProductImages,
  updateCollection,
  updateKujiPrize,
  updateProduct,
  updateStandardInventory,
  updateTag,
  uploadProductImage,
} from '../../../services/admin/catalog';
import {
  getAdminOrder,
  listAdminOrders,
  listCustomers,
  refundOrder,
  updateAdminOrderStatus,
  updateShipment,
} from '../../../services/orders';

const adminRouter: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

const productListQuerySchema = paginationQuerySchema.extend({
  status: z.enum(['draft', 'active', 'archived']).optional(),
});

const productBodySchema = z.object({
  collectionId: z.string().uuid().optional().nullable(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  productType: z.enum(['standard', 'kuji']),
  status: z.enum(['draft', 'active', 'archived']),
  priceCents: z.coerce.number().int().min(0),
  currency: z.string().length(3).optional(),
  sku: z.string().optional().nullable(),
  tagIds: z.array(z.string().uuid()).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
  onHand: z.coerce.number().int().min(0).optional(),
});

const productPatchBodySchema = productBodySchema.partial();

const productIdParamsSchema = z.object({
  id: z.string().uuid(),
});

const productImageParamsSchema = z.object({
  id: z.string().uuid(),
  imageId: z.string().uuid(),
});

const collectionBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

const collectionPatchBodySchema = collectionBodySchema.partial();

const collectionParamsSchema = z.object({
  id: z.string().uuid(),
});

const tagBodySchema = z.object({
  name: z.string().min(1),
  tagType: z.string().min(1),
});

const tagPatchBodySchema = tagBodySchema.partial();

const inventoryBodySchema = z.object({
  onHand: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
});

const imageReorderBodySchema = z.object({
  imageIds: z.array(z.string().uuid()).min(1),
});

const kujiPrizeBodySchema = z.object({
  prizeCode: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  initialQuantity: z.coerce.number().int().min(0),
  remainingQuantity: z.coerce.number().int().min(0).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const kujiPrizePatchBodySchema = kujiPrizeBodySchema.partial();

const kujiPrizeParamsSchema = z.object({
  id: z.string().uuid(),
  prizeId: z.string().uuid(),
});

const adminOrderQuerySchema = paginationQuerySchema.extend({
  status: z.string().optional(),
});

const adminOrderParamsSchema = z.object({
  id: z.string().uuid(),
});

const orderStatusBodySchema = z.object({
  status: z.string().min(1),
});

const shipmentBodySchema = z.object({
  carrierName: z.string().optional().nullable(),
  trackingNumber: z.string().optional().nullable(),
  trackingUrl: z.string().url().optional().nullable(),
  shippedAt: z.string().optional().nullable(),
  deliveredAt: z.string().optional().nullable(),
});

const refundBodySchema = z.object({
  reason: z.string().optional().nullable(),
});

adminRouter.use(requireAdminAuth);

adminRouter.get('/products', validateQuery(productListQuerySchema, 'admin product filters'), async (req, res) => {
  const result = await listAdminProducts(req.query);
  return res.send_ok('Admin products retrieved', result);
});

adminRouter.post('/products', validateBody(productBodySchema, 'admin product creation'), async (req, res) => {
  const result = await createProduct(req.body);
  return res.send_created('Product created', result);
});

adminRouter.patch(
  '/products/:id',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(productPatchBodySchema, 'admin product update'),
  async (req, res) => {
    const result = await updateProduct(String(req.params.id), req.body);
    return res.send_ok('Product updated', result);
  },
);

adminRouter.post(
  '/products/:id/images',
  validateParams(productIdParamsSchema, 'product id'),
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.send_badRequest('Image file is required');
    }

    const result = await uploadProductImage(String(req.params.id), req.file, typeof req.body.altText === 'string' ? req.body.altText : null);
    return res.send_created('Product image uploaded', result);
  },
);

adminRouter.patch(
  '/products/:id/images/reorder',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(imageReorderBodySchema, 'image reorder'),
  async (req, res) => {
    const result = await reorderProductImages(String(req.params.id), req.body.imageIds);
    return res.send_ok('Product images reordered', result);
  },
);

adminRouter.delete('/products/:id/images/:imageId', validateParams(productImageParamsSchema, 'product image'), async (req, res) => {
  const result = await deleteProductImage(String(req.params.id), String(req.params.imageId));
  return res.send_ok('Product image deleted', result);
});

adminRouter.patch(
  '/products/:id/inventory',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(inventoryBodySchema, 'inventory update'),
  async (req, res) => {
    const result = await updateStandardInventory(String(req.params.id), req.body);
    return res.send_ok('Inventory updated', result);
  },
);

adminRouter.get('/products/:id/kuji-prizes', validateParams(productIdParamsSchema, 'product id'), async (req, res) => {
  const result = await listKujiPrizes(String(req.params.id));
  return res.send_ok('Kuji prizes retrieved', result);
});

adminRouter.post(
  '/products/:id/kuji-prizes',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(kujiPrizeBodySchema, 'kuji prize creation'),
  async (req, res) => {
    const result = await createKujiPrize(String(req.params.id), req.body);
    return res.send_created('Kuji prize created', result);
  },
);

adminRouter.patch(
  '/products/:id/kuji-prizes/:prizeId',
  validateParams(kujiPrizeParamsSchema, 'kuji prize'),
  validateBody(kujiPrizePatchBodySchema, 'kuji prize update'),
  async (req, res) => {
    const result = await updateKujiPrize(String(req.params.id), String(req.params.prizeId), req.body);
    return res.send_ok('Kuji prize updated', result);
  },
);

adminRouter.delete('/products/:id/kuji-prizes/:prizeId', validateParams(kujiPrizeParamsSchema, 'kuji prize'), async (req, res) => {
  const result = await deleteKujiPrize(String(req.params.id), String(req.params.prizeId));
  return res.send_ok('Kuji prize deleted', result);
});

adminRouter.get('/collections', async (_req, res) => {
  const result = await listAdminCollections();
  return res.send_ok('Collections retrieved', result);
});

adminRouter.post('/collections', validateBody(collectionBodySchema, 'collection creation'), async (req, res) => {
  const result = await createCollection(req.body);
  return res.send_created('Collection created', result);
});

adminRouter.patch(
  '/collections/:id',
  validateParams(collectionParamsSchema, 'collection id'),
  validateBody(collectionPatchBodySchema, 'collection update'),
  async (req, res) => {
    const result = await updateCollection(String(req.params.id), req.body);
    return res.send_ok('Collection updated', result);
  },
);

adminRouter.get('/tags', async (_req, res) => {
  const result = await listAdminTags();
  return res.send_ok('Tags retrieved', result);
});

adminRouter.post('/tags', validateBody(tagBodySchema, 'tag creation'), async (req, res) => {
  const result = await createTag(req.body);
  return res.send_created('Tag created', result);
});

adminRouter.patch('/tags/:id', validateParams(collectionParamsSchema, 'tag id'), validateBody(tagPatchBodySchema, 'tag update'), async (req, res) => {
  const result = await updateTag(String(req.params.id), req.body);
  return res.send_ok('Tag updated', result);
});

adminRouter.get('/orders', validateQuery(adminOrderQuerySchema, 'admin order filters'), async (req, res) => {
  const result = await listAdminOrders(req.query);
  return res.send_ok('Orders retrieved', result);
});

adminRouter.get('/orders/:id', validateParams(adminOrderParamsSchema, 'order id'), async (req, res) => {
  const result = await getAdminOrder(String(req.params.id));
  return res.send_ok('Order retrieved', result);
});

adminRouter.patch(
  '/orders/:id/status',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(orderStatusBodySchema, 'order status update'),
  async (req, res) => {
    const result = await updateAdminOrderStatus(String(req.params.id), req.body.status);
    return res.send_ok('Order status updated', result);
  },
);

adminRouter.patch(
  '/orders/:id/shipment',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(shipmentBodySchema, 'shipment update'),
  async (req, res) => {
    const result = await updateShipment(String(req.params.id), req.body);
    return res.send_ok('Shipment updated', result);
  },
);

adminRouter.post(
  '/orders/:id/refund',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(refundBodySchema, 'order refund'),
  async (req, res) => {
    const result = await refundOrder(String(req.params.id), req.body.reason);
    return res.send_ok('Order refunded', result);
  },
);

adminRouter.get('/customers', validateQuery(paginationQuerySchema, 'customer filters'), async (req, res) => {
  const result = await listCustomers(req.query);
  return res.send_ok('Customers retrieved', result);
});

export default adminRouter;
