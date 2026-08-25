import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Check,
  X,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Watch,
  Gem,
  Flame,
} from 'lucide-react';
import logoImg from '../assets/images/logo_marrento.png';
import goldWatchImg from '../assets/images/marrento_gold_watch_1787238783475.jpg';
import heroWatchImg from '../assets/images/watch_stage_hero_1787247376900.jpg';
import luxuryWatchBgImg from '../assets/images/marrento_luxury_watch_bg_1787600107315.jpg';
import accessoriesHeroBgImg from '../assets/images/accessories_hero_bg_1787600610360.jpg';
import perfumeHeroBgImg from '../assets/images/perfume_hero_bg_1787600622653.jpg';
import smartwatchImg from '../assets/images/marrento_smartwatch_1787237764931.jpg';
import silverDiverWatchImg from '../assets/images/watch_silver_diver_1787600713173.jpg';
import watchCaseImg from '../assets/images/watch_case_frame_1787233980704.jpg';
import watchMovementImg from '../assets/images/watch_movement_macro_1787233993261.jpg';

// Accessories (Gold & Silver Chains & Bracelets)
import silverCubanChainImg from '../assets/images/jewelry_silver_cuban_1787600687756.jpg';
import silverBraceletImg from '../assets/images/jewelry_silver_bracelet_1787600702931.jpg';
import goldChainsImg from '../assets/images/marrento_gold_chains_1787237741681.jpg';
import goldBraceletImg from '../assets/images/marrento_cuban_bracelet_1787237753186.jpg';
import diamondRopeImg from '../assets/images/marrento_diamond_rope_1787239882769.jpg';
import crossPendantImg from '../assets/images/marrento_cross_pendant_1787238766460.jpg';
import lionPendantImg from '../assets/images/marrento_lion_pendant_1787239871099.jpg';

// Arabian Luxury Perfumes
import arabicOudImg from '../assets/images/perfume_arabic_oud_1787600637438.jpg';
import arabicAmberImg from '../assets/images/perfume_arabic_amber_1787600648865.jpg';
import arabicAsadImg from '../assets/images/perfume_arabic_asad_1787600661435.jpg';
import arabicSilverImg from '../assets/images/perfume_arabic_silver_1787600673781.jpg';
import perfumeClassicImg from '../assets/images/marrento_perfume_1787237776373.jpg';

export type MainCategory = 'relogios' | 'acessorios' | 'perfumes';

export interface WatchProduct {
  id: string;
  name: string;
  subtitle: string;
  mainCategory: MainCategory;
  category: string;
  price: string;
  priceNum: number;
  originalPrice?: string;
  tag: string;
  img: string;
  description: string;
  specs: {
    movement: string;
    caseMaterial: string;
    glass: string;
    waterResistance: string;
    diameter: string;
  };
}

interface WatchCategoryPageProps {
  initialCategory?: MainCategory;
  onNavigateHome: () => void;
  onNavigateCustomizer?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const WatchCategoryPage: React.FC<WatchCategoryPageProps> = ({
  initialCategory = 'relogios',
  onNavigateHome,
  onNavigateCustomizer,
  onSelectCategory,
}) => {
  const [currentCategory, setCurrentCategory] = useState<MainCategory>(initialCategory);
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);

  // Sync initial category if changed from parent
  useEffect(() => {
    if (initialCategory) {
      setCurrentCategory(initialCategory);
      setActiveSubFilter('all');
    }
  }, [initialCategory]);

  // Guarantee that mounting or changing categories resets scroll to absolute top (0, 0)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentCategory]);

