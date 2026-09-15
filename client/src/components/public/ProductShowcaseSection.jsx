import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section 3 — Product Showcase
 * Reference: DOCS/tikhori-foods-design-spec.md
 * Enhanced with spring hover physics, image zooms, and shimmer CTAs.
 */
export const ProductShowcaseSection = ({ products = [] }) => {
  const { t, language } = useLanguage();

  const flagshipSpices = [
    {
      slug: 'red-chilli-powder',
      name: { en: 'Red Chilli Powder', hi: 'लाल मिर्च पाउडर' },
      subtitle: { en: '100% Organic • Stemless', hi: '१००% जैविक • डंठल-रहित' },
      badge: 'STEMLESS',
      image: '/assets/products/product-1.png'
    },
    {
      slug: 'turmeric-powder',
      name: { en: 'Turmeric Powder', hi: 'हल्दी पाउडर' },
      subtitle: { en: 'High Curcumin • Earthy Aroma', hi: 'प्राकृतिक करक्यूमिन • सौंधी महक' },
      badge: 'COLD MILLED',
      image: '/assets/products/product-2.png'
    },
    {
      slug: 'coriander-powder',
      name: { en: 'Coriander Powder', hi: 'धनिया पाउडर' },
      subtitle: { en: 'Citrus-Warm • Unadulterated', hi: 'ताजा खुशबूदार • शुद्ध धनिया' },
      badge: 'SLOW STONE',
      image: '/assets/products/product-3.png'
    },
    {
      slug: 'kaala-masala',
      name: { en: 'Kaala Masala', hi: 'काला मसाला' },
      subtitle: { en: 'Traditional Roasted Heritage', hi: 'पारंपरिक भुना मसाला मिश्रण' },
      badge: 'HERITAGE',
      image: '/assets/products/product-4.png'
    }
  ];

  const displayList = products.length > 0 ? products : flagshipSpices;

  return (
    <section id="products" className="relative overflow-hidden bg-[#F2C230] text-[#2B1D14] py-20 md:py-28 lg:py-36 border-t border-b border-[#D4A21A]">
      {/* Decorative sunburst watermark with gentle continuous spin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border-4 border-[#D4A21A]/20 pointer-events-none -z-0 animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal animation="fade-up" delay={50} className="space-y-4 max-w-2xl">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F2C230]" />
              <span>{language === 'hi' ? 'हमारे प्रामाणिक मसाले' : 'OUR SPICES'}</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight leading-[1.12]">
              {language === 'hi' ? (
                <>
                  धीमी पिसाई से संरक्षित <span className="text-[#D6301F] italic font-serif">ताजगी और स्वाद</span>
                </>
              ) : (
                <>
                  SINGLE-ORIGIN SPICES <span className="text-[#D6301F] italic font-serif">GROUND FRESH</span>
                </>
              )}
            </h2>

            {/* Subtitle in Deep Brown for AA contrast */}
            <p className="text-base sm:text-lg text-[#2B1D14] font-medium leading-relaxed">
              {language === 'hi'
                ? '१००% जैविक, डंठल-रहित और बिना किसी कृत्रिम रंग के। हमारी विशेष धीमी पत्थर पिसाई हर मसाले के प्राकृतिक तेल और वास्तविक तीखेपन को बनाए रखती है।'
                : '100% Organic, meticulously destemmed, and zero artificial dyes. Low-temperature stone grinding locks in authentic natural oils and unmatched flavor.'}
            </p>
          </ScrollReveal>

          {/* Chili Red CTA Button with Shimmer */}
          <ScrollReveal animation="fade-left" delay={150} className="flex-shrink-0">
            <Link
              to="/products"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-sm font-black tracking-widest uppercase hover:bg-[#B72416] hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group"
            >
              <span>{language === 'hi' ? 'सभी मसाले देखें' : 'SHOP THE RANGE'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 4 Flagship Product Cards Grid with Spring Physics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayList.slice(0, 4).map((item, idx) => {
            const name = item.name ? t(item.name, item.name.en || 'Spice') : 'Spice';
            const subtitle = item.subtitle ? t(item.subtitle, item.shortDescription?.en || '') : (item.shortDescription ? t(item.shortDescription, '') : '');
            const slug = item.slug || `spice-${idx + 1}`;
            const image = item.image || `/assets/products/product-${(idx % 4) + 1}.png`;

            return (
              <ScrollReveal key={slug} animation="fade-up" delay={idx * 120} duration={650}>
                <div
                  className="group relative rounded-3xl bg-[#FDF6E9] border-2 border-[#1B4D2E] p-6 flex flex-col justify-between shadow-soft hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 ease-spring overflow-hidden"
                >
                  {/* Corner Scalloped Stamp with Spring Hover Tilt */}
                  <div className="absolute top-4 right-4 z-20 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <ScallopedBadge
                      textTop=""
                      textMain={idx === 0 ? "STEMLESS" : idx === 1 ? "ORGANIC" : idx === 2 ? "PURE" : "HERITAGE"}
                      textSub=""
                      variant={idx % 2 === 0 ? "yellow" : "green"}
                      size="sm"
                      rotate={idx * 5 - 5}
                    />
                  </div>

                  {/* Packaging Artwork Visual with Smooth Zoom */}
                  <div className="pt-4 pb-6 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="h-56 w-auto object-contain filter drop-shadow-lg group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-500 ease-spring"
                    />
                  </div>

                  {/* Content Block */}
                  <div className="border-t border-[#E8DFCF] pt-4 text-center">
                    <span className="text-[10px] font-black tracking-[0.18em] text-[#1B4D2E] uppercase">
                      {language === 'hi' ? '१००% जैविक मसाला' : '100% ORGANIC CERTIFIED'}
                    </span>
                    <h3 className="font-display text-xl font-black text-[#1B4D2E] mt-1 line-clamp-1 group-hover:text-[#D6301F] transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-[#5A483E] mt-1 line-clamp-2 min-h-[32px]">
                      {subtitle}
                    </p>

                    {/* Primary Product CTA in Chili Red with Shimmer */}
                    <Link
                      to={`/products/${slug}`}
                      className="btn-shimmer mt-4 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-wider uppercase group-hover:bg-[#D6301F] transition-colors shadow-xs hover:shadow-md"
                    >
                      <span>{language === 'hi' ? 'विवरण देखें' : 'VIEW DETAILS'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
