import z from 'zod';

export const legalDocumentTypeSchema = z.enum(['faq', 'shipping_returns', 'terms', 'privacy']);
export const legalDocumentContentSchema = z.string().trim().min(1);

export const legalDocumentTypeParamsSchema = z.object({
  type: legalDocumentTypeSchema,
});

export const legalDocumentIdParamsSchema = z.object({
  id: z.uuid(),
});

export const adminLegalDocumentsQuerySchema = z
  .object({
    type: legalDocumentTypeSchema.optional(),
  })
  .strict();

export const createLegalDocumentBodySchema = z
  .object({
    type: legalDocumentTypeSchema,
    content: legalDocumentContentSchema,
  })
  .strict();

export const updateLegalDocumentBodySchema = z
  .object({
    content: legalDocumentContentSchema,
  })
  .strict();
