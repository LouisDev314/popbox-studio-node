'use client';

import { useEffect, useState } from 'react';
import { authorizedApiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import { useAdminSession } from './use-admin-session';

type Product = {
  id: string;
  name: string;
  slug: string;
  productType: string;
  status: string;
  priceCents: number;
  currency: string;
};

const ProductsAdmin = () => {
  const { token, loading } = useAdminSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '',
    productType: 'standard',
    status: 'draft',
    priceCents: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const run = async () => {
      try {
        const payload = await authorizedApiFetch<{ items: Product[] }>('/v1/admin/products', token);
        setProducts(payload.items);
      } catch (productsError) {
        setError(productsError instanceof Error ? productsError.message : 'Unable to load products');
      }
    };

    void run();
  }, [token]);

  const createProduct = async () => {
    try {
      const product = await authorizedApiFetch<Product>('/v1/admin/products', token, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          productType: form.productType,
          status: form.status,
          priceCents: Number(form.priceCents),
          currency: 'CAD',
        }),
      });

      setProducts((current) => [product, ...current]);
      setForm({
        name: '',
        productType: 'standard',
        status: 'draft',
        priceCents: 0,
      });
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Unable to create product');
    }
  };

  if (loading) {
    return <AdminState title="Loading admin session" description="Checking Supabase auth state." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.25em] text-ember">Quick create</p>
          <h2 className="mt-2 font-heading text-3xl uppercase text-ink">New product</h2>
          <div className="mt-5 space-y-4">
            <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <Field
              label="Product type"
              as="select"
              value={form.productType}
              onChange={(value) => setForm((current) => ({ ...current, productType: value }))}
              options={[
                { label: 'Standard', value: 'standard' },
                { label: 'Kuji', value: 'kuji' },
              ]}
            />
            <Field
              label="Status"
              as="select"
              value={form.status}
              onChange={(value) => setForm((current) => ({ ...current, status: value }))}
              options={[
                { label: 'Draft', value: 'draft' },
                { label: 'Active', value: 'active' },
                { label: 'Archived', value: 'archived' },
              ]}
            />
            <Field
              label="Price (cents)"
              value={String(form.priceCents)}
              onChange={(value) => setForm((current) => ({ ...current, priceCents: Number(value) || 0 }))}
            />
            <button type="button" onClick={() => void createProduct()} className="w-full rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-paper">
              Create product
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ember">Inventory</p>
              <h2 className="mt-2 font-heading text-3xl uppercase text-ink">Products</h2>
            </div>
          </div>
          {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
          <div className="mt-5 space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-[1.5rem] bg-paper px-4 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ember">{product.productType}</p>
                  <p className="font-semibold text-ink">{product.name}</p>
                  <p className="text-sm text-ink/60">{product.status}</p>
                </div>
                <p className="text-sm font-semibold text-ink">{formatMoney(product.priceCents, product.currency)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  as = 'input',
  options = [],
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  as?: 'input' | 'select';
  options?: Array<{ label: string; value: string }>;
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
    {as === 'select' ? (
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none" />
    )}
  </label>
);

const AdminState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
    <h1 className="font-heading text-3xl uppercase text-ink">{title}</h1>
    <p className="mt-3 text-sm text-ink/60">{description}</p>
  </div>
);

export default ProductsAdmin;
