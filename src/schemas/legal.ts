import z from 'zod';

export const legalDocumentTypeSchema = z.enum(['faq', 'contact', 'shipping_returns', 'terms', 'privacy']);

export const legalDocumentContentSectionSchema = z
  .object({
    heading: z.string().trim().min(1),
    paragraphs: z.array(z.string().trim().min(1)).min(1),
  })
  .strict();

export const legalDocumentContentSchema = z.array(legalDocumentContentSectionSchema).min(1);

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
    title: z.string().trim().min(1),
    content: legalDocumentContentSchema,
  })
  .strict();

export const updateLegalDocumentBodySchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    content: legalDocumentContentSchema.optional(),
  })
  .strict()
  .refine((value) => value.title !== undefined || value.content !== undefined, {
    message: 'At least one field is required',
  });
