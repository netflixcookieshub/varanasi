import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-amber-950 via-black to-black"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #fbbf24 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-full px-6 py-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300 text-sm font-medium tracking-wider">ANIME CONCEPT</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-red-400 bg-clip-text text-transparent">
            RUDHRA
          </span>
        </h1>

        <p className="text-3xl md:text-4xl font-light mb-4 text-amber-100">
          ETERNAL GUARDIAN
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          A time traveler reincarnated across thousands of years, always carrying the same trident,
          always protecting Varanasi
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Connected to SS Rajamouli's "Varanasi" Universe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Time Travel + Hindu Mythology</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-amber-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
