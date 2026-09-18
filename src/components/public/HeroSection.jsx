import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section 1 — Main Homepage Hero
 * Built around the supplied panoramic hero artwork:
 * /assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_ygkm7pygkm7pygkm.png
 *
 * Left/Center: Sunlit parchment negative space with crisp HTML typography.
 * Right: Authentic culinary wooden board with whole spices, brass utensils & fresh herbs.
 */
export const HeroSection = ({ content }) => {
  const { t, language } = useLanguage();
  const hero = content?.hero || {};

  const heroBannerSrc = encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_ygkm7pygkm7pygkm.png');

  return (
    <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
      {/* Visual Canvas Container */}
      <div className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Background Panoramic Hero Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroBannerSrc}
            alt="Tikhori Foods Whole Spices and Culinary Board"
            className="w-full h-full object-cover object-right lg:object-center"
            loading="eager"
          />
          {/* Gentle parchment gradient overlay on left for perfect contrast across viewports */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/90 to-transparent lg:via-[#FDF6E9]/75 w-full lg:w-[68%] pointer-events-none"></div>
          {/* Subtle mobile parchment wash */}
          <div className="absolute inset-0 bg-[#FDF6E9]/60 lg:hidden pointer-events-none"></div>
        </div>

        {/* Content Container positioned within the natural left negative space */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24 w-full">
          <div className="max-w-2xl lg:max-w-xl space-y-6">
            <ScrollReveal animation="fade-up" delay={50}>
              {/* Section Eyebrow matching tagline styling */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-bold tracking-[0.2em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
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
              <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
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
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#products"
                  className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-sm font-black tracking-widest uppercase hover:bg-[#B72416] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
                >
                  <span>{t(hero.ctaPrimary, language === 'hi' ? 'मसाले देखें' : 'EXPLORE OUR SPICES')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </a>

                <a
                  href="#origin-story"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/95 border-2 border-[#1B4D2E] text-[#1B4D2E] text-sm font-bold tracking-wider uppercase hover:bg-[#F2C230]/20 hover:-translate-y-0.5 transition-all duration-300 shadow-xs active:scale-95"
                >
                  <Award className="w-4 h-4 text-[#D4A21A]" />
                  <span>{t(hero.ctaSecondary, language === 'hi' ? 'हमारी विरासत' : 'OUR HERITAGE')}</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Trust Badges Strip */}
            <ScrollReveal animation="fade-up" delay={550}>
              <div className="pt-6 border-t border-[#E8DFCF] flex flex-wrap items-center gap-5 text-xs text-[#2B1D14] font-bold">
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
        </div>

        {/* Floating Scalloped Heritage Seal positioned on the right visual */}
        <div className="hidden lg:block absolute bottom-12 right-12 z-20 pointer-events-none">
          <ScallopedBadge
            textTop="STONE"
            textMain="SLOW"
            textSub="GROUND"
            variant="yellow"
            size="lg"
            rotate={-8}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
