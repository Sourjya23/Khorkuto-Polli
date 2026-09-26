'use client';

import React from 'react';

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="bg-ink text-white overflow-hidden py-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider relative flex items-center group">
      <div className="marquee-track flex gap-8 px-4 animate-marquee group-hover:[animation-play-state:paused]">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            {text}
            <span className="opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
