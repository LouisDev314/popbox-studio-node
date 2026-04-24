import { Router } from 'express';
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
  getAdminProduct,
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
  uploadKujiPrizeImage,
  uploadProductImages,
} from '../../../services/admin';
import {
  getAdminOrder,
  listAdminOrders,
  listCustomers,
  resendAdminOrderConfirmation,
  reconcileOrderRefunds,
  refundOrder,
  updateAdminOrderStatus,
  updateShipment,
} from '../../../services/orders';
import {
  createFaqItem,
  createLegalDocument,
  deleteFaqItem,
  getAdminLegalDocumentById,
  listAdminFaqItems,
  listAdminLegalDocuments,
  publishLegalDocumentVersionFromExisting,
  updateFaqItem,
} from '../../../services/legal';
import { getShippingSettings, updateShippingSettings } from '../../../services/settings';
import { readValidatedBody, readValidatedParams, readValidatedQuery } from '../../../utils/validated-request';
import {
  adminOrderParamsSchema,
  adminOrderQuerySchema,
  adminOrderResendParamsSchema,
  collectionBodySchema,
  collectionParamsSchema,
  collectionPatchBodySchema,
  imageReorderBodySchema,
  inventoryBodySchema,
  kujiPrizeBodySchema,
  kujiPrizeParamsSchema,
  kujiPrizePatchBodySchema,
  orderStatusBodySchema,
  paginationQuerySchema,
  productBodySchema,
  productIdParamsSchema,
  productImageParamsSchema,
  productListQuerySchema,
  productPatchBodySchema,
  refundBodySchema,
  shipmentBodySchema,
  shippingSettingsBodySchema,
  tagBodySchema,
  tagPatchBodySchema,
} from '../../../schemas/admin';
import {
  adminLegalDocumentsQuerySchema,
  createFaqItemBodySchema,
  createLegalDocumentBodySchema,
  faqItemIdParamsSchema,
  legalDocumentIdParamsSchema,
  updateFaqItemBodySchema,
  updateLegalDocumentBodySchema,
} from '../../../schemas/legal';
import {
  parseProductImageUpload,
  readProductImageFiles,
  readProductImageUploadMetadata,
  readSingleProductImageFile,
} from '../../../services/admin/helpers';

const adminRouter: Router = Router();

adminRouter.use(requireAdminAuth);

adminRouter.get('/settings/shipping', async (_req, res) => {
  const result = await getShippingSettings();
  return res.send_ok('Shipping settings retrieved', result);
});

adminRouter.put('/settings/shipping', validateBody(shippingSettingsBodySchema, 'shipping settings update'), async (req, res) => {
  const body = readValidatedBody<z.infer<typeof shippingSettingsBodySchema>>(req);
  const result = await updateShippingSettings(body);
  return res.send_ok('Shipping settings updated', result);
});

adminRouter.get('/products', validateQuery(productListQuerySchema, 'admin product filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listAdminProducts>[0]>(req);
  const result = await listAdminProducts(query);
  return res.send_ok('Admin products retrieved', result);
});

adminRouter.get('/products/:id', validateParams(productIdParamsSchema, 'product id'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
  const result = await getAdminProduct(params.id);
  return res.send_ok('Admin product retrieved', result);
});

adminRouter.post('/products', validateBody(productBodySchema, 'admin product creation'), async (req, res) => {
  const body = readValidatedBody<Parameters<typeof createProduct>[0]>(req);
  const result = await createProduct(body);
  return res.send_created('Product created', result);
});

adminRouter.patch(
  '/products/:id',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(productPatchBodySchema, 'admin product update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateProduct>[1]>(req);
    const result = await updateProduct(params.id, body);
    return res.send_ok('Product updated', result);
  },
);

adminRouter.post(
  '/products/:id/images',
  validateParams(productIdParamsSchema, 'product id'),
  parseProductImageUpload,
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const files = readProductImageFiles(req);

    if (!files.length) {
      return res.send_badRequest('At least one image file is required');
    }

    const metadata = readProductImageUploadMetadata(req, files.length);
    const result = await uploadProductImages(params.id, files, metadata);
    return res.send_created('Product images uploaded', result);
  },
);

adminRouter.patch(
  '/products/:id/images/reorder',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(imageReorderBodySchema, 'image reorder'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const body = readValidatedBody<z.infer<typeof imageReorderBodySchema>>(req);
    const result = await reorderProductImages(params.id, body.imageIds);
    return res.send_ok('Product images reordered', result);
  },
);