  // 1. WATCHES CATALOG (100% Watches ONLY)
  const watchesCatalog: WatchProduct[] = [
    {
      id: 'watch-01',
      name: 'Chronograph Obsidian Gold',
      subtitle: 'Cronógrafo esportivo com ponteiros em ouro 18k e taquímetro.',
      mainCategory: 'relogios',
      category: 'chrono',
      price: 'R$ 1.690,00',
      originalPrice: 'R$ 2.100,00',
      priceNum: 1690,
      tag: 'Alta Relojoaria',
      img: heroWatchImg,
      description: 'Cronógrafo esportivo de luxo forjado em aço 316L com tratamento PVD Obsidian, taquímetro gravado a laser e sub-mostradores de precisão.',
      specs: {
        movement: 'Cronógrafo Suíço Quartz de Alta Precisão',
        caseMaterial: 'Aço 316L com tratamento PVD Obsidian & Ouro 18k',
        glass: 'Cristal Safira Flame-Fusion Duplo',
        waterResistance: '10 ATM (100m)',
        diameter: '43mm',
      },
    },
    {
      id: 'watch-02',
      name: 'Skeleton Gold Edition 18k',
      subtitle: 'Mecanismo mecânico automático visível frontal e traseiro.',
      mainCategory: 'relogios',
      category: 'skeleton',
      price: 'R$ 1.850,00',
      priceNum: 1850,
      tag: 'Mais Desejado',
      img: goldWatchImg,
      description: 'Peça monumental com movimento esqueletizado aparente gravado à mão em cristal safira, forjado com revestimento em ouro 18k Sallaz.',
      specs: {
        movement: 'Mecânico Automático Calibre M-808 (42h reserva)',
        caseMaterial: 'Aço Inoxidável 316L Ouro 18k Sallaz',
        glass: 'Cristal Safira Antirrisco Duplo',
        waterResistance: '5 ATM (50m)',
        diameter: '42mm',
      },
    },
    {
      id: 'watch-03',
      name: 'Diver Deep Sea Automatic 316L',
      subtitle: 'Bisel cerâmico rotativo e marcadores luminescentes.',
      mainCategory: 'relogios',
      category: 'diver',
      price: 'R$ 1.740,00',
      originalPrice: 'R$ 2.200,00',
      priceNum: 1740,
      tag: 'Mergulho Profissional',
      img: silverDiverWatchImg,
      description: 'Relógio de mergulho de alta performance com válvula de hélio, bisel cerâmico unidirecional de 120 cliques e caixa em aço escovado.',
      specs: {
        movement: 'Automático Japonês NH35 Calibre Pro',
        caseMaterial: 'Aço 316L Escovado Cirúrgico',
        glass: 'Cristal Safira com Lupa Cyclops',
        waterResistance: '30 ATM (300m)',
        diameter: '41mm',
      },
    },
    {
      id: 'watch-04',
      name: 'Royal Chrono All-Black Stealth',
      subtitle: 'Elegância sombria de alto contraste com acabamento DLC.',
      mainCategory: 'relogios',
      category: 'chrono',
      price: 'R$ 1.540,00',
      priceNum: 1540,
      tag: 'Edição Noturna',
      img: heroWatchImg,
      description: 'Caixa em acabamento DLC preto fosco militar com ponteiros luminescentes Super-LumiNova e bisel taquimétrico graduado.',
      specs: {
        movement: 'Cronógrafo Quartzo Suíço 1/10s',
        caseMaterial: 'Aço 316L com revestimento DLC Carbon',
        glass: 'Cristal Safira Duplo Antirreflexo',
        waterResistance: '10 ATM (100m)',
        diameter: '44mm',
      },
    },
    {
      id: 'watch-05',
      name: 'Smart Luxury Obsidian Pro',
      subtitle: 'Display AMOLED, coroa cerâmica e bio-sensores avançados.',
      mainCategory: 'relogios',
      category: 'smart',
      price: 'R$ 1.250,00',
      priceNum: 1250,
      tag: 'Smartwatch',
      img: smartwatchImg,
      description: 'Smartwatch de luxo com display AMOLED de 1.43", coroa tátil em cerâmica zircônia, monitoramento cardíaco contínuo e bateria para 10 dias.',
      specs: {
        movement: 'Sensor Óptico Bio-Tracker & Bluetooth 5.3',
        caseMaterial: 'Titânio Aeroespacial & Cerâmica Zircônia',
        glass: 'Display AMOLED Ultra-Bright 1000 nits',
        waterResistance: 'IP68 & 5 ATM',
        diameter: '45mm',
      },
    },
    {
      id: 'watch-06',
      name: 'Tourbillon Grand Complication 18k',
      subtitle: 'Gaiola de tourbillon aparente e reserva de 72 horas.',
      mainCategory: 'relogios',
      category: 'skeleton',
      price: 'R$ 2.490,00',
      originalPrice: 'R$ 3.100,00',
      priceNum: 2490,
      tag: 'Edição Limitada',
      img: watchMovementImg,
      description: 'A mais alta expressão da relojoaria artesanal com escape de rotação contínua antigravitacional e rubis sintéticos de atrito zero.',
      specs: {
        movement: 'Tourbillon Mecânico Manual 28.800 vph',
        caseMaterial: 'Ouro 18k Nobre & Aço 316L Espelhado',
        glass: 'Safira Abobadada Cristalina',
        waterResistance: '5 ATM (50m)',
        diameter: '42.5mm',
      },
    },
  ];

