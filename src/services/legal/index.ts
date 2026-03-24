import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import { legalDocuments } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';

type LegalDocumentType = 'faq' | 'contact' | 'shipping_returns' | 'terms' | 'privacy';

type LegalDocumentContentSection = {
  heading: string;
  paragraphs: string[];
};

type CreateLegalDocumentInput = {
  type: LegalDocumentType;
  title: string;
  content: LegalDocumentContentSection[];
};

type UpdateLegalDocumentInput = Partial<Pick<CreateLegalDocumentInput, 'title' | 'content'>>;

const isUniqueConstraintViolation = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';

const throwConflictIfNeeded = (error: unknown): never => {
  if (isUniqueConstraintViolation(error)) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Legal document publish conflict. Retry shortly.');
  }

  throw error;
};

const getLegalDocumentByIdOrThrow = async (id: string) => {
  const [document] = await db.select().from(legalDocuments).where(eq(legalDocuments.id, id)).limit(1);

  if (!document) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Legal document not found');
  }

  return document;
};

export const listActiveLegalDocuments = async () => {
  const items = await db
    .select()
    .from(legalDocuments)
    .where(eq(legalDocuments.isActive, true))
    .orderBy(asc(legalDocuments.type));

  return { items };
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

  return document;
};

export const listAdminLegalDocuments = async (filters: { type?: LegalDocumentType }) => {
  const items = await db
    .select()
    .from(legalDocuments)
    .where(filters.type ? eq(legalDocuments.type, filters.type) : undefined)
    .orderBy(asc(legalDocuments.type), desc(legalDocuments.version), desc(legalDocuments.createdAt));

  return { items };
};

export const getAdminLegalDocumentById = async (id: string) => {
  return getLegalDocumentByIdOrThrow(id);
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
          title: payload.title,
          content: payload.content,
          version: nextVersionRow?.nextVersion ?? 1,
          isActive: true,
        })
        .returning();

      if (!document) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Legal document creation failed');
      }

      return document;
    });
  } catch (error) {
    throwConflictIfNeeded(error);
  }
};

export const publishLegalDocumentVersionFromExisting = async (id: string, payload: UpdateLegalDocumentInput) => {
  const source = await getLegalDocumentByIdOrThrow(id);

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
          title: payload.title ?? source.title,
          content: payload.content ?? source.content,
          version: nextVersionRow?.nextVersion ?? source.version + 1,
          isActive: true,
        })
        .returning();

      if (!document) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Legal document publish failed');
      }

      return document;
    });
  } catch (error) {
    throwConflictIfNeeded(error);
  }
};
