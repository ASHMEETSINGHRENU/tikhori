import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PromotionalBanner = ({ banner }) => {
  const { t, language } = useLanguage();

  if (!banner || !banner.isActive) return null;

  const title = t(banner.title, '');
  const subtitle = t(banner.subtitle, '');
  const description = t(banner.description, '');
  const ctaText = t(banner.ctaText, language === 'hi' ? 'और जानें' : 'Learn More');
  const badge = t(banner.badge, '');

  return (
    <section className="py-12 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-forest-dark via-brand-forest to-brand-forest-light text-white p-8 sm:p-12 lg:p-16 shadow-soft-lg">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              {badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold-light text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{badge}</span>
                </div>
              )}

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                {title}
              </h2>

              {subtitle && (
                <p className="text-sm sm:text-base font-medium text-brand-gold-light">
                  {subtitle}
                </p>
              )}

              {description && (
                <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}

              <div className="pt-2">
                <a
                  href={banner.ctaLink || '#products'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Banner Media Asset */}
            <div className="lg:col-span-4 flex justify-center">
              <img
                src={banner.image || '/assets/products/product-1.png'}
                alt={title}
                className="h-48 sm:h-64 w-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
