'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function fuzzyMatch(query: string, target: string) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  
  if (q.length > 3) {
    const distance = levenshteinDistance(q, t);
    const maxTypos = Math.max(1, Math.floor(q.length / 4));
    return distance <= maxTypos;
  }
  return false;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const qTokens = query.toLowerCase().split(' ').filter(Boolean);

  let matchedProducts: typeof products = [];
  if (query.trim()) {
    matchedProducts = products.filter(p => {
      const textBlock = `${p.title} ${p.description} ${p.category} ${p.categorySlug}`.toLowerCase();
      if (qTokens.every(token => textBlock.includes(token))) return true;

      const titleWords = p.title.toLowerCase().split(' ');
      return qTokens.every(token => 
        titleWords.some(word => fuzzyMatch(token, word)) || fuzzyMatch(token, p.category)
      );
    });
  }

  if (matchedProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        
        {/* Playful Doodles / Decor */}
        <div className="absolute top-1/4 left-1/4 text-ink-muted/20 transform -rotate-12 select-none pointer-events-none text-9xl">?</div>
        <div className="absolute bottom-1/4 right-1/4 text-ink-muted/20 transform rotate-12 select-none pointer-events-none text-8xl">👀</div>
        <div className="absolute top-1/3 right-1/3 text-terracotta/10 transform rotate-45 select-none pointer-events-none text-7xl">✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-terracotta/10 transform -rotate-45 select-none pointer-events-none text-8xl">🔍</div>

        <div className="relative z-10 max-w-md">
          {/* Custom SVG Doodle for "Lost/Empty" */}
          <div className="w-48 h-48 mx-auto mb-8 text-ink-muted flex items-center justify-center">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float">
              <path d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8"/>
              <path d="M70 85C70 85 75 75 85 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M130 85C130 85 125 75 115 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <circle cx="75" cy="95" r="5" fill="currentColor"/>
              <circle cx="125" cy="95" r="5" fill="currentColor"/>
              <path d="M80 130C80 130 90 120 100 120C110 120 120 130 120 130" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M100 120C100 120 90 145 100 150C110 155 120 150 120 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Magnifying glass doodle */}
              <path d="M150 150L175 175M175 175C170 180 160 170 160 170" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          
          <h1 className="font-serif text-4xl text-ink mb-4">Well, this is awkward.</h1>
          <p className="text-ink-soft text-lg mb-8 leading-relaxed">
            We searched high and low, but we couldn't find anything matching <strong className="text-ink decoration-wavy underline decoration-terracotta">"{query}"</strong>. 
            Did you mean to type something else?
          </p>
          
          <button 
            onClick={() => window.history.back()}
            className="bg-ink text-white px-8 py-4 rounded-xl font-bold hover:bg-terracotta transition-colors shadow-soft"
          >
            Go Back & Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-10 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Search Results
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl">
            Showing {matchedProducts.length} {matchedProducts.length === 1 ? 'result' : 'results'} for <strong className="text-ink">"{query}"</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {matchedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper flex items-center justify-center">Searching...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
