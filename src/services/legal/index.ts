import { and, asc, desc, eq, ne, sql } from 'drizzle-orm';
import { db } from '../../db';
import { faqItems, legalDocuments } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';

type LegalDocumentType = 'shipping_returns' | 'terms' | 'privacy';
type ManagedLegalDocument = Omit<typeof legalDocuments.$inferSelect, 'type'> & { type: LegalDocumentType };

const LEGAL_DOCUMENT_TITLES: Record<LegalDocumentType, string> = {
  shipping_returns: 'Shipping & Returns',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
};

type CreateLegalDocumentInput = {
  type: LegalDocumentType;
  content: string;
};

type UpdateLegalDocumentInput = {
  content: string;
};

type CreateFaqItemInput = {
  question: string;
  answer: string;
  category?: string | null;
  sortOrder?: number;
  isPublished?: boolean;
};

type UpdateFaqItemInput = Partial<CreateFaqItemInput>;

const isUniqueConstraintViolation = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';

const throwConflictIfNeeded = (error: unknown): never => {
  if (isUniqueConstraintViolation(error)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Legal document publish conflict. Retry shortly.');
  }

  throw error;
};

const assertManagedLegalDocument = (document: typeof legalDocuments.$inferSelect): ManagedLegalDocument => {
  if (document.type === 'faq') {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Legal document not found');
  }

  return document as ManagedLegalDocument;
};

const mapLegalDocument = (document: typeof legalDocuments.$inferSelect) => {
  const managedDocument = assertManagedLegalDocument(document);

  return {
    ...managedDocument,
    title: LEGAL_DOCUMENT_TITLES[managedDocument.type],
  };
};

const getLegalDocumentByIdOrThrow = async (id: string) => {
  const [document] = await db.select().from(legalDocuments).where(eq(legalDocuments.id, id)).limit(1);

  if (!document) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Legal document not found');
  }

  return document;
};

const getFaqItemByIdOrThrow = async (id: string) => {
  const [item] = await db.select().from(faqItems).where(eq(faqItems.id, id)).limit(1);

  if (!item) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'FAQ item not found');
  }

  return item;
};

export const listActiveLegalDocuments = async () => {
  const items = await db
    .select()
    .from(legalDocuments)
    .where(and(eq(legalDocuments.isActive, true), ne(legalDocuments.type, 'faq')))
    .orderBy(asc(legalDocuments.type));

  return { items: items.map(mapLegalDocument) };
};

export const getActiveLegalDocumentByType = async (type: LegalDocumentType) => {
  const [document] = await db
    .select()
    .from(legalDocuments)
    .where(and(eq(legalDocuments.type, type), eq(legalDocuments.isActive, true)))
    .limit(1);

  if (!document) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Legal document not found');
  }

  return mapLegalDocument(document);
};

export const listAdminLegalDocuments = async (filters: { type?: LegalDocumentType }) => {
  const items = await db
    .select()
    .from(legalDocuments)
    .where(and(ne(legalDocuments.type, 'faq'), filters.type ? eq(legalDocuments.type, filters.type) : undefined))
    .orderBy(asc(legalDocuments.type), desc(legalDocuments.version), desc(legalDocuments.createdAt));

  return { items: items.map(mapLegalDocument) };
};

export const getAdminLegalDocumentById = async (id: string) => {
  return mapLegalDocument(await getLegalDocumentByIdOrThrow(id));
};

export const createLegalDocument = async (payload: CreateLegalDocumentInput) => {
  try {
    return await db.transaction(async (tx) => {
      const [nextVersionRow] = await tx
        .select({
          nextVersion: sql<number>`COALESCE(MAX(${legalDocuments.version}), 0)::int + 1`,
        })
        .from(legalDocuments)
        .where(eq(legalDocuments.type, payload.type));

      await tx
        .update(legalDocuments)
        .set({
          isActive: false,
        })
        .where(and(eq(legalDocuments.type, payload.type), eq(legalDocuments.isActive, true)));

      const [document] = await tx
        .insert(legalDocuments)
        .values({
          type: payload.type,
          content: payload.content,
          version: nextVersionRow?.nextVersion ?? 1,
          isActive: true,
        })
        .returning();

      if (!document) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Legal document creation failed');
      }

      return mapLegalDocument(document);
    });
  } catch (error) {
    throwConflictIfNeeded(error);
  }
};

export const publishLegalDocumentVersionFromExisting = async (id: string, payload: UpdateLegalDocumentInput) => {
  const source = assertManagedLegalDocument(await getLegalDocumentByIdOrThrow(id));

  try {
    return await db.transaction(async (tx) => {
      const [nextVersionRow] = await tx
        .select({
          nextVersion: sql<number>`COALESCE(MAX(${legalDocuments.version}), 0)::int + 1`,
        })
        .from(legalDocuments)
        .where(eq(legalDocuments.type, source.type));

      await tx
        .update(legalDocuments)
        .set({
          isActive: false,
        })
        .where(and(eq(legalDocuments.type, source.type), eq(legalDocuments.isActive, true)));

      const [document] = await tx
        .insert(legalDocuments)
        .values({
          type: source.type,
          content: payload.content,
          version: nextVersionRow?.nextVersion ?? source.version + 1,
          isActive: true,
        })
        .returning();

      if (!document) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Legal document publish failed');
      }

      return mapLegalDocument(document);
    });
  } catch (error) {
    throwConflictIfNeeded(error);
  }
};

export const listPublishedFaqItems = async () => {
  const items = await db
    .select()
    .from(faqItems)
    .where(eq(faqItems.isPublished, true))
    .orderBy(asc(faqItems.sortOrder), asc(faqItems.createdAt), asc(faqItems.id));

  return { items };
};

export const listAdminFaqItems = async () => {
  const items = await db.select().from(faqItems).orderBy(asc(faqItems.sortOrder), asc(faqItems.createdAt), asc(faqItems.id));
  return { items };
};

export const createFaqItem = async (payload: CreateFaqItemInput) => {
  const [item] = await db
    .insert(faqItems)
    .values({
      question: payload.question,
      answer: payload.answer,
      category: payload.category ?? null,
      sortOrder: payload.sortOrder ?? 0,
      isPublished: payload.isPublished ?? false,
    })
    .returning();

  if (!item) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'FAQ item creation failed');
  }

  return item;
};

export const updateFaqItem = async (id: string, payload: UpdateFaqItemInput) => {
  const existing = await getFaqItemByIdOrThrow(id);

  const [item] = await db
    .update(faqItems)
    .set({
      question: payload.question ?? existing.question,
      answer: payload.answer ?? existing.answer,
      category: payload.category === undefined ? existing.category : payload.category,
      sortOrder: payload.sortOrder ?? existing.sortOrder,
      isPublished: payload.isPublished ?? existing.isPublished,
    })
    .where(eq(faqItems.id, id))
    .returning();

  if (!item) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'FAQ item update failed');
  }

  return item;
};

export const deleteFaqItem = async (id: string) => {
  await getFaqItemByIdOrThrow(id);
  await db.delete(faqItems).where(eq(faqItems.id, id));

  return {
    id,
    deleted: true,
  };
};
