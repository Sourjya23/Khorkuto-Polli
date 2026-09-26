import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Sparkles, 
  Shapes, 
  Flower2, 
  Image as ImageIcon,
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Truck
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-paper text-ink overflow-hidden pt-24 pb-24">
      
      {/* 1. Main Content Layer (Solid Cream Background) */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 mb-8">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          
          {/* Brand & Slogan (Left) */}
          <div className="lg:w-1/4">
            <h2 className="font-serif text-4xl font-medium mb-6">খড়কুটো পল্লী<span className="text-terracotta">.</span></h2>
            <p className="text-ink-soft text-sm leading-relaxed font-medium">
              Curated Showpieces. Timeless Spaces.<br />
              আপনার রুচির প্রতিটি গল্প, একটি শোপিসে।
            </p>
          </div>

          {/* 3 Columns (Right) */}
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-10">
            
            {/* Column 1: Shop */}
            <div>
              <h3 className="text-lg font-bold text-ink mb-6 font-serif">আমাদের সম্পর্কে</h3>
              <ul className="space-y-4 text-sm font-medium text-ink-soft">
                <li>
                  <Link href="/shop-all" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Box size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    All Showpieces
                  </Link>
                </li>
                <li>
                  <Link href="/shop-all?filter=new-arrivals" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Sparkles size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/categories/figurines" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Shapes size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Figurines
                  </Link>
                </li>
                <li>
                  <Link href="/categories/vases-pots" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Flower2 size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Vases & Pots
                  </Link>
                </li>
                <li>
                  <Link href="/categories/wall-decor" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <ImageIcon size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Wall Decor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Connect */}
            <div>
              <h3 className="text-lg font-bold text-ink mb-6 font-serif">যোগাযোগ করুন</h3>
              <ul className="space-y-4 text-sm font-medium text-ink-soft">
                <li>
                  <a href="tel:+8801642366053" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Phone size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    +880 1642-366053
                  </a>
                </li>
                <li>
                  <a href="mailto:ssjewel99@gmail.com" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Mail size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    ssjewel99@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta/70 group-hover:text-terracotta transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta/70 group-hover:text-terracotta transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta/70 group-hover:text-terracotta transition-colors"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                    YouTube
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h3 className="text-lg font-bold text-ink mb-6 font-serif">সহায়তা</h3>
              <ul className="space-y-4 text-sm font-medium text-ink-soft">
                <li className="flex items-start gap-3 group">
                  <MapPin size={16} className="text-terracotta/70 mt-0.5 shrink-0" />
                  <span className="block leading-relaxed">Shop A05, Chowdhury Complex<br/>Rupnagar R/A, Mirpur, Dhaka</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Clock size={16} className="text-terracotta/70 shrink-0" />
                  <span>Timing: 11:00 AM - 9:00 PM</span>
                </li>
                <li>
                  <Link href="/privacy" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <ShieldCheck size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <FileText size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="flex items-center gap-3 hover:text-terracotta transition-colors group">
                    <Truck size={16} className="text-terracotta/70 group-hover:text-terracotta transition-colors" />
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Massive Footer Text with Orange Dot & Bottom Fade */}
      <div className="w-full flex justify-center pointer-events-none select-none overflow-visible mt-24">
        <h1 
          className="font-serif text-[18vw] leading-tight font-bold tracking-tighter whitespace-nowrap text-ink pb-8"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)'
          }}
        >
          খড়কুটো পল্লী<span className="text-terracotta">.</span>
        </h1>
      </div>

    </footer>
  );
}
