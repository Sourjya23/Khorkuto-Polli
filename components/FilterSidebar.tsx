'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { categories, rooms } from '@/lib/data';

export default function FilterSidebar({ isMobileOpen, setIsMobileOpen }: { isMobileOpen: boolean, setIsMobileOpen: (v: boolean) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filters from URL
  const currentCategory = searchParams?.get('category') || '';
  const currentRoom = searchParams?.get('room') || '';
  const inStockOnly = searchParams?.get('inStock') === 'true';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop-all?${params.toString()}`);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-8">
      {/* Categories Filter */}
      <div>
        <h3 className="font-bold text-ink uppercase tracking-wider text-sm mb-4">Category</h3>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => updateFilter('category', '')}
              className={`text-sm flex items-center gap-2 ${currentCategory === '' ? 'text-terracotta font-semibold' : 'text-ink-soft hover:text-ink'}`}
            >
              <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${currentCategory === '' ? 'border-terracotta bg-terracotta text-white' : 'border-ink-muted'}`}>
                {currentCategory === '' && <Check size={12} />}
              </div>
              All Categories
            </button>
          </li>
          {categories.map(c => (
            <li key={c.slug}>
              <button 
                onClick={() => updateFilter('category', c.slug)}
                className={`text-sm flex items-center gap-2 ${currentCategory === c.slug ? 'text-terracotta font-semibold' : 'text-ink-soft hover:text-ink'}`}
              >
                <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${currentCategory === c.slug ? 'border-terracotta bg-terracotta text-white' : 'border-ink-muted'}`}>
                  {currentCategory === c.slug && <Check size={12} />}
                </div>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rooms Filter */}
      <div className="border-t border-ink-muted/20 pt-6">
        <h3 className="font-bold text-ink uppercase tracking-wider text-sm mb-4">Space / Room</h3>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => updateFilter('room', '')}
              className={`text-sm flex items-center gap-2 ${currentRoom === '' ? 'text-terracotta font-semibold' : 'text-ink-soft hover:text-ink'}`}
            >
              <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${currentRoom === '' ? 'border-terracotta bg-terracotta text-white' : 'border-ink-muted'}`}>
                {currentRoom === '' && <Check size={12} />}
              </div>
              Any Room
            </button>
          </li>
          {rooms.map(r => (
            <li key={r.slug}>
              <button 
                onClick={() => updateFilter('room', r.slug)}
                className={`text-sm flex items-center gap-2 ${currentRoom === r.slug ? 'text-terracotta font-semibold' : 'text-ink-soft hover:text-ink'}`}
              >
                <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${currentRoom === r.slug ? 'border-terracotta bg-terracotta text-white' : 'border-ink-muted'}`}>
                  {currentRoom === r.slug && <Check size={12} />}
                </div>
                {r.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Availability Filter */}
      <div className="border-t border-ink-muted/20 pt-6">
        <h3 className="font-bold text-ink uppercase tracking-wider text-sm mb-4">Availability</h3>
        <button 
          onClick={() => updateFilter('inStock', inStockOnly ? '' : 'true')}
          className={`text-sm flex items-center gap-2 ${inStockOnly ? 'text-terracotta font-semibold' : 'text-ink-soft hover:text-ink'}`}
        >
          <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${inStockOnly ? 'border-terracotta bg-terracotta text-white' : 'border-ink-muted'}`}>
            {inStockOnly && <Check size={12} />}
          </div>
          In Stock Only
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 pt-2">
        <SidebarContent />
      </aside>

      {/* Mobile Bottom Sheet Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="bg-paper w-full h-[80vh] rounded-t-3xl shadow-modal relative z-10 flex flex-col animate-slide-up">
            <div className="flex justify-between items-center p-6 border-b border-ink-muted/10">
              <h2 className="font-serif text-2xl text-ink">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)} className="w-10 h-10 rounded-full bg-paper-dark flex items-center justify-center text-ink hover:text-terracotta transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 flex-1">
              <SidebarContent />
            </div>
            <div className="p-4 border-t border-ink-muted/10">
              <button onClick={() => setIsMobileOpen(false)} className="w-full bg-ink text-white py-4 rounded-xl font-bold">
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
