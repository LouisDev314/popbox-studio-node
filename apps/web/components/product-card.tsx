import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from '@/lib/currency';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    productType: string;
    priceCents: number;
    currency: string;
    images: Array<{
      id: string;
      url: string;
      altText?: string | null;
    }>;
    tags: Array<{
      id: string;
      name: string;
    }>;
    inventory?: {
      available: number;
    } | null;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-spruce/10">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.3em] text-ink/40">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ember">{product.productType}</p>
            <h3 className="font-heading text-xl text-ink">{product.name}</h3>
          </div>
          <p className="text-sm font-semibold text-ink">{formatMoney(product.priceCents, product.currency)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag.id} className="rounded-full bg-ink/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-ink/60">
              {tag.name}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink/50">
          <span>{product.inventory?.available ?? 0} available</span>
          <span>View product</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