adminRouter.delete(
  '/products/:id/images/:imageId',
  validateParams(productImageParamsSchema, 'product image'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productImageParamsSchema>>(req);
    const result = await deleteProductImage(params.id, params.imageId);
    return res.send_ok('Product image deleted', result);
  },
);

adminRouter.patch(
  '/products/:id/inventory',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(inventoryBodySchema, 'inventory update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateStandardInventory>[1]>(req);
    const result = await updateStandardInventory(params.id, body);
    return res.send_ok('Inventory updated', result);
  },
);

adminRouter.get('/products/:id/kuji-prizes', validateParams(productIdParamsSchema, 'product id'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
  const result = await listKujiPrizes(params.id);
  return res.send_ok('Kuji prizes retrieved', result);
});

adminRouter.post(
  '/products/:id/kuji-prizes',
  validateParams(productIdParamsSchema, 'product id'),
  validateBody(kujiPrizeBodySchema, 'kuji prize creation'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof createKujiPrize>[1]>(req);
    const result = await createKujiPrize(params.id, body);
    return res.send_created('Kuji prize created', result);
  },
);

adminRouter.post(
  '/products/:id/kuji-prizes/upload-image',
  validateParams(productIdParamsSchema, 'product id'),
  parseProductImageUpload,
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof productIdParamsSchema>>(req);
    const file = readSingleProductImageFile(req, {
      allowedFieldNames: new Set(['file']),
      expectedFieldName: 'file',
      usageLabel: 'kuji prize image uploads',
    });
    const result = await uploadKujiPrizeImage(params.id, file);
    return res.send_created('Kuji prize image uploaded', result);
  },
);

adminRouter.patch(
  '/products/:id/kuji-prizes/:prizeId',
  validateParams(kujiPrizeParamsSchema, 'kuji prize'),
  validateBody(kujiPrizePatchBodySchema, 'kuji prize update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof kujiPrizeParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateKujiPrize>[2]>(req);
    const result = await updateKujiPrize(params.id, params.prizeId, body);
    return res.send_ok('Kuji prize updated', result);
  },
);

adminRouter.delete(
  '/products/:id/kuji-prizes/:prizeId',
  validateParams(kujiPrizeParamsSchema, 'kuji prize'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof kujiPrizeParamsSchema>>(req);
    const result = await deleteKujiPrize(params.id, params.prizeId);
    return res.send_ok('Kuji prize deleted', result);
  },
);

adminRouter.get('/collections', async (_req, res) => {
  const result = await listAdminCollections();
  return res.send_ok('Collections retrieved', result);
});

adminRouter.post('/collections', validateBody(collectionBodySchema, 'collection creation'), async (req, res) => {
  const body = readValidatedBody<Parameters<typeof createCollection>[0]>(req);
  const result = await createCollection(body);
  return res.send_created('Collection created', result);
});

adminRouter.patch(
  '/collections/:id',
  validateParams(collectionParamsSchema, 'collection id'),
  validateBody(collectionPatchBodySchema, 'collection update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof collectionParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateCollection>[1]>(req);
    const result = await updateCollection(params.id, body);
    return res.send_ok('Collection updated', result);
  },
);

adminRouter.get('/tags', async (_req, res) => {
  const result = await listAdminTags();
  return res.send_ok('Tags retrieved', result);
});

adminRouter.post('/tags', validateBody(tagBodySchema, 'tag creation'), async (req, res) => {
  const body = readValidatedBody<Parameters<typeof createTag>[0]>(req);
  const result = await createTag(body);
  return res.send_created('Tag created', result);
});

adminRouter.patch(
  '/tags/:id',
  validateParams(collectionParamsSchema, 'tag id'),
  validateBody(tagPatchBodySchema, 'tag update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof collectionParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateTag>[1]>(req);
    const result = await updateTag(params.id, body);
    return res.send_ok('Tag updated', result);
  },
);

adminRouter.get('/legal', validateQuery(adminLegalDocumentsQuerySchema, 'admin legal filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listAdminLegalDocuments>[0]>(req);
  const result = await listAdminLegalDocuments(query);
  return res.send_ok('Legal documents retrieved', result);
});

adminRouter.get('/legal/faq', async (_req, res) => {
  const result = await listAdminFaqItems();
  return res.send_ok('FAQ items retrieved', result);
});

