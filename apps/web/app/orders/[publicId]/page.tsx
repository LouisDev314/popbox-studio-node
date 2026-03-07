import GuestOrderClient from '@/components/guest-order-client';

type GuestOrderPageProps = {
  params: Promise<{
    publicId: string;
  }>;
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function GuestOrderPage({ params, searchParams }: GuestOrderPageProps) {
  const { publicId } = await params;
  const query = await searchParams;

  return <GuestOrderClient publicId={publicId} tokenFromQuery={query.token} />;
}
