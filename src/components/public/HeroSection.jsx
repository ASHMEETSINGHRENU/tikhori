import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section 1 — Hero
 * Reference: DOCS/tikhori-foods-design-spec.md
 * Enhanced with fluid motion, floating physics, and button shimmer.
 */
export const HeroSection = ({ content }) => {
  const { t, tr, language } = useLanguage();
  const hero = content?.hero || {};

  return (
    <section className="relative overflow-hidden bg-[#FDF6E9] pt-10 pb-20 md:pt-16 md:pb-28 lg:pt-24 lg:pb-36 border-b border-[#E8DFCF]">
      {/* Hand-illustrated Botanical Corner Elements with Organic Sway Physics */}
      {/* Top Left Chili Illustration */}
      <div className="absolute -top-10 -left-10 w-44 h-44 pointer-events-none opacity-25 md:opacity-40 select-none animate-sway">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D6301F]">
          <path d="M50 10 C45 25 35 45 35 70 C35 85 45 95 55 95 C65 95 70 85 68 70 C65 45 55 25 50 10 Z" />
          <path d="M50 10 C52 5 58 2 64 0" stroke="#1B4D2E" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Top Right Star Anise / Mustard Pod Illustration */}
      <div className="absolute -top-12 -right-12 w-52 h-52 pointer-events-none opacity-20 md:opacity-30 select-none animate-sway-alt">
        <svg viewBox="0 0 120 120" className="w-full h-full fill-[#F2C230]">
          <circle cx="60" cy="60" r="14" fill="#2B1D14" opacity="0.8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="60"
              cy="25"
              rx="9"
              ry="22"
              transform={`rotate(${i * 45} 60 60)`}
            />
          ))}
        </svg>
      </div>

      {/* Bottom Left Mustard Pod Sprig */}
      <div className="absolute -bottom-8 -left-8 w-36 h-36 pointer-events-none opacity-20 select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#1B4D2E] fill-current">
          <circle cx="30" cy="40" r="8" />
          <circle cx="50" cy="25" r="7" />
          <circle cx="65" cy="45" r="9" />
          <circle cx="45" cy="60" r="8" />
          <path d="M20 70 Q45 50 65 20" stroke="#1B4D2E" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <ScrollReveal animation="fade-up" delay={50}>
              {/* Section Eyebrow matching tagline styling */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-bold tracking-[0.2em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#F2C230]" />
                <span>{t(hero.badge, language === 'hi' ? '१००% जैविक और रसायन मुक्त' : '100% ORGANIC & CHEMICAL FREE')}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              {/* Display Headline: Fraunces rustic slab-serif with mixed emphasis */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                {language === 'hi' ? (
                  <>
                    स्वाद और शुद्धता का <span className="text-[#D6301F] italic font-serif">प्रामाणिक संगम</span>
                  </>
                ) : (
                  <>
                    SPICE CRAFTED <span className="text-[#D6301F] italic font-serif">RIGHT</span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              {/* Sub-headline */}
              <p className="text-xl sm:text-2xl font-bold text-[#2B1D14] leading-snug">
                {t(hero.subtitle, language === 'hi' ? 'शुद्ध। जैविक। पारंपरिक धीमी पिसाई।' : 'Pure. Organic. Authentic. Traditional Stone-Ground.')}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              {/* Narrative Description */}
              <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t(
                  hero.description,
                  language === 'hi'
                    ? 'टिखोरी फूड्स लाता है भारत की उत्तम कृषि भूमि से चुने हुए शुद्ध, डंठल-रहित और बिना किसी मिलावट के जैविक मसाले, पारंपरिक धीमी पिसाई से तैयार ताकि हर व्यंजन में मिले प्राकृतिक महक और स्वाद।'
                    : 'Tikhori Foods brings you single-origin, stemless, and unadulterated spices from India’s heartlands, crafted with low-temperature slow stone grinding to preserve rich volatile oils and true aroma.'
                )}
              </p>
            </ScrollReveal>

            {/* CTAs: Primary in Chili Red Pill with Shimmer, Secondary with Golden Yellow Accent */}
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#products"
                  className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-sm font-black tracking-widest uppercase hover:bg-[#B72416] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
                >
                  <span>{t(hero.ctaPrimary, language === 'hi' ? 'मसाले देखें' : 'EXPLORE OUR SPICES')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </a>

                <a
                  href="#origin-story"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-[#1B4D2E] text-[#1B4D2E] text-sm font-bold tracking-wider uppercase hover:bg-[#F2C230]/20 hover:-translate-y-0.5 transition-all duration-300 shadow-xs active:scale-95"
                >
                  <Award className="w-4 h-4 text-[#D4A21A]" />
                  <span>{t(hero.ctaSecondary, language === 'hi' ? 'हमारी विरासत' : 'OUR HERITAGE')}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Trust Badges Strip */}
            <ScrollReveal animation="fade-up" delay={550}>
              <div className="pt-6 border-t border-[#E8DFCF] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#2B1D14] font-bold">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D2E]"></span>
                  <span>{language === 'hi' ? '१००% जैविक' : '100% Organic'}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2C230]"></span>
                  <span>{language === 'hi' ? 'रसायन मुक्त' : 'Chemical Free'}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6301F]"></span>
                  <span>{language === 'hi' ? 'डंठल-रहित मिर्च' : 'Stemless Chilli'}</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D2E]"></span>
                  <span>{language === 'hi' ? 'पारंपरिक पिसाई' : 'Stone-Ground'}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: High-Impact Packaging with Floating Physics & Scalloped Sunburst Seal */}
          <div className="lg:col-span-5 flex justify-center relative">
            <ScrollReveal animation="scale" delay={200} duration={800}>
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Golden circular glowing halo plate with subtle pulse */}
                <div className="absolute inset-0 bg-[#F2C230]/25 rounded-full filter blur-2xl transform scale-95 -z-10 animate-pulse-subtle"></div>

                {/* Central Plate */}
                <div className="relative rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#E8DFCF] shadow-soft-lg hover:shadow-2xl transition-all duration-500 text-center">
                  <div className="relative inline-block mx-auto mb-2">
                    <img
                      src={hero.heroImage || '/assets/products/product-1.png'}
                      alt="Tikhori Foods Spices"
                      className="h-64 sm:h-80 w-auto object-contain mx-auto filter drop-shadow-xl animate-float"
                    />

                    {/* Scalloped Stamp Badge Overlay */}
                    <div className="absolute -bottom-4 -right-4 sm:-right-6">
                      <ScallopedBadge
                        textTop="PURE"
                        textMain="100%"
                        textSub="ORGANIC"
                        variant="yellow"
                        size="md"
                        rotate={10}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8DFCF]/60 mt-2">
                    <span className="text-[11px] font-extrabold text-[#D4A21A] uppercase tracking-[0.2em]">
                      {language === 'hi' ? 'पारंपरिक धीमी पिसाई' : 'TRADITIONAL STONE-GROUND'}
                    </span>
                    <h3 className="font-display text-lg font-black text-[#1B4D2E] mt-0.5">
                      {language === 'hi' ? 'प्रामाणिक भारतीय मसाले' : 'Single-Origin Stemless Purity'}
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
