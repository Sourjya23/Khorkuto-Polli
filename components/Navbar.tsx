'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, MapPin, Truck, X, Trash2, Plus, Minus } from 'lucide-react';
import Marquee from './Marquee';
import SearchBar from './SearchBar';
import { useCartStore } from '@/lib/store';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/types';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { items, getCartCount, getCartTotal, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = isMounted ? getCartCount() : 0;
  const cartTotal = isMounted ? getCartTotal() : 0;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - cartTotal;

  return (
    <>
      <Marquee text="10% OFF ON FIRST ORDER 📦🔥 • FAST DELIVERY ACROSS DHAKA • CURATED SHOWPIECES FOR TIMELESS SPACES" />
      
      {/* Utility Bar */}
      <div className="hidden md:flex justify-end items-center bg-paper-dark px-6 py-2 text-xs font-medium text-ink-soft gap-4">
        <Link href="/track-order" className="hover:text-ink flex items-center gap-1 transition-colors">
          <Truck size={14} /> Track Order
        </Link>
        <div className="w-px h-3 bg-ink-muted/30"></div>
        <Link href="/store-location" className="hover:text-ink flex items-center gap-1 transition-colors">
          <MapPin size={14} /> Store Locator
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-md border-b border-ink-muted/10 transition-all">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              className="lg:hidden p-2 -ml-2 text-ink hover:text-terracotta transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight font-medium animate-hide-during-preload">খড়কুটো পল্লী<span className="text-terracotta">.</span></h1>
            </Link>
          </div>

          {/* Center 1: Search Bar */}
          <div className="hidden lg:flex flex-1 justify-center max-w-2xl px-4">
            <SearchBar />
          </div>

          {/* Center 2: Desktop Nav */}
          <nav className="hidden lg:flex flex-shrink-0 items-center gap-6 xl:gap-8 font-medium text-sm">
            <Link href="/shop-all" className="text-ink hover:text-terracotta transition-colors">Shop All</Link>
            <div className="group relative">
               <button className="text-ink hover:text-terracotta transition-colors flex items-center gap-1">
                 Categories <span className="text-[10px]">▼</span>
               </button>
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white shadow-modal rounded-xl border border-ink-muted/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all mega-menu-enter">
                 <Link href="/categories/figurines" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Figurines</Link>
                 <Link href="/categories/vases-pots" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Vases & Pots</Link>
                 <Link href="/categories/wall-decor" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Wall Decor</Link>
                 <Link href="/categories/tabletop-sets" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Tabletop Sets</Link>
                 <Link href="/categories/gift-showpieces" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Gift Showpieces</Link>
               </div>
            </div>
            <div className="group relative">
               <button className="text-ink hover:text-terracotta transition-colors flex items-center gap-1">
                 Shop by Room <span className="text-[10px]">▼</span>
               </button>
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 bg-white shadow-modal rounded-xl border border-ink-muted/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all mega-menu-enter">
                 <Link href="/rooms/living-room" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Living Room</Link>
                 <Link href="/rooms/bedroom" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Bedroom</Link>
                 <Link href="/rooms/office-desk" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Office Desk</Link>
                 <Link href="/rooms/entryway" className="block px-4 py-2 hover:bg-paper rounded-md text-ink-soft hover:text-ink">Entryway</Link>
               </div>
            </div>
            <Link href="/shop-all?filter=new-arrivals" className="text-ink hover:text-terracotta transition-colors">New Arrivals</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 md:gap-4 flex-shrink-0">
            <Link href="/login" className="p-2 text-ink hover:text-terracotta transition-colors">
              <User size={22} />
            </Link>
            <button 
              className="p-2 -mr-2 text-ink hover:text-terracotta transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-paper">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-paper shadow-modal flex flex-col mobile-menu-panel">
            <div className="p-6 border-b border-ink-muted/10 flex justify-between items-center">
              <h1 className="font-serif text-2xl text-ink font-medium">খড়কুটো পল্লী<span className="text-terracotta">.</span></h1>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={20}/></button>
            </div>
            <div className="p-4 border-b border-ink-muted/10">
              <SearchBar />
            </div>
            <div className="p-6 flex flex-col gap-6 text-lg">
              <Link href="/shop-all" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
              <Link href="/categories/figurines" onClick={() => setIsMenuOpen(false)}>Figurines</Link>
              <Link href="/categories/vases-pots" onClick={() => setIsMenuOpen(false)}>Vases & Pots</Link>
              <Link href="/categories/wall-decor" onClick={() => setIsMenuOpen(false)}>Wall Decor</Link>
              <Link href="/rooms/living-room" onClick={() => setIsMenuOpen(false)}>Shop Living Room</Link>
              <Link href="/shop-all?filter=new-arrivals" onClick={() => setIsMenuOpen(false)} className="text-terracotta font-medium">New Arrivals</Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 transition-opacity cart-drawer-overlay" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-paper h-full shadow-modal flex flex-col cart-drawer-panel border-l border-ink-muted/10">
            
            <div className="flex items-center justify-between p-6 border-b border-ink-muted/10">
              <h2 className="font-serif text-2xl">Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-paper-dark rounded-full transition-colors text-ink-soft hover:text-ink">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-ink-muted">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-ink">Your cart is empty</p>
                <p className="text-sm mt-2 mb-6">Looks like you haven't added any showpieces yet.</p>
                <button onClick={() => setIsCartOpen(false)} className="bg-terracotta text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-terracotta-dark transition-colors shadow-soft">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping nudge */}
                <div className="bg-paper-dark px-6 py-3 text-center text-sm">
                  {amountToFreeDelivery > 0 ? (
                    <p>You're <span className="font-bold text-terracotta">৳{amountToFreeDelivery.toLocaleString('en-IN')}</span> away from free delivery!</p>
                  ) : (
                    <p className="font-bold text-success">You've unlocked free delivery!</p>
                  )}
                  <div className="w-full bg-ink/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-terracotta h-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                  {items.map((item) => {
                    const id = item.variant ? item.variant.sku : item.product._id;
                    const price = item.variant?.priceOverride || item.product.price;
                    
                    return (
                      <div key={id} className="flex gap-4">
                        <div className="w-20 h-24 bg-white rounded-md overflow-hidden shrink-0 shadow-sm border border-ink-muted/10">
                          <img src={item.product.images[0].url} alt={item.product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <Link href={`/product/${item.product.slug}`} onClick={() => setIsCartOpen(false)} className="font-serif text-lg leading-tight hover:text-terracotta transition-colors line-clamp-2">
                                {item.product.title}
                              </Link>
                              <button onClick={() => removeItem(id)} className="text-ink-muted hover:text-error transition-colors p-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            {item.variant && (
                              <p className="text-xs text-ink-soft mt-1">{item.variant.label}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-white border border-ink-muted/20 rounded-full overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(id, item.quantity - 1)}
                                className="px-2.5 py-1 text-ink-soft hover:text-ink hover:bg-paper-dark transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(id, item.quantity + 1)}
                                className="px-2.5 py-1 text-ink-soft hover:text-ink hover:bg-paper-dark transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-semibold">৳{(price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-6 bg-white border-t border-ink-muted/10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-ink-soft font-medium">Subtotal</span>
                    <span className="font-bold text-xl">৳{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-ink-muted mb-6 text-center">Shipping & taxes calculated at checkout</p>
                  
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-terracotta text-white py-4 rounded-xl font-bold text-lg hover:bg-terracotta-dark transition-all shadow-card hover:shadow-modal flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
