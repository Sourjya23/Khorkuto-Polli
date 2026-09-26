'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '@/lib/data';

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const heroBanners = banners.filter(b => b.type === 'hero' && b.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroBanners.length]);

  const nextBanner = () => {
    setCurrentIdx((prev) => (prev + 1) % heroBanners.length);
  };

  const prevBanner = () => {
    setCurrentIdx((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  };

  if (heroBanners.length === 0) return null;

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-ink">
      {/* Slides */}
      {heroBanners.map((banner, idx) => (
        <div 
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image */}
          <img 
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
            {banner.subtitle && (
              <p className="text-white text-sm md:text-base font-medium tracking-widest uppercase mb-4 animate-slide-up animation-delay-200">
                {banner.subtitle}
              </p>
            )}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-4xl leading-tight animate-slide-up animation-delay-400">
              {banner.title}
            </h2>
            <Link 
              href={banner.linkTarget}
              className="bg-white text-ink hover:bg-terracotta hover:text-white px-10 py-4 rounded-full font-semibold transition-colors duration-300 animate-slide-up animation-delay-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}

      {/* Controls */}
      {heroBanners.length > 1 && (
        <>
          <button 
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRight />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {heroBanners.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIdx ? 'w-10 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
