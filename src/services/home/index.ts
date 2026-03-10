import { and, desc, eq } from 'drizzle-orm';
import { db } from '../../db';
import { collections, products } from '../../db/schema';
import { HOMEPAGE_LIMIT } from '../../constants/pagination';
import { getProductCardsByIds } from '../product';

export const getHomepageData = async () => {
  const [featuredProducts, allProducts] = await Promise.all([
    db
      .select({ id: products.id })
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
      .select({ id: products.id })
      .from(products)
      .where(eq(products.status, 'active'))
      .orderBy(desc(products.createdAt), desc(products.id))
      .limit(HOMEPAGE_LIMIT * 2),
  ]);

  // TODO: later replace this with real trending algorithm output
  const trendingProducts = featuredProducts;

  const featuredIds = featuredProducts.map((row) => row.id);
  const trendingIds = trendingProducts.map((row) => row.id);
  const allProductIds = allProducts.map((row) => row.id);
  const uniqueIds = Array.from(new Set([...featuredIds, ...trendingIds, ...allProductIds]));
  const productCards = await getProductCardsByIds(uniqueIds);
  const cardMap = new Map(productCards.map((productCard) => [productCard.id, productCard]));

  return {
    featured: featuredIds.flatMap((productId) => {
      const productCard = cardMap.get(productId);
      return productCard ? [productCard] : [];
    }),
    trendingNow: trendingIds.flatMap((productId) => {
      const productCard = cardMap.get(productId);
      return productCard ? [productCard] : [];
    }),
    allProductsPreview: allProductIds.flatMap((productId) => {
      const productCard = cardMap.get(productId);
      return productCard ? [productCard] : [];
    }),
  };
};
