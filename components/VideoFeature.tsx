'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export default function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const playlist = [
    '/videos/Khorkuto_VID1.mp4',
    '/videos/Khorkuto_VID2.mp4'
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  const handleVideoEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // When source changes, ensure it plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay might be blocked', e));
    }
  }, [currentIndex]);

  return (
    <section className="py-24 md:py-32 bg-paper text-ink overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:w-5/12 z-10 relative">
            <span className="text-terracotta text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-12 h-px bg-terracotta"></span> Our Physical Store
            </span>
            
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.1] text-ink relative inline-block">
              Experience the Magic
              <br/>in Mirpur
            </h2>
            
            <p className="text-ink-soft text-lg md:text-xl mb-12 leading-relaxed font-medium max-w-md">
              We are not just an online store. Step into our Rupnagar showroom to feel the textures, see the scale, and discover pieces that speak to you.
            </p>
            
            <div className="bg-white rounded-3xl p-8 max-w-md shadow-card border border-ink-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                  <MapPin size={20} />
                </div>
                <h3 className="font-serif text-2xl text-ink font-bold">Visit Us Today</h3>
              </div>
              <p className="text-base text-ink-soft mb-8 leading-relaxed font-medium pl-13">
                Chowdhury Complex, Shop A05<br/>
                Rupnagar Residential Area, Mirpur<br/>
                Dhaka-1216
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="w-full flex justify-center items-center gap-3 bg-ink text-white px-8 py-4 rounded-xl font-bold hover:bg-terracotta transition-colors shadow-md">
                Get Directions <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Clean Card Video Layout */}
          <div className="lg:w-7/12 w-full relative">
            {/* The wrapper changes classes depending on fullscreen state */}
            <div className={`
              transition-all duration-500 ease-in-out
              ${isFullscreen 
                ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4' 
                : 'relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-white'
              }
            `}>
              
              {/* Inner video container to constrain size in fullscreen */}
              <div className={`
                relative h-full w-full mx-auto
                ${isFullscreen ? 'max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl' : ''}
              `}>
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover bg-black"
                  autoPlay
                  muted
                  playsInline
                  src={playlist[currentIndex]}
                  onEnded={handleVideoEnded}
                  onClick={toggleFullscreen}
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Back Button (Only in Fullscreen) */}
                {isFullscreen && (
                  <button 
                    onClick={toggleFullscreen}
                    className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-ink font-bold text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2 pointer-events-auto z-50"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                )}
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-end pointer-events-none">
                  <button 
                    onClick={toggleFullscreen}
                    className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-full text-ink shadow-lg transition-transform hover:scale-105 flex items-center justify-center pointer-events-auto"
                  >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