  // 2. ACCESSORIES CATALOG (100% Gold & Silver Chains & Bracelets ONLY)
  const accessoriesCatalog: WatchProduct[] = [
    {
      id: 'chain-01',
      name: 'Corrente Miami Cuban Prata 925 Italiana',
      subtitle: 'Elos maciços com corte diamantado e fecho gaveta duplo.',
      mainCategory: 'acessorios',
      category: 'prata',
      price: 'R$ 890,00',
      originalPrice: 'R$ 1.150,00',
      priceNum: 890,
      tag: 'Prata 925 Legítima',
      img: silverCubanChainImg,
      description: 'Forjada em pura Prata 925 Italiana com lapidação diamantada nas quatro faces, brilho espelhado e fecho gaveta usinado ultra-seguro.',
      specs: {
        movement: 'Fecho Duplo Trava Canivete Gravado',
        caseMaterial: 'Prata Maciça 925 de Lei Italiana',
        glass: 'Banho de Ródio Antiescurecimento',
        waterResistance: 'Resistente à Água Doce e Salgada',
        diameter: 'Comprimento: 60cm / Largura: 8mm / Peso: 48g',
      },
    },
    {
      id: 'chain-02',
      name: 'Correntes Cuban Layered Gold 18k',
      subtitle: 'Conjunto em camadas com banho nobre de ouro 18k 10 milésimos.',
      mainCategory: 'acessorios',
      category: 'ouro',
      price: 'R$ 890,00',
      priceNum: 890,
      tag: 'Mais Vendido',
      img: goldChainsImg,
      description: 'Design robusto com banho de ouro 18k em multicamadas nanocerâmicas, elos maciços polidos e fecho de alta segurança usinado.',
      specs: {
        movement: 'Fecho Gaveta Duplo com Trava de Pressão',
        caseMaterial: 'Banho de Ouro 18k Premium (10 Milésimos)',
        glass: 'Verniz Nano-Protetor Italiano Antialérgico',
        waterResistance: 'Resistente a Suor e Uso Diário',
        diameter: 'Comprimentos: 55cm + 65cm / Espessura: 6mm',
      },
    },
    {
      id: 'bracelet-01',
      name: 'Pulseira Cuban Iced Prata 925 Diamond',
      subtitle: 'Cravejada com pedras de zircônia cúbica 5A brilhantes.',
      mainCategory: 'acessorios',
      category: 'prata',
      price: 'R$ 750,00',
      originalPrice: 'R$ 980,00',
      priceNum: 750,
      tag: 'Iced Out',
      img: silverBraceletImg,
      description: 'Pulseira estilo cubana pesada em prata 925 revestida em ródio brilhante com cravação artesanal em micropavê de zircônias 5A.',
      specs: {
        movement: 'Fecho Box Lock Iced Cravejado',
        caseMaterial: 'Prata 925 com Cravação Micro-Pavê',
        glass: 'Zircônias Cúbicas Lapidação Brilhante 5A',
        waterResistance: 'Resistente a Respingo e Uso Diário',
        diameter: 'Comprimento: 20cm / Espessura: 10mm',
      },
    },
    {
      id: 'bracelet-02',
      name: 'Pulseira Cuban Gold com Placa 18k',
      subtitle: 'Elo cubano encorpado com placa polida Sallaz.',
      mainCategory: 'acessorios',
      category: 'ouro',
      price: 'R$ 590,00',
      priceNum: 590,
      tag: 'Lançamento',
      img: goldBraceletImg,
      description: 'Pulseira masculina imponente com elos cubanos grossos, placa central espelhada e banho de ouro amarelo 18k.',
      specs: {
        movement: 'Fecho Lagosta Reforçado em Ouro 18k',
        caseMaterial: 'Banho de Ouro 18k Ouro Nobre 10 Milésimos',
        glass: 'Acabamento Polido Sallaz Alta Refletividade',
        waterResistance: 'Resistente a Água',
        diameter: 'Comprimento: 21cm / Espessura: 9mm',
      },
    },
    {
      id: 'chain-03',
      name: 'Corrente Cordão Baiano Diamantado 18k',
      subtitle: 'Torção helicoidal clássica com reflexos dinâmicos de luz.',
      mainCategory: 'acessorios',
      category: 'ouro',
      price: 'R$ 680,00',
      priceNum: 680,
      tag: 'Destaque',
      img: diamondRopeImg,
      description: 'Clássico cordão baiano com entrelaçamento de alta densidade e corte diamantado nas arestas para máximo brilho.',
      specs: {
        movement: 'Fecho Canivete com Trava Oito',
        caseMaterial: 'Liga Nobre com Banho Ouro 18k 10 Milésimos',
        glass: 'Acabamento Diamantado 8 Faces',
        waterResistance: 'Resistente a Suor e Perfume',
        diameter: 'Comprimento: 60cm / Espessura: 5mm',
      },
    },
    {
      id: 'chain-04',
      name: 'Corrente Veneziana com Pingente Cruz 18k',
      subtitle: 'Pingente cruz maciça com elos venezianos alinhados.',
      mainCategory: 'acessorios',
      category: 'ouro',
      price: 'R$ 640,00',
      priceNum: 640,
      tag: 'Joias Marrento',
      img: crossPendantImg,
      description: 'Conjunto refinado de corrente veneziana italiana acompanhada de cruz com cantos chanfrados forjada em ouro 18k.',
      specs: {
        movement: 'Fecho Boia Reforçado',
        caseMaterial: 'Banho Ouro 18k 10 Milésimos',
        glass: 'Cruz Maciça com Chanfros Polidos',
        waterResistance: 'Uso Contínuo',
        diameter: 'Comprimento: 70cm / Pingente: 4.5cm',
      },
    },
    {
      id: 'chain-05',
      name: 'Corrente Franco com Pingente Leão Imperial 18k',
      subtitle: 'Símbolo de poder e autoridade esculpido em alto relevo 3D.',
      mainCategory: 'acessorios',
      category: 'ouro',
      price: 'R$ 820,00',
      priceNum: 820,
      tag: 'Símbolo Marrento',
      img: lionPendantImg,
      description: 'Pingente monumental em forma de cabeça de leão com acabamento texturizado e olhos cravejados em zircônias pretas.',
      specs: {
        movement: 'Fecho Canivete com Pino Duplo',
        caseMaterial: 'Ouro 18k com Zircônias Pretas Obsidian',
        glass: 'Esculpido em 3D Alta Definição',
        waterResistance: 'Resistente a Água',
        diameter: 'Comprimento: 65cm / Pingente: 3.8cm',
      },
    },
  ];

