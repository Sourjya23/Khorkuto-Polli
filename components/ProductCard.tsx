'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Info } from 'lucide-react';
import { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageInterval, setImageInterval] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
      }, 1200); // cycle every 1.2s
      setImageInterval(interval);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (imageInterval) clearInterval(imageInterval);
    setCurrentImageIdx(0); // reset to front image
  };

  const currentPrice = product.variants.length > 0 && product.variants[0].priceOverride 
    ? product.variants[0].priceOverride 
    : product.price;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 h-full border border-ink-muted/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.isNewArrival && (
          <span className="bg-ink text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            New Arrival
          </span>
        )}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Save {product.discountPercent}%
          </span>
        )}
      </div>

      {/* Image Gallery Container */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-paper-dark overflow-hidden">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={`${product.title} - ${img.angleLabel}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${idx === currentImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-700`}
          />
        ))}
        {/* Hover size/dimension picker (Quick view) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
            {product.variants.map((v) => (
              <div key={v.sku} className="bg-white/20 backdrop-blur-md text-white border border-white/40 text-xs px-3 py-1.5 rounded-md cursor-pointer hover:bg-white hover:text-ink transition-colors whitespace-nowrap">
                {v.dimensions.h}×{v.dimensions.w}{v.dimensions.d ? `×${v.dimensions.d}` : ''} {v.dimensions.unit}
              </div>
            ))}
          </div>
          <button className="w-full bg-white text-ink hover:bg-terracotta hover:text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors text-sm">
            <ShoppingBag size={16} /> Quick Add
          </button>
        </div>
      </Link>

      {/* Info Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-gold fill-gold" />
          <span className="text-xs font-semibold text-ink-soft">{product.ratingAvg.toFixed(1)}</span>
          <span className="text-xs text-ink-muted">({product.ratingCount})</span>
        </div>
        
        {/* Title */}
        <Link href={`/product/${product.slug}`} className="font-serif text-lg text-ink hover:text-terracotta transition-colors line-clamp-2 leading-snug mb-2 flex-1">
          {product.title}
        </Link>
        
        {/* Price Section */}
        <div className="mt-auto pt-4 border-t border-ink-muted/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-lg text-ink">৳{currentPrice.toLocaleString('en-IN')}</span>
            {product.compareAtPrice && product.compareAtPrice > currentPrice && (
              <span className="text-sm text-ink-muted line-through">৳{product.compareAtPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="inline-block bg-warning/20 text-warning px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {product.stock > 0 ? (product.stock < 5 ? `Only ${product.stock} left` : 'In Stock') : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
