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
    <section className="py-12 bg-[#FDF6E9] border-b border-[#E8DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1B4D2E] text-[#FDF6E9] p-8 sm:p-12 lg:p-16 shadow-xl border-2 border-[#F2C230]/40">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2C230]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              {badge && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F2C230]/20 border border-[#F2C230]/30 text-[#F2C230] text-xs font-black uppercase tracking-[0.2em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{badge}</span>
                </div>
              )}

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#FDF6E9]">
                {title}
              </h2>

              {subtitle && (
                <p className="text-sm sm:text-base font-bold text-[#F2C230]">
                  {subtitle}
                </p>
              )}

              {description && (
                <p className="text-xs sm:text-sm text-[#FDF6E9]/85 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}

              <div className="pt-2">
                <a
                  href={banner.ctaLink || '#products'}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F2C230] hover:bg-[#D4A21A] text-[#1B4D2E] text-xs font-black tracking-widest uppercase transition-all shadow-md active:scale-95 group"
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
