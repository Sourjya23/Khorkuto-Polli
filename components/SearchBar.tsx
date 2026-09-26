'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { products, categories } from '@/lib/data';
import { Product } from '@/lib/types';
import Link from 'next/link';

// Simple Levenshtein distance for fuzzy matching
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
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
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
  
  // Only apply fuzzy if query is at least 4 chars long
  if (q.length > 3) {
    const distance = levenshteinDistance(q, t);
    // Allow 1 typo per 4 characters roughly
    const maxTypos = Math.max(1, Math.floor(q.length / 4));
    return distance <= maxTypos;
  }
  return false;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<{ products: Product[], categories: any[] }>({ products: [], categories: [] });
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [] });
      return;
    }

    const qTokens = query.toLowerCase().split(' ').filter(Boolean);

    // Filter categories
    const matchedCategories = categories.filter(c => 
      qTokens.some(token => fuzzyMatch(token, c.name))
    ).slice(0, 2);

    // Filter products
    const matchedProducts = products.filter(p => {
      // Direct substring match on title, description, or category
      const textBlock = `${p.title} ${p.description} ${p.category} ${p.categorySlug}`.toLowerCase();
      if (qTokens.every(token => textBlock.includes(token))) return true;

      // Fuzzy match on title words
      const titleWords = p.title.toLowerCase().split(' ');
      return qTokens.every(token => 
        titleWords.some(word => fuzzyMatch(token, word)) || fuzzyMatch(token, p.category)
      );
    }).slice(0, 5);

    setResults({ products: matchedProducts, categories: matchedCategories });
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg z-50">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for showpieces, vases, wall art..."
          className="w-full bg-paper-dark border border-ink-muted/20 rounded-full py-2.5 pl-12 pr-10 text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
        />
        <Search size={18} className="absolute left-4 text-ink-muted" />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="absolute right-4 text-ink-muted hover:text-ink">
            <X size={16} />
          </button>
        )}
      </form>

      {/* Auto-suggest Dropdown */}
      {isFocused && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-modal border border-ink-muted/10 overflow-hidden animate-slide-up origin-top">
          
          <div className="max-h-[70vh] overflow-y-auto hide-scrollbar">
            {/* Categories */}
            {results.categories.length > 0 && (
              <div className="p-4 border-b border-ink-muted/10">
                <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3">Categories</h4>
                <div className="flex gap-2 flex-wrap">
                  {results.categories.map(c => (
                    <Link key={c.slug} href={`/categories/${c.slug}`} onClick={() => setIsFocused(false)} className="bg-paper-dark text-ink px-3 py-1.5 rounded-lg text-sm hover:bg-terracotta hover:text-white transition-colors">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {results.products.length > 0 ? (
              <div className="p-2">
                <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 px-3 pt-2">Products</h4>
                {results.products.map(p => (
                  <Link 
                    key={p._id} 
                    href={`/product/${p.slug}`} 
                    onClick={() => setIsFocused(false)}
                    className="flex items-center gap-4 p-3 hover:bg-paper-dark rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-paper-dark overflow-hidden shrink-0">
                      <img src={p.images[0]?.url} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="text-sm font-medium text-ink truncate group-hover:text-terracotta transition-colors">{p.title}</h5>
                      <p className="text-xs text-ink-muted truncate">{p.category}</p>
                    </div>
                    <div className="font-semibold text-sm text-ink shrink-0">
                      ৳{(p.variants[0]?.priceOverride || p.price).toLocaleString('en-IN')}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-ink-soft mb-2">No results found for "{query}"</p>
                <p className="text-xs text-ink-muted">Try checking for typos or using more generic terms like "Vase".</p>
              </div>
            )}
          </div>

          {/* Footer view all */}
          {results.products.length > 0 && (
            <Link 
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => setIsFocused(false)}
              className="block w-full text-center bg-paper py-3 text-sm font-semibold text-ink hover:text-terracotta transition-colors border-t border-ink-muted/10"
            >
              View all results for "{query}"
            </Link>
          )}

        </div>
      )}
    </div>
  );
}
