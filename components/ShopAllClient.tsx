'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Filter, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ShopAllClient({ initialProducts }: { initialProducts: Product[] }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentCategory = searchParams?.get('category');
  const currentRoom = searchParams?.get('room');
  const inStockOnly = searchParams?.get('inStock') === 'true';
  const sort = searchParams?.get('sort') || 'featured';

  // Apply filters on client-side (for demo purposes. Real app might do this on backend)
  let displayedProducts = [...initialProducts];
  
  if (currentCategory) {
    displayedProducts = displayedProducts.filter(p => p.categorySlug === currentCategory);
  }
  if (currentRoom) {
    displayedProducts = displayedProducts.filter(p => p.roomTags.includes(currentRoom));
  }
  if (inStockOnly) {
    displayedProducts = displayedProducts.filter(p => p.stock > 0);
  }

  // Apply sorting
  if (sort === 'price_asc') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    displayedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('sort', e.target.value);
    router.push(`/shop-all?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(`/shop-all`);
  };

  const activeFilterCount = (currentCategory ? 1 : 0) + (currentRoom ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className="bg-paper min-h-screen pt-10 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Shop All Showpieces
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl">
            Browse our complete collection of premium showpieces, thoughtfully curated for every corner of your home.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-ink-muted/10">
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-ink-muted/20 text-sm font-semibold"
          >
            <Filter size={16} /> Filters {activeFilterCount > 0 && <span className="bg-terracotta text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">{activeFilterCount}</span>}
          </button>

          {/* Active Filter Chips */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap flex-1">
            {activeFilterCount > 0 && (
              <span className="text-xs font-bold uppercase tracking-widest text-ink-muted mr-2">Active Filters:</span>
            )}
            {currentCategory && (
              <span className="bg-ink text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                {currentCategory} <X size={12} className="cursor-pointer" onClick={() => {
                  const p = new URLSearchParams(searchParams?.toString()); p.delete('category'); router.push(`/shop-all?${p.toString()}`);
                }}/>
              </span>
            )}
            {currentRoom && (
              <span className="bg-ink text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                Room: {currentRoom} <X size={12} className="cursor-pointer" onClick={() => {
                  const p = new URLSearchParams(searchParams?.toString()); p.delete('room'); router.push(`/shop-all?${p.toString()}`);
                }}/>
              </span>
            )}
            {inStockOnly && (
              <span className="bg-ink text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                In Stock <X size={12} className="cursor-pointer" onClick={() => {
                  const p = new URLSearchParams(searchParams?.toString()); p.delete('inStock'); router.push(`/shop-all?${p.toString()}`);
                }}/>
              </span>
            )}
            {activeFilterCount > 0 && (
              <button onClick={clearAllFilters} className="text-xs text-terracotta font-medium hover:underline ml-2">Clear All</button>
            )}
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-3 text-sm font-medium shrink-0">
            <span className="text-ink-soft hidden sm:inline">Sort by:</span>
            <select 
              value={sort}
              onChange={handleSortChange}
              className="bg-transparent border border-ink-muted/30 rounded-full px-4 py-2 text-ink outline-none focus:border-terracotta font-medium cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-12">
          <FilterSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
          
          <div className="flex-1">
            <div className="mb-6 text-sm text-ink-muted">Showing {displayedProducts.length} products</div>
            
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayedProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-ink-muted/10 shadow-sm">
                <h3 className="font-serif text-2xl text-ink mb-2">No pieces found</h3>
                <p className="text-ink-soft mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearAllFilters} className="bg-ink text-white px-6 py-3 rounded-full font-semibold hover:bg-terracotta transition-colors">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