  // 3. PERFUMES CATALOG (100% Arabic Luxury Perfumes ONLY)
  const perfumesCatalog: WatchProduct[] = [
    {
      id: 'perfume-01',
      name: 'Marrento Royal Oud & Amber Extrait',
      subtitle: 'Oud selvagem do Camboja, âmbar negro e açafrão real.',
      mainCategory: 'perfumes',
      category: 'oud',
      price: 'R$ 580,00',
      originalPrice: 'R$ 750,00',
      priceNum: 580,
      tag: 'Extrait de Parfum 100ml',
      img: arabicOudImg,
      description: 'Fragrância árabe majestosa em frasco de cristal negro com placa em treliça de ouro 18k e tampa com gema esmeralda.',
      specs: {
        movement: 'Concentração Extrait de Parfum (38% de óleos puros)',
        caseMaterial: 'Frasco em Cristal Negro Obsidian com Tampa Pesada',
        glass: 'Vaporizador Micro-Névoa Italiano',
        waterResistance: 'Projeção 4h / Fixação 18h+ na pele',
        diameter: 'Volume: 100ml (3.4 FL. OZ.)',
      },
    },
    {
      id: 'perfume-02',
      name: 'Marrento Khamrah Amber Velvet',
      subtitle: 'Âmbar licoroso, canela, fava tonka, baunilha e pralinê.',
      mainCategory: 'perfumes',
      category: 'amber',
      price: 'R$ 490,00',
      priceNum: 490,
      tag: 'Mais Desejado de Dubai',
      img: arabicAmberImg,
      description: 'Experiência olfativa quente e hipnótica em frasco de cristal esculpido com líquido âmbar cognac e tampa metálica dourada.',
      specs: {
        movement: 'Eau de Parfum Intense Oriental Gourmand',
        caseMaterial: 'Frasco de Vidro Cristal Lapidado com Tampa Dourada',
        glass: 'Válvula de Aspersão Magnética',
        waterResistance: 'Projeção Marcante / Fixação 14h+',
        diameter: 'Volume: 100ml (3.4 FL. OZ.)',
      },
    },
    {
      id: 'perfume-03',
      name: 'Marrento Asad Royal Noir Extrait',
      subtitle: 'Pimenta preta, tabaco cubano, café arábica e sândalo.',
      mainCategory: 'perfumes',
      category: 'spicy',
      price: 'R$ 520,00',
      priceNum: 520,
      tag: 'Fragrância Nobre',
      img: arabicAsadImg,
      description: 'Fragrância árabe masculina imponente em frasco preto texturizado com anéis dourados e tampa de coroa imperial.',
      specs: {
        movement: 'Extrait de Parfum Oriental Especiado Nobre',
        caseMaterial: 'Frasco Texturizado com Anéis de Ouro Polido',
        glass: 'Tampa Magnética com Coroa Real',
        waterResistance: 'Projeção Rastro Marcante / Fixação 16h+',
        diameter: 'Volume: 100ml (3.4 FL. OZ.)',
      },
    },
    {
      id: 'perfume-04',
      name: 'Marrento White Musk & Silver Oud',
      subtitle: 'Almíscar branco celestial, oud prateado e bergamota fresca.',
      mainCategory: 'perfumes',
      category: 'musk',
      price: 'R$ 460,00',
      originalPrice: 'R$ 600,00',
      priceNum: 460,
      tag: 'Edição Prata Imperial',
      img: arabicSilverImg,
      description: 'Fragrância árabe límpida, fresca e infinitamente sofisticada em frasco espelhado cromado com detalhes em arabescos.',
      specs: {
        movement: 'Eau de Parfum Fresh & Woody Oriental',
        caseMaterial: 'Frasco Cromado Silver Mirror com Filigrana',
        glass: 'Atomizador de Pressão Suave',
        waterResistance: 'Projeção Elegante / Fixação 12h+',
        diameter: 'Volume: 100ml (3.4 FL. OZ.)',
      },
    },
    {
      id: 'perfume-05',
      name: 'Marrento Imperial Dubai Edition',
      subtitle: 'Cardamomo, incenso de Omã, couro nobre e cedro atlas.',
      mainCategory: 'perfumes',
      category: 'oud',
      price: 'R$ 540,00',
      priceNum: 540,
      tag: 'Dubai Exclusive',
      img: perfumeClassicImg,
      description: 'Fragrância suntuosa inspirada nos palácios reais de Dubai com notas raras de resina de olíbano e couro toscano.',
      specs: {
        movement: 'Extrait de Parfum (35% essências puras)',
        caseMaterial: 'Frasco de Vidro Maciço com Detalhes Ouro',
        glass: 'Vaporizador Ultra-Fine Mist',
        waterResistance: 'Projeção Intensa / Fixação 15h+',
        diameter: 'Volume: 100ml (3.4 FL. OZ.)',
      },
    },
  ];

