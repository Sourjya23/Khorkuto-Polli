'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { Star, Truck, Shield, Ruler, UserCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  
  const addItem = useCartStore((state) => state.addItem);
  
  const currentVariant = product.variants.length > 0 ? product.variants[selectedVariantIdx] : undefined;
  const currentPrice = currentVariant?.priceOverride || product.price;

  // Similar products logic (same category, excluding current)
  const similarProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, currentVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to API. For now, alert.
    alert(`Review submitted! Rating: ${ratingInput}, Comment: ${commentInput}`);
    setCommentInput('');
  };

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-medium text-ink-soft mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-ink transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-ink line-clamp-1">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Images Section */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-[450px] md:h-[600px] lg:h-[700px] lg:sticky lg:top-28 lg:self-start">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto hide-scrollbar flex-shrink-0 py-1">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${selectedImage === idx ? 'ring-2 ring-terracotta opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img.url} alt={`${product.title} angle ${idx}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-0 right-0 text-[8px] uppercase tracking-wider text-white text-center font-bold bg-black/40">
                    {img.angleLabel}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 bg-paper-dark rounded-2xl overflow-hidden shadow-card">
              <img 
                src={product.images[selectedImage].url} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <span className="bg-ink text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-sm">
                    New Arrival
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-ink-muted/20 shadow-sm">
                <span className="text-sm font-bold text-ink">{product.ratingAvg.toFixed(1)}</span>
                <Star size={14} className="text-gold fill-gold" />
                <div className="w-px h-3 bg-ink-muted/30 mx-1"></div>
                <span className="text-xs font-medium text-ink-soft">{product.ratingCount} Reviews</span>
              </div>
              <span className="text-sm text-terracotta font-medium tracking-wide">
                {product.stock > 0 ? (product.stock < 5 ? `Hurry, only ${product.stock} left!` : 'In Stock') : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-semibold text-ink">৳{currentPrice.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && product.compareAtPrice > currentPrice && (
                <>
                  <span className="text-lg text-ink-muted line-through">৳{product.compareAtPrice.toLocaleString('en-IN')}</span>
                  <span className="bg-warning/20 text-warning text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
                    Save {Math.round((1 - currentPrice / product.compareAtPrice) * 100)}%
                  </span>
                </>
              )}
              <span className="text-xs text-ink-muted ml-2">(Tax included)</span>
            </div>

            {/* Dimension Picker */}
            {product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-semibold text-ink uppercase tracking-wider">Select Size / Dimension</span>
                  <button className="text-xs text-ink-soft underline hover:text-terracotta flex items-center gap-1">
                    <Ruler size={12} /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-5 py-3 rounded-lg text-sm font-medium border-2 transition-all ${selectedVariantIdx === idx ? 'border-ink bg-ink text-white shadow-soft' : 'border-ink-muted/20 bg-white text-ink hover:border-ink/50'}`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex flex-col gap-3 mb-10">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-card ${isAdded ? 'bg-success text-white hover:bg-success' : 'bg-terracotta text-white hover:bg-terracotta-dark hover:shadow-modal'} disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : isAdded ? 'Added to Cart ✓' : 'Add to Cart 🛍️'}
              </button>
              
              <div className="bg-white border border-ink-muted/10 rounded-xl p-4 mt-2 flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-3 text-ink-soft">
                  <Truck size={18} className="text-terracotta shrink-0" />
                  <span><strong>Fast Delivery:</strong> Inside Mirpur (Same day), Rest of Dhaka (1-2 days).</span>
                </div>
                <div className="flex items-center gap-3 text-ink-soft">
                  <Shield size={18} className="text-terracotta shrink-0" />
                  <span><strong>Safe Arrival Guarantee:</strong> Replaced immediately if damaged in transit.</span>
                </div>
              </div>
            </div>

            {/* Details Table & Accordions */}
            <div className="border-t border-ink-muted/20 pt-8 space-y-6">
              
              {/* Dimensions Table */}
              {currentVariant && (
                <div>
                  <h3 className="font-serif text-xl text-ink mb-3">Specifications</h3>
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-ink-muted/10">
                        <th className="py-2 text-ink-soft font-medium w-1/3">Height</th>
                        <td className="py-2 text-ink">{currentVariant.dimensions.h} {currentVariant.dimensions.unit}</td>
                      </tr>
                      <tr className="border-b border-ink-muted/10">
                        <th className="py-2 text-ink-soft font-medium w-1/3">Width</th>
                        <td className="py-2 text-ink">{currentVariant.dimensions.w} {currentVariant.dimensions.unit}</td>
                      </tr>
                      {currentVariant.dimensions.d && (
                        <tr className="border-b border-ink-muted/10">
                          <th className="py-2 text-ink-soft font-medium w-1/3">Depth</th>
                          <td className="py-2 text-ink">{currentVariant.dimensions.d} {currentVariant.dimensions.unit}</td>
                        </tr>
                      )}
                      <tr className="border-b border-ink-muted/10">
                        <th className="py-2 text-ink-soft font-medium w-1/3">Material</th>
                        <td className="py-2 text-ink">{product.materialNotes || 'Premium Material'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div>
                <h3 className="font-serif text-xl text-ink mb-3">The Story</h3>
                <p className="text-ink-soft text-sm leading-relaxed whitespace-pre-wrap">{product.description}</p>
                {product.story && (
                  <p className="text-ink-soft text-sm leading-relaxed mt-4 italic border-l-2 border-terracotta/30 pl-3">"{product.story}"</p>
                )}
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Reviews Section (Powerlook Style Histogram) */}
        <div className="mt-24 pt-16 border-t border-ink-muted/20 max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-ink mb-10 text-center">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Histogram & Summary */}
            <div className="col-span-1 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl font-serif text-ink">{product.ratingAvg.toFixed(1)}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex text-gold">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} size={20} className={star <= Math.round(product.ratingAvg) ? 'fill-gold' : 'fill-paper-dark text-paper-dark'} />
                    ))}
                  </div>
                  <span className="text-sm text-ink-muted font-medium">Based on {product.ratingCount} reviews</span>
                </div>
              </div>
              
              <div className="w-full space-y-2 mt-4">
                {[5,4,3,2,1].map((star) => {
                  // Fake distribution based on average
                  let percent = 0;
                  if (star === 5) percent = 70;
                  if (star === 4) percent = 20;
                  if (star === 3) percent = 5;
                  if (star === 2) percent = 3;
                  if (star === 1) percent = 2;
                  
                  return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                      <span className="w-3">{star}</span>
                      <Star size={12} className="text-ink-muted fill-ink-muted" />
                      <div className="flex-1 h-2 bg-ink/10 rounded-full overflow-hidden">
                        <div className="h-full bg-ink rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="w-8 text-right text-ink-muted text-xs">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a review form */}
            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-ink-muted/10">
              <h3 className="font-semibold text-ink mb-4">Write a Review</h3>
              {/* Simulated Logged In State */}
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-soft mb-2">Your Rating <span className="text-error">*</span></label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRatingInput(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star size={24} className={star <= ratingInput ? 'text-gold fill-gold' : 'text-ink-muted/30'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-ink-soft mb-2">Comment (Optional)</label>
                  <textarea 
                    rows={3} 
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="What did you like about this piece?"
                    className="w-full bg-paper-dark border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-terracotta outline-none resize-none text-sm"
                  ></textarea>
                </div>
                <button type="submit" className="bg-ink text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-terracotta transition-colors shadow-soft">
                  Submit Review
                </button>
              </form>
            </div>
            
          </div>
          
          {/* Mock Comments List */}
          <div className="mt-12 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-ink-muted/10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-paper-dark flex items-center justify-center text-ink-soft">
                    <UserCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-ink text-sm">Ayesha R.</h4>
                    <div className="flex text-gold mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-gold" />)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-ink-muted">2 days ago</span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">Absolutely stunning! It looks exactly like the pictures, maybe even better in person. Packaging was very secure.</p>
              
              {/* Admin Reply */}
              <div className="mt-4 bg-paper-dark/50 p-4 rounded-lg flex gap-3 border-l-2 border-terracotta">
                <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0">
                  <MessageCircle size={12} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-terracotta mb-1">খড়কুটো পল্লী (Admin)</h5>
                  <p className="text-xs text-ink-soft leading-relaxed">Thank you Ayesha! We are so glad you loved it. Enjoy your beautiful space!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-ink-muted/20">
            <h2 className="font-serif text-3xl text-ink mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {similarProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
