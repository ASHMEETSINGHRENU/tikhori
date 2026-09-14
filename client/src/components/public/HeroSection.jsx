import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../common/Badge';

export const HeroSection = ({ content }) => {
  const { t, tr, language } = useLanguage();
  const hero = content?.hero || {};

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-brand-sand/50 via-brand-ivory to-brand-ivory">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-brand-forest/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forest/10 border border-brand-forest/20 text-brand-forest text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{t(hero.badge, tr('badgeOrganic'))}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-forest tracking-tight leading-[1.15]">
              {t(hero.title, 'Spice Crafted Right')}
            </h1>

            {/* Sub-headline */}
            <p className="text-xl sm:text-2xl font-medium text-brand-charcoal/90 leading-snug">
              {t(hero.subtitle, 'Pure. Organic. Authentic. Made with Purpose.')}
            </p>

            {/* Narrative / Supporting paragraph */}
            <p className="text-base sm:text-lg text-brand-stone leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(
                hero.description,
                'Tikhori Foods brings you single-origin, stemless, and unadulterated spices from India’s heartlands while championing rural women entrepreneurs and grassroots micro-enterprises.'
              )}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-forest text-white text-sm font-semibold tracking-wide hover:bg-brand-forest-light transition-all shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>{t(hero.ctaPrimary, tr('ctaExplore'))}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                to="/women-empowerment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white border border-brand-border text-brand-charcoal text-sm font-semibold tracking-wide hover:bg-brand-sand transition-all shadow-sm active:scale-95"
              >
                <HeartHandshake className="w-4 h-4 text-brand-red" />
                <span>{t(hero.ctaSecondary, tr('ctaMission'))}</span>
              </Link>
            </div>

            {/* Quick Micro-Trust Indicators */}
            <div className="pt-6 border-t border-brand-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-stone font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-forest" />
                <span>{language === 'hi' ? '१००% रसायन मुक्त' : 'Chemical Free'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                <span>{language === 'hi' ? 'शून्य कृत्रिम रंग' : 'Zero Added Colours'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                <span>{language === 'hi' ? 'डंठल-रहित लाल मिर्च' : 'Stemless Chilli'}</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Hero Art */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Background circular halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 via-brand-forest/10 to-transparent rounded-full filter blur-2xl transform scale-90 -z-10"></div>

              {/* Central Card with Featured Pack */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/90 to-brand-sand/60 border border-brand-border/80 shadow-soft-lg backdrop-blur-sm text-center">
                <div className="relative inline-block mx-auto mb-4">
                  <img
                    src={hero.heroImage || '/assets/products/product-1.png'}
                    alt="Tikhori Foods Spices"
                    className="h-64 sm:h-80 w-auto object-contain mx-auto filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                  {/* Organic seal badge overlay */}
                  <div className="absolute -bottom-2 -right-2 bg-brand-forest text-white rounded-2xl p-2.5 shadow-md flex items-center gap-2 border-2 border-white">
                    <img src="/assets/logo/logo.png" alt="Seal" className="w-7 h-7 object-contain" />
                    <div className="text-left leading-tight">
                      <p className="text-[10px] uppercase tracking-wider text-brand-gold-light font-bold">100% Organic</p>
                      <p className="text-xs font-bold text-white">Pure Indian Spice</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest">
                    {language === 'hi' ? 'शुद्ध पारंपरिक स्वाद' : 'Authentic Traditional Craft'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal mt-0.5">
                    {language === 'hi' ? 'प्रामाणिक भारतीय मसाले' : 'Crafted with Integrity & Purpose'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