  // Active Catalog based on Selected Main Category
  const currentCatalog =
    currentCategory === 'relogios'
      ? watchesCatalog
      : currentCategory === 'acessorios'
      ? accessoriesCatalog
      : perfumesCatalog;

  // Filtered by Sub-filter pills and Search Query
  const filteredProducts = currentCatalog.filter((item) => {
    const matchesSubFilter =
      activeSubFilter === 'all' ? true : item.category === activeSubFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubFilter && matchesSearch;
  });

  const [cartItems, setCartItems] = useState<{ product: WatchProduct; quantity: number }[]>([
    {
      product: watchesCatalog[1],
      quantity: 1,
    },
  ]);

  const addToCart = (product: WatchProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: WatchProduct; quantity: number }[]
    );
  };

  const totalCartValue = cartItems.reduce(
    (sum, item) => sum + item.product.priceNum * item.quantity,
    0
  );

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Dynamic Content Configurations per Category
  const categoryConfig = {
    relogios: {
      heroBg: luxuryWatchBgImg,
      badge: 'ALTA RELOJOARIA • OURO 18K & CRISTAL SAFIRA',
      titleLine1: 'Haute Horlogerie',
      titleHighlight: 'Marrento Store',
      titleLine2: 'Masterpiece',
      subtitle: 'ENGENHARIA DE PRECISÃO & DESIGN ATEMPORAL',
      description:
        'Descubra nossa coleção de cronógrafos e modelos mecânicos automáticos forjados com precisão cirúrgica, aço 316L, cristal safira antirreflexo duplo e acabamento polido Sallaz em ouro 18k.',
      catalogTitle: 'Catálogo de Relógios',
      subFilters: [
        { key: 'all', label: 'Todos os Relógios' },
        { key: 'chrono', label: 'Cronógrafos' },
        { key: 'skeleton', label: 'Skeleton Automático' },
        { key: 'diver', label: 'Diver Profissional' },
        { key: 'smart', label: 'Smart Luxury' },
      ],
    },
    acessorios: {
      heroBg: accessoriesHeroBgImg,
      badge: 'JOIAS & CORRENTES • OURO 18K & PRATA 925 ITALIANA',
      titleLine1: 'Elegância Maciça',
      titleHighlight: 'Marrento Chains',
      titleLine2: 'Gold & Silver',
      subtitle: 'FECHOS USINADOS & CRAVAÇÃO ARTESANAL',
      description:
        'Exclusiva coleção de correntes Miami Cuban, cordões baianos diamantados e pulseiras encorpadas forjadas em ouro 18k e pura prata 925 com fechos usinados de alta precisão.',
      catalogTitle: 'Catálogo de Acessórios & Joias',
      subFilters: [
        { key: 'all', label: 'Todas as Joias' },
        { key: 'ouro', label: 'Ouro 18k' },
        { key: 'prata', label: 'Prata 925 Italiana' },
      ],
    },
    perfumes: {
      heroBg: perfumeHeroBgImg,
      badge: 'HAUTE PARFUMERIE • DUBAI ROYAL COLLECTION',
      titleLine1: 'Fragrâncias Árabes',
      titleHighlight: 'Marrento Imperial',
      titleLine2: 'Dubai Edition',
      subtitle: 'EXTRAIT DE PARFUM • OUD, ÂMBAR & RESINAS RARAS',
      description:
        'Macerados com as mais nobres essências do Oriente Médio: oud selvagem de alta pureza, âmbar dourado, açafrão real e almíscar imperial com fixação magnética inigualável.',
      catalogTitle: 'Catálogo de Perfumes Árabes',
      subFilters: [
        { key: 'all', label: 'Todos os Perfumes' },
        { key: 'oud', label: 'Oud Real' },
        { key: 'amber', label: 'Âmbar Licoroso' },
        { key: 'spicy', label: 'Especiados' },
        { key: 'musk', label: 'Almíscar & Prata' },
      ],
    },
  }[currentCategory];

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans-clean selection:bg-amber-500 selection:text-black">
      {/* LUXURY NAVBAR (Matches reference image with Logo, Menu, Search, Cart) */}
      <header className="sticky top-0 z-40 bg-[#060609]/95 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Left: Hamburger & Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir Menu"
            className="p-1.5 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={onNavigateHome}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-full text-xs font-mono-tech text-amber-300 hover:text-amber-200 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao 3D</span>
          </button>
        </div>

        {/* Center: Crown / Lion Logo & Brand Name */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={logoImg}
            alt="Marrento Store"
            className="h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(234,179,8,0.4)] group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-sm sm:text-base tracking-[0.25em] text-amber-100 font-bold uppercase">
              MARRENTO
            </span>
            <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.3em] text-amber-400/90 uppercase -mt-1 font-semibold">
              HAUTE HORLOGERIE
            </span>
          </div>
        </div>

        {/* Right: Search & Cart Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Buscar relógio"
            className="p-1.5 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver Carrinho"
            className="relative p-1.5 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#eab308] text-black text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.6)]">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Live Search Bar dropdown */}
      {isSearchOpen && (
        <div className="bg-[#0c0c11] border-b border-zinc-800 px-4 sm:px-8 py-3 animate-fadeIn">
          <div className="max-w-xl mx-auto relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por modelo, movimento, acabamento ou acessório..."
              className="w-full bg-black/60 border border-zinc-700 rounded-lg pl-9 pr-8 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono-tech"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Slide-out Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-72 sm:w-80 bg-[#0c0c10] border-r border-zinc-800 h-full p-6 flex flex-col justify-between z-10 animate-slideRight">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <img src={logoImg} alt="Logo" className="h-6 w-auto" />
                  <span className="font-serif-luxury text-sm tracking-widest text-amber-200">
                    MENU MARRENTO
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2 font-mono-tech text-xs tracking-wider uppercase">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigateHome();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>1. Experiência 3D Interativa</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentCategory('relogios');
                    setActiveSubFilter('all');
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    currentCategory === 'relogios'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold'
                      : 'hover:bg-zinc-800 text-zinc-300 hover:text-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Watch className="w-3.5 h-3.5" />
                    2. Catálogo de Relógios
                  </span>
                  {currentCategory === 'relogios' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentCategory('acessorios');
                    setActiveSubFilter('all');
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    currentCategory === 'acessorios'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold'
                      : 'hover:bg-zinc-800 text-zinc-300 hover:text-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Gem className="w-3.5 h-3.5" />
                    3. Joias & Acessórios
                  </span>
                  {currentCategory === 'acessorios' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentCategory('perfumes');
                    setActiveSubFilter('all');
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    currentCategory === 'perfumes'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold'
                      : 'hover:bg-zinc-800 text-zinc-300 hover:text-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5" />
                    4. Perfumaria Árabe
                  </span>
                  {currentCategory === 'perfumes' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <a
                href="https://wa.me/5561999999999?text=Olá!%20Gostaria%20de%20consultoria%20VIP%20para%20escolher%20um%20produto%20Marrento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#eab308] hover:bg-amber-400 text-black font-mono-tech text-xs font-bold rounded-lg text-center flex items-center justify-center gap-2 transition-all shadow-lg uppercase"
              >
                <Headphones className="w-4 h-4" />
                <span>Concierge VIP WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY SWITCHER TABS BAR */}
      <div className="w-full bg-[#08080c] border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-3 p-1 bg-black/60 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
          {[
            { id: 'relogios', label: 'Relógios', icon: Watch },
            { id: 'acessorios', label: 'Acessórios & Joias', icon: Gem },
            { id: 'perfumes', label: 'Perfumes Árabes', icon: Flame },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentCategory(tab.id as MainCategory);
                  setActiveSubFilter('all');
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-lg font-mono-tech text-[11px] sm:text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. HERO SPLIT SECTION - Dynamic Hero Image and Halo based on Category */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] overflow-hidden bg-[#030305] border-b border-zinc-800/80 flex items-center transition-all duration-500">
        {/* Full Width & Height Background Image with Product on the Right */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            key={categoryConfig.heroBg}
            src={categoryConfig.heroBg}
            alt={categoryConfig.titleHighlight}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right lg:object-center select-none opacity-95 animate-fadeIn"
          />

          {/* Golden Halo Radial Ambient Glow behind the Product */}
          <div className="absolute top-1/2 right-[10%] sm:right-[12%] -translate-y-1/2 w-[450px] h-[450px] sm:w-[560px] sm:h-[560px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.28)_0%,rgba(217,119,6,0.12)_50%,transparent_75%)] blur-2xl pointer-events-none" />

          {/* Minimalist Multi-layer Gradient Mask for pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/85 md:via-[#030305]/65 to-transparent w-full md:w-3/4 lg:w-3/5" />
          
          {/* Subtle top and bottom dark edge blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-[#030305]/50" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Action with pristine minimalist typography */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/60 backdrop-blur-md border border-amber-400/40 rounded-full shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono-tech text-[10px] sm:text-xs text-amber-300 uppercase tracking-widest font-semibold">
                {categoryConfig.badge}
              </span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-zinc-100 leading-[1.1] drop-shadow-md">
                {categoryConfig.titleLine1} <br />
                <span className="text-amber-200 font-normal italic">{categoryConfig.titleHighlight}</span> <br />
                {categoryConfig.titleLine2}
              </h1>

              {/* Decorative Accent Line */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mx-auto lg:mx-0 my-3" />

              <p className="font-mono-tech text-xs sm:text-sm text-amber-100/90 tracking-[0.25em] uppercase font-medium">
                {categoryConfig.subtitle}
              </p>
            </div>

            <p className="font-sans-clean text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto lg:mx-0 leading-relaxed drop-shadow">
              {categoryConfig.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#catalog-grid"
                className="px-7 py-3.5 bg-[#eab308] hover:bg-amber-400 text-zinc-950 font-mono-tech text-xs font-bold rounded-lg shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 transition-all tracking-wider uppercase flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORAR CATÁLOGO</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean spacious area allowing the luxury product image and golden halo to shine */}
          <div className="lg:col-span-5 hidden lg:block" />
        </div>
      </section>

      {/* 4. TRUST BADGES ROW */}
      <section className="w-full bg-[#08080c] border-b border-zinc-800/80 py-6 sm:py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e13]/60 border border-zinc-800/80 flex flex-col items-center justify-center space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 mb-0.5">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-mono-tech text-[11px] sm:text-xs font-bold text-zinc-100 uppercase tracking-wider">
              PREMIUM QUALITY
            </h3>
            <p className="font-sans-clean text-[10px] sm:text-[11px] text-zinc-400 leading-tight">
              Carefully curated products
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e13]/60 border border-zinc-800/80 flex flex-col items-center justify-center space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 mb-0.5">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-mono-tech text-[11px] sm:text-xs font-bold text-zinc-100 uppercase tracking-wider">
              TRUSTED STORE
            </h3>
            <p className="font-sans-clean text-[10px] sm:text-[11px] text-zinc-400 leading-tight">
              100% secure shipping
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e13]/60 border border-zinc-800/80 flex flex-col items-center justify-center space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 mb-0.5">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-mono-tech text-[11px] sm:text-xs font-bold text-zinc-100 uppercase tracking-wider">
              FAST SHIPPING
            </h3>
            <p className="font-sans-clean text-[10px] sm:text-[11px] text-zinc-400 leading-tight">
              Worldwide delivery in 3-7 days
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#0e0e13]/60 border border-zinc-800/80 flex flex-col items-center justify-center space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 mb-0.5">
              <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-mono-tech text-[11px] sm:text-xs font-bold text-zinc-100 uppercase tracking-wider">
              24/7 SUPPORT
            </h3>
            <p className="font-sans-clean text-[10px] sm:text-[11px] text-zinc-400 leading-tight">
              We're here to help you anytime
            </p>
          </div>
        </div>
      </section>

      {/* 5. CATALOG SECTION */}
      <section id="catalog-grid" className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <p className="font-mono-tech text-[10px] sm:text-xs text-amber-300 tracking-[0.3em] uppercase font-semibold">
            HANDPICKED SELECTION
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl text-zinc-100 font-light tracking-wide">
            {categoryConfig.catalogTitle}
          </h2>
          <div className="w-12 h-[1.5px] bg-amber-400 mx-auto mt-2" />
        </div>

        {/* Dynamic Sub-filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categoryConfig.subFilters.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSubFilter(tab.key)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono-tech text-[10px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeSubFilter === tab.key
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                  : 'bg-[#0d0d12] text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid (Matches the 3-column / 2-column dark luxury cards in screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-[#09090d] border border-zinc-800/90 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Product Top Tag */}
              <div className="flex items-center justify-between z-10 mb-3">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/80 text-[8.5px] sm:text-[9.5px] font-mono-tech uppercase tracking-wider text-amber-300 font-semibold">
                  {product.tag}
                </span>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="p-1 text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[10px] font-mono-tech"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Detalhes</span>
                </button>
              </div>

              {/* Product Image Stage */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#040406] border border-zinc-800/60 flex items-center justify-center p-3 cursor-pointer group/img"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain filter contrast-105 group-hover/img:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Product Info & Price */}
              <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-sm sm:text-base font-semibold text-zinc-100 uppercase tracking-wide group-hover:text-amber-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans-clean text-[11px] sm:text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tech text-sm sm:text-base font-bold text-amber-300 tracking-tight">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 font-mono-tech text-[10px] text-zinc-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Comprar ${product.name}`}
                    className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black border border-zinc-700 hover:border-amber-400 text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md group-hover:scale-110"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM TRUST ROW (Matches 3-item footer in screenshot) */}
      <footer className="w-full bg-[#040407] border-t border-zinc-800/80 py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-zinc-400 font-mono-tech text-xs tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-400" />
            <span>30-DAY RETURNS</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>SECURE PAYMENTS</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>100% AUTHENTIC</span>
          </div>
        </div>

        <div className="text-center pt-6 text-zinc-600 font-mono-tech text-[10px] tracking-widest uppercase">
          © {new Date().getFullYear()} MARRENTO STORE. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* MODAL: Product Detail / Specs */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl bg-[#0c0c11] border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-black border border-zinc-700 flex items-center justify-center p-4">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono-tech uppercase">
                  {selectedProduct.tag}
                </span>

                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-zinc-100">
                  {selectedProduct.name}
                </h3>

                <p className="font-mono-tech text-xl text-amber-300 font-bold">
                  {selectedProduct.price}
                </p>

                <p className="font-sans-clean text-xs text-zinc-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800 font-mono-tech text-[11px] text-zinc-400">
                  <div>
                    <span className="text-zinc-500">Movimento: </span>
                    <span className="text-zinc-200">{selectedProduct.specs.movement}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Caixa: </span>
                    <span className="text-zinc-200">{selectedProduct.specs.caseMaterial}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Vidro: </span>
                    <span className="text-zinc-200">{selectedProduct.specs.glass}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Resistência: </span>
                    <span className="text-zinc-200">{selectedProduct.specs.waterResistance}</span>
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-[#eab308] hover:bg-amber-400 text-black font-mono-tech text-xs font-bold rounded-lg text-center transition-all shadow-lg uppercase cursor-pointer"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER: Shopping Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="relative w-full max-w-md bg-[#0c0c11] border-l border-zinc-800 h-full p-6 flex flex-col justify-between z-10 shadow-2xl animate-slideLeft">
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif-luxury text-base font-bold text-zinc-100 uppercase tracking-wider">
                    SEU CARRINHO VIP ({totalCartCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 font-mono-tech text-xs space-y-3">
                  <p>SEU CARRINHO ESTÁ VAZIO</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded text-xs uppercase"
                  >
                    Explorar Modelos
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl items-center"
                    >
                      <div className="w-16 h-16 rounded-lg bg-black border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif-luxury text-xs font-semibold text-zinc-100 truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-mono-tech text-xs text-amber-300 font-bold">
                          {item.product.price}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono-tech text-xs text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Checkout */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="flex items-center justify-between font-mono-tech text-sm">
                  <span className="text-zinc-400 uppercase">Subtotal Estimado:</span>
                  <span className="text-amber-300 font-bold text-base">
                    R$ {totalCartValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <a
                  href={`https://wa.me/5561999999999?text=${encodeURIComponent(
                    `Olá Marrento Store! Gostaria de finalizar meu pedido VIP:\n` +
                      cartItems
                        .map(
                          (i) => `• ${i.product.name} (Qtd: ${i.quantity}) - ${i.product.price}`
                        )
                        .join('\n') +
                      `\nTotal: R$ ${totalCartValue.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#eab308] hover:bg-amber-400 text-black font-mono-tech text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(234,179,8,0.4)] uppercase cursor-pointer"
                >
                  <span>FINALIZAR PEDIDO VIA CONCIERGE VIP</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="font-mono-tech text-[9px] text-zinc-500 text-center uppercase tracking-wider">
                  Envio expresso segurado • Garantia vitalícia • Atendimento VIP
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
