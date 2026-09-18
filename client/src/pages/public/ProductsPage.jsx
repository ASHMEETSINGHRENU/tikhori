import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import ProductCard from '../../components/public/ProductCard';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import ScallopedBadge from '../../components/common/ScallopedBadge';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * Products Page — Spices Catalog
 * Dedicated panoramic hero:
 * /assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_qj5sneqj5sneqj5s.png
 * Features dynamic search, category filtering, and product cards from API.
 */
export const ProductsPage = () => {
  const { tr, t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const heroBannerSrc = '/assets/page-heroes/Gemini_Generated_Image_qj5sneqj5sneqj5s.png';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data?.success) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी मसाले' : 'All Spices' },
    { id: 'organic', label: language === 'hi' ? '१००% जैविक' : '100% Organic' },
    { id: 'stemless', label: language === 'hi' ? 'डंठल-रहित' : 'Stemless' },
    { id: 'stone-ground', label: language === 'hi' ? 'धीमी पत्थर पिसाई' : 'Stone-Ground' }
  ];

  const filteredProducts = products.filter((p) => {
    const name = t(p.name, '').toLowerCase();
    const altName = (language === 'en' ? p.name?.hi : p.name?.en) || '';
    const desc = t(p.shortDescription, '').toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch = name.includes(q) || altName.toLowerCase().includes(q) || desc.includes(q);

    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'stemless') return matchesSearch && (name.includes('chilli') || name.includes('mirch') || p.tags?.includes('stemless'));
    if (activeCategory === 'stone-ground') return matchesSearch && (p.tags?.includes('stone-ground') || true);
    return matchesSearch;
  });

  return (
    <div className="bg-[#FDF6E9] min-h-screen">
      {/* 1. Dedicated Panoramic Hero Banner */}
      <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
        <div className="relative w-full min-h-[460px] lg:min-h-[520px] flex items-center">
          {/* Panoramic Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroBannerSrc}
              alt="Panoramic Indian Spices Banquet Table - Tikhori Foods"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Gentle gradient overlay to ensure perfect contrast for HTML typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/92 to-[#FDF6E9]/40 lg:w-[60%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#FDF6E9]/60 lg:hidden pointer-events-none"></div>
          </div>

          {/* Content Block */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 w-full">
            <div className="max-w-xl space-y-4">
              {/* Breadcrumb */}
              <ScrollReveal animation="fade-up" delay={50}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7C72]">
                  <Link to="/" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</Link>
                  <span>/</span>
                  <span className="text-[#1B4D2E]">{language === 'hi' ? 'मसाले' : 'Our Spices'}</span>
                </div>
              </ScrollReveal>

              {/* Eyebrow */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                  <span>{language === 'hi' ? 'शुद्ध मसाला संग्रह' : 'SINGLE-ORIGIN COLLECTION'}</span>
                </div>
              </ScrollReveal>

              {/* Page Title */}
              <ScrollReveal animation="fade-up" delay={150}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                  {language === 'hi' ? (
                    <>
                      खेतों से सीधा, <span className="text-[#D6301F] italic font-serif">ताजा पिसा</span>
                    </>
                  ) : (
                    <>
                      GROUND FRESH, <span className="text-[#D6301F] italic font-serif">SERVED PURE</span>
                    </>
                  )}
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
                  {language === 'hi'
                    ? '१००% जैविक, डंठल-रहित और बिना किसी कृत्रिम रंग या रसायन के तैयार किए गए साबुत मसालों का प्रामाणिक संग्रह।'
                    : 'Discover our unadulterated range of whole and stone-ground spices, carefully sourced from organic fields and hand-destemmed for authentic aroma.'}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Floating Scalloped Badge */}
          <div className="hidden lg:block absolute bottom-10 right-12 z-20 pointer-events-none">
            <ScallopedBadge
              textTop="100%"
              textMain="ORGANIC"
              textSub="CERTIFIED"
              variant="green"
              size="lg"
              rotate={-6}
            />
          </div>
        </div>
      </section>

      {/* 2. Catalog Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Controls: Search Bar + Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8DFCF]">
            {/* Search Input */}
            <div className="w-full md:max-w-md">
              <div className="relative flex items-center bg-white border-2 border-[#1B4D2E] rounded-full p-1 shadow-sm focus-within:shadow-md transition-shadow">
                <Search className="w-5 h-5 text-[#5A483E] ml-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={tr('searchPlaceholder')}
                  className="w-full bg-transparent px-3 py-2 text-sm text-[#2B1D14] placeholder-[#8C7C72] outline-none font-medium"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mr-3 text-xs font-bold text-[#8C7C72] hover:text-[#D6301F]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#1B4D2E] text-[#FDF6E9] shadow-sm scale-105'
                      : 'bg-white border border-[#E8DFCF] text-[#5A483E] hover:border-[#1B4D2E] hover:bg-[#F2C230]/15'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-3 border-[#1B4D2E] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-[#E8DFCF] p-8 max-w-lg mx-auto space-y-3">
              <Sparkles className="w-8 h-8 text-[#D4A21A] mx-auto" />
              <h3 className="font-display text-xl font-black text-[#1B4D2E]">
                {language === 'hi' ? 'कोई मसाला नहीं मिला' : 'No Spices Found'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A483E]">
                {language === 'hi'
                  ? 'कृपया कोई अन्य खोज शब्द या फ़िल्टर आज़माएं।'
                  : 'Try searching with a different spice name or resetting the category filter.'}
              </p>
              <button
                type="button"
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="mt-2 px-5 py-2 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-bold uppercase tracking-wider"
              >
                {language === 'hi' ? 'सभी देखें' : 'Reset Search'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Decorative Transition Strip */}
      <DecorativePatternStrip variant="botanical" />
    </div>
  );
};

export default ProductsPage;
