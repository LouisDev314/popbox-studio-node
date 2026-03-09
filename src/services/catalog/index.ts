import { db } from '../../db';
import { collections, tags } from '../../db/schema';
import { asc, eq } from 'drizzle-orm';

export const listCollections = async () => {
  const rows = await db
    .select()
    .from(collections)
    .where(eq(collections.isActive, true))
    .orderBy(asc(collections.sortOrder), asc(collections.id));
  return rows.map((collection) => ({
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    description: collection.description,
    sortOrder: collection.sortOrder,
    isActive: collection.isActive,
  }));
};

export const listTags = async () => {
  const rows = await db.select().from(tags).orderBy(asc(tags.tagType), asc(tags.name));
  return rows.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    tagType: tag.tagType,
  }));
};
