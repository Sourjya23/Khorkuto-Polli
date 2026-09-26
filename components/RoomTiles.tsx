import React from 'react';
import Link from 'next/link';
import { rooms } from '@/lib/data';

export default function RoomTiles() {
  return (
    <section className="py-20 bg-paper">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-4 block">Shop By Room</span>
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-6">Where Every Corner<br className="md:hidden"/> Tells a Story</h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            From your entryway console to your bedside table, find the perfect piece to elevate every space in your home. Visit our Mirpur studio to see them in person.
          </p>
        </div>

        {/* Horizontal scroll container (hide scrollbar) */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 gap-6 hide-scrollbar snap-x">
          {rooms.map((room) => (
            <Link 
              key={room.slug} 
              href={`/rooms/${room.slug}`}
              className="group relative w-[280px] md:w-[320px] lg:w-[400px] h-[400px] md:h-[500px] flex-shrink-0 rounded-2xl overflow-hidden snap-start"
            >
              {/* Image using standard img tag instead of background */}
              <img 
                src={room.image} 
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay bottom to top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="font-serif text-3xl mb-2 group-hover:text-terracotta transition-colors">{room.name}</h3>
                <p className="text-white/80 text-sm mb-4">{room.description}</p>
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore <span className="text-terracotta">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
