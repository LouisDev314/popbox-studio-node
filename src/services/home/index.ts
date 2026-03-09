import { and, desc, eq } from 'drizzle-orm';
import { db } from '../../db';
import { collections, products } from '../../db/schema';
import { HOMEPAGE_LIMIT } from '../../constants/pagination';
import { loadProductRelations, mapProduct } from '../product';

export const getHomepageData = async () => {
  const [featuredProducts, allProducts] = await Promise.all([
    db
      .select()
      .from(products)
      .where(
        and(
          eq(products.status, 'active'),
          eq(
            products.collectionId,
            db.select({ id: collections.id }).from(collections).where(eq(collections.slug, 'featured')).limit(1),
          ),
        ),
      )
      .orderBy(desc(products.createdAt), desc(products.id))
      .limit(HOMEPAGE_LIMIT),
    db
      .select()
      .from(products)
      .where(eq(products.status, 'active'))
      .orderBy(desc(products.createdAt), desc(products.id))
      .limit(HOMEPAGE_LIMIT * 2),
  ]);

  // TODO: later replace this with real trending algorithm output
  const trendingProducts = featuredProducts;

  const allIds = Array.from(new Set([...featuredProducts, ...trendingProducts, ...allProducts].map((row) => row.id)));
  const relations = await loadProductRelations(allIds);

  return {
    featured: featuredProducts.map((row) => mapProduct(row, relations)),
    trendingNow: trendingProducts.map((row) => mapProduct(row, relations)),
    allProductsPreview: allProducts.map((row) => mapProduct(row, relations)),
  };
};
