import z from 'zod';

export const legalDocumentTypeSchema = z.enum(['shipping_returns', 'terms', 'privacy']);
export const legalDocumentContentSchema = z.string().trim().min(1);
export const faqItemQuestionSchema = z.string().trim().min(1);
export const faqItemAnswerSchema = z.string().trim().min(1);
export const faqItemCategorySchema = z.string().trim().min(1).optional().nullable();

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

export const faqItemIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createFaqItemBodySchema = z
  .object({
    question: faqItemQuestionSchema,
    answer: faqItemAnswerSchema,
    category: faqItemCategorySchema,
    sortOrder: z.coerce.number().int().min(0).optional(),
    isPublished: z.boolean().optional(),
  })
  .strict();

export const updateFaqItemBodySchema = createFaqItemBodySchema.partial();
