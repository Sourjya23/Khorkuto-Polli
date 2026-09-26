import { Metadata } from 'next';
import { products } from '@/lib/data';
import ShopAllClient from '@/components/ShopAllClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop All Showpieces | খড়কুটো পল্লী',
  description: 'Browse our complete collection of premium showpieces and home decor.',
};

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper flex items-center justify-center">Loading collection...</div>}>
      <ShopAllClient initialProducts={products.filter(p => p.isActive)} />
    </Suspense>
  );
}
