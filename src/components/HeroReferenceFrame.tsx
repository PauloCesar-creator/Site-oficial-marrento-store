import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImg from '../assets/images/logo_marrento.png';
import { SplitText } from './SplitText';
import { MarrentoShowcaseSection } from './MarrentoShowcaseSection';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;

// Eager glob import of all 200 frames from assets/frames
const frameModules = import.meta.glob<string>('/assets/frames/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
});

interface HeroReferenceFrameProps {
  onNavigateCategory?: (categorySlug: 'relogios' | 'acessorios' | 'perfumes') => void;
  onNavigateWatches?: () => void;
}

export const HeroReferenceFrame: React.FC<HeroReferenceFrameProps> = ({
  onNavigateCategory,
  onNavigateWatches,
}) => {
  const [isSecondActive, setIsSecondActive] = React.useState(false);
  const [sectionWidthPercent, setSectionWidthPercent] = React.useState(0);
  const [currentFrameNum, setCurrentFrameNum] = React.useState(1);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = React.useState(false);
  const [loadedFramesCount, setLoadedFramesCount] = React.useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement>(null);
  const footerTextWrapperRef = useRef<HTMLParagraphElement>(null);
  const mouseIndicatorRef = useRef<HTMLDivElement>(null);
  const secondSectionLayerRef = useRef<HTMLDivElement>(null);

  const targetFrameRef = useRef(1);
  const lastRenderedIndexRef = useRef(-1);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // High resolution canvas setup
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      lastRenderedIndexRef.current = -1;
      renderFrame(targetFrameRef.current);
    };

    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const padZero = (num: number) => String(num).padStart(3, '0');

    let loadedCount = 0;

    // Preload all 200 frame images from assets/frames/ with asynchronous GPU decoding
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameKey = `/assets/frames/ezgif-frame-${padZero(i)}.jpg`;
      const frameSrc = frameModules[frameKey] || frameKey;
      img.src = frameSrc;
      img.onload = () => {
        loadedCount++;
        setLoadedFramesCount(loadedCount);
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
        if (i === 1 && !isFirstFrameLoaded) {
          setIsFirstFrameLoaded(true);
          renderFrame(1);
        }
      };
      img.onerror = () => {
        if (img.src !== frameKey) {
          img.src = frameKey;
        }
      };
      images.push(img);
    }

    function renderFrame(index: number) {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const ctx = currentCanvas.getContext('2d');
      if (!ctx) return;

      const targetIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index))) - 1;
      if (lastRenderedIndexRef.current === targetIdx) return; // Skip duplicate frame painting
      
      // Find exact or nearest loaded frame for zero flash
      let img = imagesRef.current[targetIdx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = imagesRef.current[targetIdx - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = imagesRef.current[targetIdx + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        lastRenderedIndexRef.current = targetIdx;
        ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

        // Aspect ratio handling: preserve proportion with optical prominence and perfect mobile framing
        const isMobile = window.innerWidth < 768;
        const hRatio = currentCanvas.width / img.naturalWidth;
        const vRatio = currentCanvas.height / img.naturalHeight;
        const baseScale = Math.max(hRatio, vRatio);
        const ratio = baseScale * (isMobile ? 1.20 : 1.14);
        const centerShiftX = (currentCanvas.width - img.naturalWidth * ratio) / 2;
        const centerShiftY = (currentCanvas.height - img.naturalHeight * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShiftX,
          centerShiftY,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      }
    }

    updateCanvasSize();

    // 1. Initial Page Load Entrance Animation (Letter by letter + smooth logo + mouse)
    const headingChars = headingWrapperRef.current?.querySelectorAll('.split-char');
    const footerChars = footerTextWrapperRef.current?.querySelectorAll('.split-char');

    const entranceTl = gsap.timeline({ delay: 0.2 });

    // Logo entrance
    if (logoWrapperRef.current) {
      entranceTl.fromTo(
        logoWrapperRef.current,
        { opacity: 0, y: -25, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
        0
      );
    }

    // Heading letters entrance
    if (headingChars && headingChars.length > 0) {
      entranceTl.fromTo(
        headingChars,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
        },
        0.3
      );
    }

    // Footer text letters entrance
    if (footerChars && footerChars.length > 0) {
      entranceTl.fromTo(
        footerChars,
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.015,
          ease: 'power3.out',
        },
        0.7
      );
    }

    // Mouse indicator entrance
    if (mouseIndicatorRef.current) {
      entranceTl.fromTo(
        mouseIndicatorRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.9
      );
    }

    // 2. ScrollTrigger Pinning & Sequence: Scrubbing frames -> Exit Texts -> Expand Section 2 from center
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? '+=1500' : '+=2200';

    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: scrollDistance,
      pin: pinTargetRef.current,
      pinSpacing: true,
      scrub: 0.05, // Instant 1:1 hardware responsive scrubbing with zero delay
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Frames 1 to 200 scrubbed during 0.00 -> 0.60 progress with immediate synchronous rendering
        const frameProgress = Math.min(1, progress / 0.60);
        const targetFrame = Math.max(
          1,
          Math.min(TOTAL_FRAMES, Math.round(frameProgress * (TOTAL_FRAMES - 1)) + 1)
        );
        targetFrameRef.current = targetFrame;
        renderFrame(targetFrame);
        setCurrentFrameNum(targetFrame);

        // Section 1 Exit Animations (progress 0.55 -> 0.80)
        if (progress > 0.55) {
          const exitProg = Math.min(1, (progress - 0.55) / 0.25);

          // Animate heading letters exit
          if (headingChars && headingChars.length > 0) {
            headingChars.forEach((char, index) => {
              const charDelay = index / headingChars.length;
              const charProg = Math.max(0, Math.min(1, (exitProg - charDelay * 0.3) / 0.7));
              gsap.set(char, {
                opacity: 1 - charProg,
                y: -25 * charProg,
                filter: `blur(${charProg * 6}px)`,
              });
            });
          }

          // Animate footer text letters exit
          if (footerChars && footerChars.length > 0) {
            footerChars.forEach((char, index) => {
              const charDelay = index / footerChars.length;
              const charProg = Math.max(0, Math.min(1, (exitProg - charDelay * 0.3) / 0.7));
              gsap.set(char, {
                opacity: 1 - charProg,
                y: 25 * charProg,
                filter: `blur(${charProg * 5}px)`,
              });
            });
          }

          // Mouse indicator exit
          if (mouseIndicatorRef.current) {
            gsap.set(mouseIndicatorRef.current, {
              opacity: Math.max(0, 1 - exitProg * 2),
              scale: Math.max(0.4, 1 - exitProg * 0.6),
            });
          }

          // Section 1 Logo: Statically fades out smoothly in place without moving or shifting
          if (logoWrapperRef.current) {
            gsap.set(logoWrapperRef.current, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: Math.max(0, 1 - exitProg * 1.4),
              filter: `blur(${exitProg * 3}px)`,
            });
          }
        } else {
          // Reset elements when scrolling back up
          if (headingChars && headingChars.length > 0) {
            headingChars.forEach((char) => {
              gsap.set(char, { opacity: 1, y: 0, filter: 'blur(0px)' });
            });
          }
          if (footerChars && footerChars.length > 0) {
            footerChars.forEach((char) => {
              gsap.set(char, { opacity: 1, y: 0, filter: 'blur(0px)' });
            });
          }
          if (mouseIndicatorRef.current) {
            gsap.set(mouseIndicatorRef.current, { opacity: 1, scale: 1 });
          }
          if (logoWrapperRef.current) {
            gsap.set(logoWrapperRef.current, { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' });
          }
        }

        // 3. Second Pinned Section Expansion from Center (Height first, then Width)
        let currentWidthPct = 0;

        if (secondSectionLayerRef.current) {
          if (progress < 0.62) {
            currentWidthPct = 0;
            gsap.set(secondSectionLayerRef.current, {
              clipPath: 'inset(50% 50% 50% 50%)',
              opacity: 0,
              pointerEvents: 'none',
            });
          } else if (progress >= 0.62 && progress < 0.80) {
            // Stage 1: Expanding HEIGHT from center (50% -> 0%) while keeping width narrow (4% of screen)
            const heightProg = (progress - 0.62) / 0.18; // 0 to 1
            const topBottomInset = 50 * (1 - heightProg);
            currentWidthPct = 4;
            gsap.set(secondSectionLayerRef.current, {
              clipPath: `inset(${topBottomInset}% 48% ${topBottomInset}% 48%)`,
              opacity: Math.min(1, heightProg * 1.5),
              pointerEvents: 'none',
            });
          } else if (progress >= 0.80 && progress < 0.96) {
            // Stage 2: Expanding WIDTH to full screen (48% inset -> 0% inset)
            const widthProg = (progress - 0.80) / 0.16; // 0 to 1
            const leftRightInset = 48 * (1 - widthProg);
            currentWidthPct = 4 + 96 * widthProg; // 4% to 100%
            gsap.set(secondSectionLayerRef.current, {
              clipPath: `inset(0% ${leftRightInset}% 0% ${leftRightInset}%)`,
              opacity: 1,
              pointerEvents: widthProg > 0.8 ? 'auto' : 'none',
            });
          } else {
            // Stage 3: 100% full screen final size
            currentWidthPct = 100;
            gsap.set(secondSectionLayerRef.current, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              pointerEvents: 'auto',
            });
          }

          setSectionWidthPercent(currentWidthPct);

          if (progress >= 0.85) {
            setIsSecondActive(true);
          } else {
            setIsSecondActive(false);
          }
        }
      },
    });

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      entranceTl.kill();
      pinTrigger.kill();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-wrapper"
      className="relative w-full bg-[#050507] touch-pan-y"
    >
      {/* Pinned Fullscreen Viewport Container */}
      <div
        ref={pinTargetRef}
        className="w-full h-screen h-[100dvh] relative flex items-center justify-center select-none overflow-hidden touch-pan-y"
      >
        {/* ================= SECTION 1: Minimalist 3D Frame Presentation ================= */}
        <section
          id="reference-main-frame"
          aria-label="Apresentação Marrento"
          className="absolute inset-0 w-full h-full bg-[#050507] flex flex-col justify-between items-center pt-2 sm:pt-6 pb-4 sm:pb-8 px-3 sm:px-6 overflow-hidden z-10"
        >
          {/* Fullscreen Centered 3D Canvas (Scroll-driven frames without conflicting lateral drag) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain will-change-transform"
            />

            {/* Subtle Interactive Frame Indicator */}
            <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-20 pointer-events-none opacity-80 transition-opacity duration-300">
              <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-zinc-800/80 rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono-tech text-[9px] sm:text-[10px] text-zinc-300 tracking-wider">
                  {String(currentFrameNum).padStart(3, '0')} / {TOTAL_FRAMES}
                </span>
              </div>
            </div>

            {/* Loading Indicator for initial frame buffer */}
            {!isFirstFrameLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050507] z-50 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-amber-200 uppercase">
                    Carregando experiência ({Math.min(100, Math.round((loadedFramesCount / TOTAL_FRAMES) * 100))}%)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Top Section: Logo + Exact Text with SplitText - Tightly docked to top without artificial gaps */}
          <header className="relative z-30 flex flex-col items-center text-center pt-0 sm:pt-2 space-y-1.5 sm:space-y-3 w-full pointer-events-none">
            {/* Logo Marrento - Smooth transition to Top Left */}
            <div
              ref={logoWrapperRef}
              id="hero-logo-wrapper"
              className="flex items-center justify-center will-change-transform z-50 pointer-events-none"
            >
              <img
                src={logoImg}
                alt="Logo Marrento"
                referrerPolicy="no-referrer"
                className="h-9 sm:h-12 md:h-14 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(200,130,50,0.3)]"
              />
            </div>

            {/* Exact Heading: "Seu Próximo Nível em Acessórios." */}
            <h1
              ref={headingWrapperRef}
              id="hero-heading"
              className="font-mono-tech text-xs sm:text-base md:text-lg lg:text-xl font-normal text-zinc-100 tracking-wider max-w-2xl px-2 overflow-hidden"
            >
              <SplitText
                text="Seu Próximo Nível em Acessórios."
                charClassName="text-zinc-100"
              />
            </h1>
          </header>

          {/* Bottom Section: Exact Text + Mouse Div */}
          <footer className="relative z-20 flex flex-col items-center text-center pb-3 sm:pb-6 space-y-1.5 sm:space-y-3 w-full pointer-events-none">
            <p
              ref={footerTextWrapperRef}
              id="hero-footer-text"
              className="font-mono-tech text-[11px] sm:text-sm md:text-base text-zinc-200 tracking-wide px-2 overflow-hidden"
            >
              <SplitText
                text="Estilo de alto padrão. Role para Explorar"
                charClassName="text-zinc-200"
              />
            </p>

            {/* Mouse Scroll Indicator - Click to smooth scroll */}
            <button
              type="button"
              ref={mouseIndicatorRef}
              id="mouse-scroll-indicator"
              aria-label="Rolar para a vitrine interativa"
              onClick={() => {
                const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
                const targetPos = (isMob ? 1800 : 2600) * 0.95;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
              }}
              className="w-5 h-8 sm:w-6 sm:h-9 border border-zinc-400/80 hover:border-amber-400 rounded-full flex items-start justify-center p-1 shadow-sm will-change-transform pointer-events-auto cursor-pointer transition-colors duration-300 group bg-black/20 backdrop-blur-xs"
            >
              <span className="w-1 h-2 bg-zinc-200 group-hover:bg-amber-300 rounded-full animate-bounce mt-1 transition-colors duration-300" />
            </button>
          </footer>
        </section>

        {/* ================= SECTION 2: Expanding from Center (Height first, then Width) ================= */}
        <div
          ref={secondSectionLayerRef}
          id="second-pinned-section-layer"
          className="absolute inset-0 w-full h-full z-20 overflow-hidden will-change-transform shadow-[0_0_80px_rgba(0,0,0,0.9)]"
          style={{ clipPath: 'inset(50% 50% 50% 50%)' }}
        >
          <MarrentoShowcaseSection
            isActive={isSecondActive}
            widthPercent={sectionWidthPercent}
            onNavigateCategory={onNavigateCategory}
            onNavigateWatches={onNavigateWatches}
          />
        </div>
      </div>
    </div>
  );
};
