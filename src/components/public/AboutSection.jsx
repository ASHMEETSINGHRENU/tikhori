import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSection = ({ content }) => {
  const { t, language } = useLanguage();
  const about = content?.about || {};

  return (
    <section id="about" className="py-20 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
              {t(about.tagline, language === 'hi' ? 'टिखोरी फूड्स के बारे में' : 'About Tikhori Foods')}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
              {t(about.title, 'Authentic Spices. Clean Ingredients. Social Mission.')}
            </h2>

            <p className="text-base sm:text-lg text-brand-stone leading-relaxed">
              {t(
                about.story,
                'Tikhori Foods was founded with a single mission: to return Indian cooking to its purest roots while creating meaningful livelihoods for rural women. We reject shortcuts, artificial enhancements, and chemical additives in favor of authentic aroma, rich flavors, and ethical practices.'
              )}
            </p>

            <div className="p-6 rounded-2xl bg-brand-sand/60 border border-brand-border/80">
              <h4 className="font-serif text-base font-bold text-brand-forest mb-2">
                {language === 'hi' ? 'हमारी मूल सोच' : 'Our Quality Philosophy'}
              </h4>
              <p className="text-sm text-brand-stone leading-relaxed">
                {t(
                  about.philosophy,
                  'We believe good food starts with honest farming, careful processing, and community respect. Every blend we craft reflects patience, purity, and our profound love for India’s spice heritage.'
                )}
              </p>
            </div>
          </div>

          {/* Right Brand Seal & Visual Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-3xl bg-white border border-brand-border shadow-soft-lg text-center max-w-sm w-full">
              <div className="w-24 h-24 mx-auto mb-6 p-2 rounded-full bg-brand-sand/80 flex items-center justify-center border border-brand-border">
                <img
                  src="/assets/logo/logo.png"
                  alt="Tikhori Foods Logo"
                  className="h-20 w-20 object-contain"
                />
              </div>

              <h3 className="font-serif text-2xl font-bold text-brand-forest mb-1">
                Tikhori Foods
              </h3>
              <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-widest mb-6">
                Spice Crafted Right
              </p>

              <div className="space-y-3 text-left border-t border-brand-border/60 pt-6 text-xs text-brand-stone">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0" />
                  <span>{language === 'hi' ? '१००% जैविक और रसायन मुक्त' : '100% Organic & Chemical Free'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-gold-dark shrink-0" />
                  <span>{language === 'hi' ? 'शून्य कृत्रिम रंग या फ्लेवर' : 'Zero Added Colours & Flavours'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-brand-red shrink-0" />
                  <span>{language === 'hi' ? 'ग्रामीण महिला उद्यमिता को संबल' : 'Rooted in Rural Women Empowerment'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
