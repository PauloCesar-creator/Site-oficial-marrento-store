import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ShoppingBag,
  User,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import logoImg from '../assets/images/logo_marrento.png';
import chainsImg from '../assets/images/marrento_gold_chains_1787237741681.jpg';
import braceletImg from '../assets/images/marrento_cuban_bracelet_1787237753186.jpg';
import watchImg from '../assets/images/marrento_smartwatch_1787237764931.jpg';
import perfumeImg from '../assets/images/marrento_perfume_1787237776373.jpg';
import walletImg from '../assets/images/marrento_wallet_1787237797068.jpg';
import crossImg from '../assets/images/marrento_cross_pendant_1787238766460.jpg';
import goldWatchImg from '../assets/images/marrento_gold_watch_1787238783475.jpg';
import lionPendantImg from '../assets/images/marrento_lion_pendant_1787239871099.jpg';
import diamondRopeImg from '../assets/images/marrento_diamond_rope_1787239882769.jpg';
import { SplitText } from './SplitText';
import Stack from './Stack';

interface ShowcaseSectionProps {
  isActive?: boolean;
  widthPercent?: number;
  onNavigateCategory?: (categorySlug: 'relogios' | 'acessorios' | 'perfumes') => void;
  onNavigateWatches?: () => void;
  onSelectCategory?: (categorySlug: string) => void;
}

interface AccessoryItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  tag: string;
  img: string;
  description: string;
}

