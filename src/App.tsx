import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroReferenceFrame } from './components/HeroReferenceFrame';
import { WatchCategoryPage, MainCategory } from './components/WatchCategoryPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentView, setCurrentView] = useState<'showcase' | 'watches'>('showcase');
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('relogios');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent landing at old offsets
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize Lenis with optimized smooth, responsive scrolling locked to vertical orientation
    const lenis = new Lenis({
      duration: 1.35, // Smooth, luxurious scroll glide between 1.0 and 1.5
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical', // Strictly block lateral gestures from triggering scroll
      smoothWheel: true,
      wheelMultiplier: 1.12, // Responsive and effortless scroll glide
      touchMultiplier: 1.3,
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When view switches, immediately and deterministically reset scroll position to the top (0, 0)
  useEffect(() => {
    // 1. Immediate reset across all scroll engines
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Secondary confirmation after DOM layout settles
    const frameId = requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
      ScrollTrigger.refresh(true);
    });

    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
      ScrollTrigger.refresh(true);
    }, 60);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [currentView, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans-clean overflow-x-hidden">
      {/* Dynamic View Router */}
      {currentView === 'watches' ? (
        <WatchCategoryPage
          initialCategory={selectedCategory}
          onNavigateHome={() => setCurrentView('showcase')}
          onSelectCategory={(slug) => {
            if (slug === 'acessorios' || slug === 'perfumes' || slug === 'relogios') {
              setSelectedCategory(slug as MainCategory);
            } else {
              setCurrentView('showcase');
            }
          }}
        />
      ) : (
        <main className="flex-1 w-full flex flex-col items-center">
          <HeroReferenceFrame
            onNavigateCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentView('watches');
            }}
            onNavigateWatches={() => {
              setSelectedCategory('relogios');
              setCurrentView('watches');
            }}
          />
        </main>
      )}
    </div>
  );
}

