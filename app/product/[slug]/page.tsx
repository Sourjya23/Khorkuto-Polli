import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.title} | খড়কুটো পল্লী`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
