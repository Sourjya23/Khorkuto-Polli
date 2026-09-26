'use client';
import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [stage, setStage] = useState(0); 
  // 0: static, 1: text fading out, 2: curtains opening, 3: removed from DOM

  useEffect(() => {
    // Total duration around 2s
    const t1 = setTimeout(() => setStage(1), 1200); // fade text out
    const t2 = setTimeout(() => setStage(2), 1500); // open curtains
    const t3 = setTimeout(() => setStage(3), 2200); // remove from DOM completely
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (stage === 3) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Left Curtain */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-1/2 bg-paper transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage >= 2 ? '-translate-x-full' : 'translate-x-0'
        }`} 
      />
      
      {/* Right Curtain */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-1/2 bg-paper transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage >= 2 ? 'translate-x-full' : 'translate-x-0'
        }`} 
      />
      
      {/* Title that flies to the top-left */}
      <div 
        className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage >= 2 
            ? 'top-[2.5rem] left-[1rem] md:left-[2rem] lg:left-[3rem] xl:left-[4rem] -translate-y-1/2 translate-x-0' 
            : 'top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}
      >
        <h1 className={`font-serif text-ink tracking-tight font-medium transition-all duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          stage >= 2 
            ? 'text-3xl md:text-4xl' 
            : 'text-5xl md:text-7xl lg:text-8xl animate-pulseSoft'
        }`}>
          খড়কুটো পল্লী<span className="text-terracotta">.</span>
        </h1>
      </div>

      {/* Slogans that fade out */}
      <div 
        className={`absolute top-[55%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center text-center px-4 w-full transition-opacity duration-300 ${
          stage >= 1 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-ink-soft text-xs md:text-sm tracking-[0.2em] uppercase mb-3">
          Curated Showpieces. Timeless Spaces.
        </p>
        <p className="text-ink text-sm md:text-lg font-serif italic max-w-md mx-auto">
          আপনার রুচির প্রতিটি গল্প, একটি শোপিসে।
        </p>
      </div>

    </div>
  );
}
