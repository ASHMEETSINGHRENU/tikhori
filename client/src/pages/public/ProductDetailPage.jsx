import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Package,
  Layers,
  Flame,
  Info,
  Award
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import Badge from '../../components/common/Badge';
import ScallopedBadge from '../../components/common/ScallopedBadge';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import ScrollReveal from '../../components/common/ScrollReveal';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, tr, language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/products/slug/${slug}`);
        if (res.data?.success) {
          setProduct(res.data.data);
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Dynamic Editorial Hero Banner Selection based on spice slug & name
  const getProductHeroImage = (prod) => {
    if (!prod) return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_db0q5tdb0q5tdb0q.png');
    const s = (prod.slug || '').toLowerCase();
    const nameEn = (prod.name?.en || '').toLowerCase();
    const nameHi = (prod.name?.hi || '').toLowerCase();

    if (s.includes('chilli') || s.includes('mirch') || nameEn.includes('chilli') || nameHi.includes('मिर्च')) {
      return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_3xzvrk3xzvrk3xzv.png');
    }
    if (s.includes('turmeric') || s.includes('haldi') || nameEn.includes('turmeric') || nameHi.includes('हल्दी')) {
      return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_84f73w84f73w84f7.png');
    }
    if (s.includes('coriander') || s.includes('dhaniya') || nameEn.includes('coriander') || nameHi.includes('धनिया')) {
      return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_e6nle7e6nle7e6nl.png');
    }
    if (s.includes('jeera') || s.includes('cumin') || s.includes('kaala') || nameEn.includes('jeera') || nameHi.includes('जीरा')) {
      return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_pwfkn7pwfkn7pwfk.png');
    }
    return encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_db0q5tdb0q5tdb0q.png');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF6E9] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#1B4D2E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FDF6E9] py-20">
        <div className="max-w-md mx-auto text-center px-4 bg-white p-8 rounded-3xl border-2 border-[#E8DFCF] shadow-soft">
          <Info className="w-10 h-10 text-[#D4A21A] mx-auto mb-3" />
          <h2 className="font-display text-2xl font-black text-[#1B4D2E] mb-2">
            {language === 'hi' ? 'उत्पाद नहीं मिला' : 'Product Not Found'}
          </h2>
          <p className="text-sm text-[#5A483E] mb-6">
            {language === 'hi'
              ? 'यह उत्पाद उपलब्ध नहीं है अथवा हटा दिया गया है।'
              : 'The product you are looking for is currently unavailable or has been moved.'}
          </p>
          <Link
            to="/products"
            className="btn-shimmer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-bold tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tr('ctaBackToProducts')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const productName = t(product.name, 'Organic Spice');
  const alternateName = language === 'en' ? product.name?.hi : product.name?.en;
  const shortDesc = t(product.shortDescription, '');
  const description = t(product.description, '');
  const usage = t(product.usage, '');
  const storage = t(product.storage, '');
  const packaging = t(product.packaging, '');

  const ingredients = product.ingredients?.[language] || product.ingredients?.en || [];
  const benefits = product.benefits?.[language] || product.benefits?.en || [];
  const features = product.features || [];

  const heroImageSrc = getProductHeroImage(product);

  return (
    <div className="bg-[#FDF6E9] min-h-screen">
      {/* 1. Dynamic Editorial Spice Hero Banner */}
      <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
        <div className="relative w-full min-h-[460px] lg:min-h-[520px] flex items-center">
          {/* Panoramic Spice Artwork */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroImageSrc}
              alt={`${productName} - Tikhori Single Origin Spice`}
              className="w-full h-full object-cover object-right lg:object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/92 to-transparent lg:via-[#FDF6E9]/75 w-full lg:w-[62%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#FDF6E9]/60 lg:hidden pointer-events-none"></div>
          </div>

          {/* Editorial Content Overlay */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 w-full">
            <div className="max-w-xl space-y-4">
              {/* Back breadcrumb */}
              <ScrollReveal animation="fade-up" delay={50}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7C72]">
                  <Link to="/" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</Link>
                  <span>/</span>
                  <Link to="/products" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मसाले' : 'Products'}</Link>
                  <span>/</span>
                  <span className="text-[#1B4D2E]">{productName}</span>
                </div>
              </ScrollReveal>

              {/* Eyebrow */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                  <span>{language === 'hi' ? 'पारंपरिक धीमी पिसाई' : 'TRADITIONAL STONE-GROUND'}</span>
                </div>
              </ScrollReveal>

              {/* Display Title */}
              <ScrollReveal animation="fade-up" delay={150}>
                <div>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                    {productName}
                  </h1>
                  {alternateName && (
                    <p className="font-serif text-xl sm:text-2xl font-bold text-[#D6301F] italic mt-1">
                      {alternateName}
                    </p>
                  )}
                </div>
              </ScrollReveal>

              {/* Short Description */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
                  {shortDesc || (language === 'hi' ? '१००% जैविक और शुद्ध साबुत मसालों से तैयार।' : '100% Organic, single-origin and freshly cold-milled.')}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Scalloped Purity Stamp */}
          <div className="hidden lg:block absolute bottom-10 right-12 z-20 pointer-events-none">
            <ScallopedBadge
              textTop="PURE"
              textMain="100%"
              textSub="ORGANIC"
              variant="yellow"
              size="lg"
              rotate={10}
            />
          </div>
        </div>
      </section>

      {/* 2. Main Product Showcase & Details Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Packaging Visual Card with Spring Float */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white rounded-3xl border-2 border-[#E8DFCF] p-8 sm:p-12 shadow-soft flex flex-col items-center justify-center overflow-hidden group">
                <img
                  src={product.image}
                  alt={productName}
                  className="h-80 sm:h-96 w-auto object-contain filter drop-shadow-2xl group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-500 ease-spring"
                />

                <div className="mt-6 pt-4 border-t border-[#E8DFCF] text-center w-full">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A21A]">
                    {language === 'hi' ? 'प्रामाणिक पैकेजिंग' : 'ORIGINAL RETENTION POUCH'}
                  </span>
                  <p className="text-xs text-[#8C7C72] mt-0.5">
                    {language === 'hi' ? 'खुशबू और ताजगी लॉक' : 'Hermetically sealed aroma lock'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Narrative & Features */}
            <div className="lg:col-span-7 space-y-6">
              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#1B4D2E]/10 text-[#1B4D2E] border border-[#1B4D2E]/20"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Detailed Description */}
              {description && (
                <div className="text-base text-[#5A483E] leading-relaxed border-t border-[#E8DFCF] pt-4 space-y-3">
                  <h3 className="font-display text-xl font-black text-[#1B4D2E]">
                    {language === 'hi' ? 'उत्पाद विवरण' : 'About this Artisan Spice'}
                  </h3>
                  <p>{description}</p>
                </div>
              )}

              {/* Key Benefits List */}
              {benefits && benefits.length > 0 && (
                <div className="p-6 rounded-2xl bg-white border-2 border-[#E8DFCF] space-y-3 shadow-soft">
                  <h3 className="font-display text-base font-black text-[#1B4D2E] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4A21A]" />
                    <span>{tr('benefitsLabel')}</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5A483E]">
                    {benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1B4D2E] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Order / Inquiry Action Box */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/contact?subject=Order Inquiry: ${productName}`}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-sm font-black tracking-widest uppercase hover:bg-[#B72416] transition-all shadow-md active:scale-95 group"
                >
                  <Send className="w-4 h-4" />
                  <span>{tr('ctaOrderEnquiry')}</span>
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white border-2 border-[#1B4D2E] text-[#1B4D2E] text-xs font-bold tracking-wider uppercase hover:bg-[#F2C230]/20 transition-all shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{tr('ctaBackToProducts')}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Detailed Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#E8DFCF]">
            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFCF] shadow-soft">
              <h4 className="font-display text-base font-black text-[#1B4D2E] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1B4D2E]" />
                <span>{tr('ingredientsLabel')}</span>
              </h4>
              {ingredients && ingredients.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-[#5A483E]">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B4D2E]"></span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#5A483E] italic">100% Pure single-source organic spice</p>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFCF] shadow-soft">
              <h4 className="font-display text-base font-black text-[#1B4D2E] mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D6301F]" />
                <span>{tr('usageLabel')}</span>
              </h4>
              <p className="text-xs text-[#5A483E] leading-relaxed">
                {usage || (language === 'hi' ? 'स्वादानुसार व्यंजनों में उपयोग करें।' : 'Add according to heat and aroma preferences during cooking.')}
              </p>
            </div>

            {/* Storage Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFCF] shadow-soft">
              <h4 className="font-display text-base font-black text-[#1B4D2E] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A21A]" />
                <span>{tr('storageLabel')}</span>
              </h4>
              <p className="text-xs text-[#5A483E] leading-relaxed">
                {storage || (language === 'hi' ? 'ठंडी और सूखी जगह पर रखें।' : 'Store in a cool dry place inside an airtight container away from light.')}
              </p>
            </div>

            {/* Packaging Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#E8DFCF] shadow-soft">
              <h4 className="font-display text-base font-black text-[#1B4D2E] mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#1B4D2E]" />
                <span>{tr('packagingLabel')}</span>
              </h4>
              <p className="text-xs text-[#5A483E] leading-relaxed">
                {packaging || (language === 'hi' ? 'खुशबू और ताजगी सुरक्षित रखने वाले विशेष पाउच में उपलब्ध।' : 'Packaged in multi-layer aroma-lock pouch preventing moisture ingress.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Transition Strip */}
      <DecorativePatternStrip variant="botanical" />
    </div>
  );
};

export default ProductDetailPage;
