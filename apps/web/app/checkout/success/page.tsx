import CheckoutSuccessClient from '@/components/checkout-success-client';

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const params = await searchParams;

  if (!params.session_id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-10 shadow-card">
          <h1 className="font-heading text-4xl uppercase text-ink">Missing Stripe session</h1>
          <p className="mt-4 text-lg text-ink/70">Return to your cart and complete checkout again.</p>
        </div>
      </main>
    );
  }

  return <CheckoutSuccessClient sessionId={params.session_id} />;
}