export const MarrentoShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  isActive = true,
  widthPercent,
  onNavigateCategory,
  onNavigateWatches,
  onSelectCategory,
}) => {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('relogio');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const [selectedProductModal, setSelectedProductModal] = useState<AccessoryItem | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const logoEmblemRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);

  // Accessories Catalog Items matching reference
  const accessories: AccessoryItem[] = [
    {
      id: 'chain-extra-01',
      name: 'Corrente Grumet Heavy 18k',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 790,00',
      tag: 'Mais Vendido',
      img: diamondRopeImg,
      description: 'Acabamento diamantado em ouro 18k com fecho gaveta duplo e elos maciços usinados.',
    },
    {
      id: 'chains-01',
      name: 'Correntes Cuban Layered Gold 18k',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 890,00',
      tag: 'Mais Vendido',
      img: chainsImg,
      description: 'Design robusto com banho de ouro 18k em camadas e fecho de alta segurança usinado.',
    },
    {
      id: 'bracelet-01',
      name: 'Pulseira Cuban Gold com Placa',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 590,00',
      tag: 'Lançamentos',
      img: braceletImg,
      description: 'Elo cubano encorpado com placa polida Sallaz para gravação personalizada.',
    },
    {
      id: 'watch-01',
      name: 'Relógio Skeleton Gold Edition',
      category: 'Relógios',
      categorySlug: 'relogio',
      price: 'R$ 1.850,00',
      tag: 'Alta Relojoaria',
      img: goldWatchImg,
      description: 'Mecanismo automático aparente com caixa em aço 316L satinado e vidro safira.',
    },
    {
      id: 'bracelet-02',
      name: 'Pulseira Cuban Gold Royale',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 620,00',
      tag: 'Lançamentos',
      img: braceletImg,
      description: 'Elo cubano encorpado com fecho trava de segurança e brilho espelhado Sallaz.',
    },
    {
      id: 'cross-01',
      name: 'Pingente Cruz Cravejada Rope',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 740,00',
      tag: 'Lançamentos',
      img: crossImg,
      description: 'Pingente cruz detalhado com acabamento polido e corrente diamantada de alto brilho.',
    },
    {
      id: 'lion-01',
      name: 'Pingente Leão Marrento Gold',
      category: 'Acessórios',
      categorySlug: 'acessorios',
      price: 'R$ 740,00',
      tag: 'Lançamentos',
      img: lionPendantImg,
      description: 'Pingente esculpido em ouro maciço com olhos cravejados em zircônias pretas.',
    },
    {
      id: 'perfume-01',
      name: 'Perfume Marrento Imperial',
      category: 'Perfumes',
      categorySlug: 'perfumes',
      price: 'R$ 480,00',
      tag: 'Fragrância Nobre',
      img: perfumeImg,
      description: 'Fragrância oriental amadeirada nobre com notas de âmbar negro, oud e especiarias raras.',
    },
  ];

  // Category Carousel strictly: "Relogio", "Acessórios", "Perfumes"
  const categoriesList = [
    {
      slug: 'relogio',
      title: 'Relógio',
      subtitle: 'Alta Relojoaria',
      previewImg: goldWatchImg,
    },
    {
      slug: 'acessorios',
      title: 'Acessórios',
      subtitle: 'Correntes & Pulseiras',
      previewImg: diamondRopeImg,
    },
    {
      slug: 'perfumes',
      title: 'Perfumes',
      subtitle: 'Fragrâncias Nobres',
      previewImg: perfumeImg,
    },
  ];

  // Entrance validation & synchronized progress:
  // Component 'main' validates that the second section has reached at least 80% screen width
  // before authorizing the entrance animations. Elements finalize their animations precisely at 100% final size.
  useEffect(() => {
    const effectiveWidth = widthPercent !== undefined ? widthPercent : (isActive ? 100 : 0);
    const isAuthorized = effectiveWidth >= 80;

    const subtitleChars = subtitleRef.current?.querySelectorAll('.split-char');
    const headingChars = headingRef.current?.querySelectorAll('.split-char');
    const counterChars = counterRef.current?.querySelectorAll('.split-char');

    if (!isAuthorized) {
      // 1. UNAUTHORIZED: Section width < 80%
      if (logoEmblemRef.current) {
        gsap.set(logoEmblemRef.current, { opacity: 0, filter: 'blur(8px)', scale: 0.96 });
      }
      if (subtitleChars && subtitleChars.length > 0) {
        gsap.set(subtitleChars, { opacity: 0, y: 14, filter: 'blur(6px)' });
      }
      if (headingChars && headingChars.length > 0) {
        gsap.set(headingChars, { opacity: 0, y: 22, filter: 'blur(8px)', scale: 0.85 });
      }
      if (counterChars && counterChars.length > 0) {
        gsap.set(counterChars, { opacity: 0, y: 8, filter: 'blur(4px)' });
      }
      if (cardsContainerRef.current) {
        gsap.set(cardsContainerRef.current, { opacity: 0, scale: 0.88, y: 35 });
      }
      if (pedestalRef.current) {
        gsap.set(pedestalRef.current, { opacity: 0, y: 30 });
      }
      return;
    }

    // 2. AUTHORIZED: Section width >= 80%
    const animFactor = Math.min(1, Math.max(0, (effectiveWidth - 80) / 20));

    // Logo Emblem
    if (logoEmblemRef.current) {
      gsap.to(logoEmblemRef.current, {
        opacity: animFactor,
        filter: `blur(${(1 - animFactor) * 6}px)`,
        scale: 0.96 + 0.04 * animFactor,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Subtitle Letters
    if (subtitleChars && subtitleChars.length > 0) {
      const subFactor = Math.min(1, Math.max(0, (animFactor - 0.05) / 0.95));
      subtitleChars.forEach((char, idx) => {
        const staggered = Math.min(1, Math.max(0, (subFactor - (idx / subtitleChars.length) * 0.25) / 0.75));
        gsap.to(char, {
          opacity: staggered,
          y: 14 * (1 - staggered),
          filter: `blur(${(1 - staggered) * 6}px)`,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    }

    // Heading Letters
    if (headingChars && headingChars.length > 0) {
      const headFactor = Math.min(1, Math.max(0, (animFactor - 0.1) / 0.9));
      headingChars.forEach((char, idx) => {
        const staggered = Math.min(1, Math.max(0, (headFactor - (idx / headingChars.length) * 0.3) / 0.7));
        gsap.to(char, {
          opacity: staggered,
          y: 22 * (1 - staggered),
          filter: `blur(${(1 - staggered) * 8}px)`,
          scale: 0.85 + 0.15 * staggered,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    }

    // Counter
    if (counterChars && counterChars.length > 0) {
      const cntFactor = Math.min(1, Math.max(0, (animFactor - 0.2) / 0.8));
      gsap.to(counterChars, {
        opacity: cntFactor,
        y: 8 * (1 - cntFactor),
        filter: `blur(${(1 - cntFactor) * 4}px)`,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Cards Container
    if (cardsContainerRef.current) {
      const cardFactor = Math.min(1, Math.max(0, (animFactor - 0.15) / 0.85));
      gsap.to(cardsContainerRef.current, {
        opacity: cardFactor,
        scale: 0.88 + 0.12 * cardFactor,
        y: 35 * (1 - cardFactor),
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Pedestal & Bottom Carousel
    if (pedestalRef.current) {
      const pedFactor = Math.min(1, Math.max(0, (animFactor - 0.25) / 0.75));
      gsap.to(pedestalRef.current, {
        opacity: pedFactor,
        y: 30 * (1 - pedFactor),
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, [isActive, widthPercent]);

  // Separate Category Carousel navigation
  const handleCategoryPrev = () => {
    setSelectedCategoryIdx((prev) => {
      const nextIdx = (prev - 1 + categoriesList.length) % categoriesList.length;
      const targetSlug = categoriesList[nextIdx].slug;
      setActiveCategorySlug(targetSlug);
      return nextIdx;
    });
  };

  const handleCategoryNext = () => {
    setSelectedCategoryIdx((prev) => {
      const nextIdx = (prev + 1) % categoriesList.length;
      const targetSlug = categoriesList[nextIdx].slug;
      setActiveCategorySlug(targetSlug);
      return nextIdx;
    });
  };

  const handleCategorySelect = (categorySlug: string, index: number) => {
    setActiveCategorySlug(categorySlug);
    setSelectedCategoryIdx(index);
    const targetCat =
      categorySlug === 'acessorios'
        ? 'acessorios'
        : categorySlug === 'perfumes'
        ? 'perfumes'
        : 'relogios';

    if (onNavigateCategory) {
      onNavigateCategory(targetCat);
      return;
    }
    if (categorySlug === 'relogio' && onNavigateWatches) {
      onNavigateWatches();
      return;
    }
    if (onSelectCategory) {
      onSelectCategory(categorySlug);
    }
  };

  // Stack cards creation from accessories - Minimalist Luxury design matching reference
  const stackCards = accessories.map((item) => (
    <div
      key={item.id}
      className="relative w-full h-full bg-[#0a0a0e] border border-zinc-700/70 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col justify-end select-none group"
    >
      {/* Full-bleed Product Image */}
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.08] brightness-[0.98] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Vignette Gradient Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {/* Minimalist Bottom Brand & Product Name Only */}
      <div className="relative z-10 w-full px-3.5 pb-4 pt-10 sm:px-4 sm:pb-5 sm:pt-12 flex flex-col items-center justify-end text-center space-y-1">
        <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-zinc-300/90 uppercase">
          MARRENTO
        </span>
        <h3 className="font-serif-luxury text-xs sm:text-[13.5px] md:text-sm font-medium text-zinc-100 text-center leading-snug tracking-wide line-clamp-2 drop-shadow-md">
          {item.name}
        </h3>
      </div>
    </div>
  ));

  const fallbackProduct = accessories[0];

  return (
    <div
      ref={sectionRef}
      id="marrento-showcase-section"
      className="relative w-full h-screen h-[100dvh] max-h-[100dvh] bg-[#060608] text-zinc-100 flex flex-col justify-between select-none overflow-hidden font-sans-clean"
    >
      {/* Background Starry Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* Top Navbar Header (Clean & Minimalist matching reference) */}
      <header className="relative z-30 w-full px-4 sm:px-12 py-3 sm:py-5 flex items-center justify-between">
        {/* Empty left spacer or Nav link to Watches */}
        <div className="w-16 sm:w-28 flex items-center">
          {onNavigateWatches && (
            <button
              onClick={onNavigateWatches}
              className="text-[10px] sm:text-xs font-mono-tech text-amber-400 hover:text-amber-200 uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Relógios</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Center Minimalist Brand Title */}
        <div className="flex items-center justify-center">
          <h1 className="font-serif-luxury text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.32em] font-normal text-amber-100/90 uppercase">
            MARRENTO STORE
          </h1>
        </div>

        {/* Right Nav Icons */}
        <div className="flex items-center gap-3.5 sm:gap-5 text-zinc-300 w-16 sm:w-28 justify-end">
          <button
            aria-label="Carrinho de Compras"
            onClick={() => setSelectedProductModal(fallbackProduct)}
            className="p-1 hover:text-amber-200 transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#eab308] text-black text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(234,179,8,0.6)]">
              1
            </span>
          </button>
          <button
            aria-label="Conta do Usuário"
            onClick={() => setSelectedProductModal(fallbackProduct)}
            className="p-1 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Center Stage: Hero Titles + Stack Component + CTA */}
      <main
        ref={mainRef}
        id="showcase-main-content"
        className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-8 flex flex-col justify-center items-center my-auto"
      >
        {/* Central Logo Crest & Main Headings */}
        <div ref={titleWrapperRef} className="text-center space-y-0.5 sm:space-y-1 mb-1 sm:mb-2">
          {/* Stylized M / Lion Logo Emblem */}
          <div
            ref={logoEmblemRef}
            id="showcase-logo-emblem"
            className="flex items-center justify-center mb-0.5 sm:mb-1 will-change-transform"
          >
            <img
              src={logoImg}
              alt="Marrento Crest"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform duration-300"
            />
          </div>

          <p
            ref={subtitleRef}
            className="font-mono-tech text-[10px] sm:text-xs text-amber-200/90 tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light overflow-hidden"
          >
            <SplitText text="ESTILO DE ALTO PADRÃO" />
          </p>

          <h2
            ref={headingRef}
            className="font-serif-luxury text-lg sm:text-2xl md:text-3xl font-light text-zinc-100 tracking-wider overflow-hidden leading-tight"
          >
            <SplitText text="SEU PRÓXIMO NÍVEL EM" />
            <br />
            <SplitText text="ACESSÓRIOS." />
          </h2>
        </div>

        {/* Interactive Stack Component from React Bits */}
        <div
          ref={cardsContainerRef}
          className="relative w-[230px] h-[260px] sm:w-[270px] sm:h-[300px] md:w-[290px] md:h-[320px] flex items-center justify-center my-1 sm:my-2 overflow-visible z-20"
        >
          <Stack
            randomRotation={true}
            sensitivity={160}
            sendToBackOnClick={true}
            autoplay={true}
            autoplayDelay={3500}
            pauseOnHover={true}
            animationConfig={{ stiffness: 280, damping: 22 }}
            cards={stackCards}
          />
        </div>

        {/* Center Bottom Action: "+40 ESTILOS ÚNICOS" + Button */}
        <div className="flex flex-col items-center space-y-1 sm:space-y-1.5 mt-1 sm:mt-1.5 z-30">
          <span
            ref={counterRef}
            className="font-mono-tech text-[9px] sm:text-[10px] text-zinc-400 tracking-[0.25em] uppercase overflow-hidden"
          >
            <SplitText text="+40 ESTILOS ÚNICOS" />
          </span>

          <button
            onClick={() => {
              if (onNavigateWatches) {
                onNavigateWatches();
              } else {
                setSelectedProductModal(fallbackProduct);
              }
            }}
            className="px-5 sm:px-7 py-2 sm:py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono-tech text-[11px] sm:text-xs font-bold rounded-lg shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:shadow-[0_4px_30px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <span>EXPLORAR COLEÇÃO DE RELÓGIOS</span>
            <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </main>

      {/* Bottom Category Dock: Aumentado e apenas "Relogio, Acessórios, Perfumes" */}
      <footer ref={pedestalRef} className="relative z-30 w-full px-3 sm:px-12 pb-3 sm:pb-5 pt-1">
        <div className="max-w-4xl mx-auto bg-[#09090d]/95 border border-amber-500/30 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-lg flex items-center justify-between gap-2 sm:gap-4">
          {/* Arrow Left: Only cycles category dock */}
          <button
            aria-label="Categoria Anterior"
            onClick={handleCategoryPrev}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 transition-all border border-zinc-700/60 cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Enlarged 3 Categories Carousel (Relogio, Acessórios, Perfumes) */}
          <div className="flex-1 flex items-center justify-around gap-3 sm:gap-6 py-0.5">
            {categoriesList.map((cat, idx) => {
              const isCatActive = activeCategorySlug === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug, idx)}
                  className={`group flex flex-col items-center gap-1 sm:gap-1.5 transition-all duration-300 cursor-pointer flex-1 max-w-[140px] sm:max-w-[170px] ${
                    isCatActive ? 'scale-105' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 transition-all overflow-hidden shadow-lg ${
                      isCatActive
                        ? 'border-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.6)] ring-2 sm:ring-4 ring-[#eab308]/30 scale-105'
                        : 'border-zinc-700 group-hover:border-amber-400/60'
                    }`}
                  >
                    <img
                      src={cat.previewImg}
                      alt={cat.title}
                      className="w-full h-full object-cover rounded-full filter contrast-110 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <span
                      className={`font-mono-tech text-[10px] sm:text-xs uppercase tracking-wider leading-tight font-bold ${
                        isCatActive
                          ? 'text-amber-300 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]'
                          : 'text-zinc-300 group-hover:text-amber-200'
                      }`}
                    >
                      {cat.title}
                    </span>
                    <span className="font-mono-tech text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                      {cat.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Arrow Right: Only cycles category dock */}
          <button
            aria-label="Próxima Categoria"
            onClick={handleCategoryNext}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 transition-all border border-zinc-700/60 cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-lg bg-[#0c0c11] border border-amber-500/40 rounded-2xl p-7 space-y-5 shadow-[0_0_60px_rgba(0,0,0,0.95)]">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-black border border-zinc-700 flex-shrink-0">
                <img
                  src={selectedProductModal.img}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono-tech uppercase">
                  {selectedProductModal.tag}
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-zinc-100">
                  {selectedProductModal.name}
                </h4>
                <p className="font-mono-tech text-amber-300 font-bold">
                  {selectedProductModal.price}
                </p>
              </div>
            </div>

            <p className="font-sans-clean text-sm text-zinc-300 leading-relaxed">
              {selectedProductModal.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-zinc-800 font-mono-tech text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Garantia vitalícia no banho e acabamento</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Entrega expressa e atendimento exclusivo VIP</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={`https://wa.me/5561999999999?text=${encodeURIComponent(
                  `Olá Marrento Store! Gostaria de adquirir: ${selectedProductModal.name} (${selectedProductModal.price})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#eab308] hover:bg-amber-400 text-black font-mono-tech text-xs font-bold rounded-lg text-center transition-all shadow-lg uppercase"
              >
                Atendimento VIP WhatsApp
              </a>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono-tech text-xs rounded-lg transition-colors uppercase cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
