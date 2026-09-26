import Hero from '@/components/Hero';
import RoomTiles from '@/components/RoomTiles';
import ProductCard from '@/components/ProductCard';
import VideoFeature from '@/components/VideoFeature';
import { getNewArrivals } from '@/lib/data';
import Link from 'next/link';
import { Mail, ArrowRight, Sprout, Home as HomeIcon, Tag, Leaf } from 'lucide-react';

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 md:py-32 bg-paper">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-terracotta font-semibold tracking-widest uppercase text-sm mb-4">Latest Additions</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-6">New Arrivals</h2>
            <div className="w-24 h-1 bg-ink/10 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop-all?filter=new-arrivals" className="inline-block bg-ink text-white px-10 py-4 rounded-full font-semibold hover:bg-terracotta transition-colors shadow-soft hover:shadow-card">
              View All Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* WTFlex-style Shop By Room Tiles */}
      <RoomTiles />

      <VideoFeature />

      {/* Newsletter Strip (Image 1 Background) */}
      <section className="relative w-full flex items-end justify-center bg-paper overflow-hidden">
        
        {/* Background Image (Defines Height) */}
        <img 
          src="/images/newsletter-banner.png" 
          alt="Newsletter Banner" 
          className="w-full h-auto object-cover z-0" 
        />
        
        {/* Overlay Form */}
        <div className="absolute bottom-[5%] md:bottom-[10%] lg:bottom-[15%] z-10 w-full max-w-xl mx-auto px-4">
          <form className="w-full flex items-center bg-paper rounded-full p-1.5 shadow-xl">
            <div className="pl-4 md:pl-5 text-ink-muted">
              <Mail size={20} strokeWidth={1.5} />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-3 md:px-4 py-3 text-ink focus:outline-none placeholder:text-ink-muted/60 text-sm md:text-base"
              required
            />
            <button type="submit" className="bg-[#2D4233] text-white px-6 md:px-8 py-3 rounded-full font-medium hover:bg-[#1f2e23] transition-colors flex items-center gap-2 text-sm md:text-base whitespace-nowrap shadow-md">
              Subscribe <ArrowRight size={18} />
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