adminRouter.post('/legal/faq', validateBody(createFaqItemBodySchema, 'faq item creation'), async (req, res) => {
  const body = readValidatedBody<Parameters<typeof createFaqItem>[0]>(req);
  const result = await createFaqItem(body);
  return res.send_created('FAQ item created', result);
});

adminRouter.patch(
  '/legal/faq/:id',
  validateParams(faqItemIdParamsSchema, 'faq item id'),
  validateBody(updateFaqItemBodySchema, 'faq item update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof faqItemIdParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateFaqItem>[1]>(req);
    const result = await updateFaqItem(params.id, body);
    return res.send_ok('FAQ item updated', result);
  },
);

adminRouter.delete('/legal/faq/:id', validateParams(faqItemIdParamsSchema, 'faq item id'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof faqItemIdParamsSchema>>(req);
  const result = await deleteFaqItem(params.id);
  return res.send_ok('FAQ item deleted', result);
});

adminRouter.get('/legal/:id', validateParams(legalDocumentIdParamsSchema, 'legal document id'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof legalDocumentIdParamsSchema>>(req);
  const result = await getAdminLegalDocumentById(params.id);
  return res.send_ok('Legal document retrieved', result);
});

adminRouter.post('/legal', validateBody(createLegalDocumentBodySchema, 'legal document creation'), async (req, res) => {
  const body = readValidatedBody<Parameters<typeof createLegalDocument>[0]>(req);
  const result = await createLegalDocument(body);
  return res.send_created('Legal document created', result);
});

adminRouter.patch(
  '/legal/:id',
  validateParams(legalDocumentIdParamsSchema, 'legal document id'),
  validateBody(updateLegalDocumentBodySchema, 'legal document update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof legalDocumentIdParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof publishLegalDocumentVersionFromExisting>[1]>(req);
    const result = await publishLegalDocumentVersionFromExisting(params.id, body);
    return res.send_ok('Legal document published', result);
  },
);

adminRouter.get('/orders', validateQuery(adminOrderQuerySchema, 'admin order filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listAdminOrders>[0]>(req);
  const result = await listAdminOrders(query);
  return res.send_ok('Orders retrieved', result);
});

adminRouter.get('/orders/:id', validateParams(adminOrderParamsSchema, 'order id'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof adminOrderParamsSchema>>(req);
  const result = await getAdminOrder(params.id);
  return res.send_ok('Order retrieved', result);
});

adminRouter.post(
  '/orders/:orderId/resend-confirmation',
  validateParams(adminOrderResendParamsSchema, 'order id'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof adminOrderResendParamsSchema>>(req);
    const result = await resendAdminOrderConfirmation(params.orderId, req.authUser?.id);
    return res.send_ok('Order confirmation email resent', result);
  },
);

adminRouter.patch(
  '/orders/:id/status',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(orderStatusBodySchema, 'order status update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof adminOrderParamsSchema>>(req);
    const body = readValidatedBody<z.infer<typeof orderStatusBodySchema>>(req);
    const result = await updateAdminOrderStatus(params.id, body.status);
    return res.send_ok('Order status updated', result);
  },
);

adminRouter.patch(
  '/orders/:id/shipment',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(shipmentBodySchema, 'shipment update'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof adminOrderParamsSchema>>(req);
    const body = readValidatedBody<Parameters<typeof updateShipment>[1]>(req);
    const result = await updateShipment(params.id, body);
    return res.send_ok('Shipment updated', result);
  },
);

adminRouter.post(
  '/orders/:id/refund',
  validateParams(adminOrderParamsSchema, 'order id'),
  validateBody(refundBodySchema, 'order refund'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof adminOrderParamsSchema>>(req);
    const body = readValidatedBody<z.infer<typeof refundBodySchema>>(req);
    const result = await refundOrder(params.id, body.amountCents, body.reason);
    return res.send_ok('Order refunded', result);
  },
);

adminRouter.post(
  '/orders/:id/refund/reconcile',
  validateParams(adminOrderParamsSchema, 'order id'),
  async (req, res) => {
    const params = readValidatedParams<z.infer<typeof adminOrderParamsSchema>>(req);
    const result = await reconcileOrderRefunds(params.id);
    return res.send_ok('Order refunds reconciled', result);
  },
);

adminRouter.get('/customers', validateQuery(paginationQuerySchema, 'customer filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listCustomers>[0]>(req);
  const result = await listCustomers(query);
  return res.send_ok('Customers retrieved', result);
});

export default adminRouter;
