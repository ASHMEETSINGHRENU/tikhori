import React from 'react';
import { Sparkles, ShieldCheck, Award } from 'lucide-react';
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
              {t(about.title, language === 'hi' ? 'प्रामाणिक मसाले। शुद्ध सामग्री। बेमिसाल शुद्धता।' : 'Authentic Spices. Clean Ingredients. Unmatched Purity.')}
            </h2>

            <p className="text-base sm:text-lg text-brand-stone leading-relaxed">
              {t(
                about.story,
                language === 'hi'
                  ? 'टिखोरी फूड्स की शुरुआत एक स्पष्ट संकल्प के साथ हुई: भारतीय रसोई को उसकी प्राचीन शुद्धता और प्रामाणिक स्वाद से जोड़ना। हम रसायनों, कृत्रिम रंगों और शॉर्टकट को नकारते हुए पारंपरिक धीमी पिसाई और असली खुशबू को प्राथमिकता देते हैं।'
                  : 'Tikhori Foods was founded with a single mission: to return Indian cooking to its purest roots. We reject shortcuts, artificial enhancements, and chemical additives in favor of authentic aroma, rich natural flavors, slow stone grinding, and honest practices.'
              )}
            </p>

            <div className="p-6 rounded-2xl bg-brand-sand/60 border border-brand-border/80">
              <h4 className="font-serif text-base font-bold text-brand-forest mb-2">
                {language === 'hi' ? 'हमारी मूल सोच' : 'Our Quality Philosophy'}
              </h4>
              <p className="text-sm text-brand-stone leading-relaxed">
                {t(
                  about.philosophy,
                  language === 'hi'
                    ? 'हमारा मानना है कि अच्छा भोजन ईमानदार प्राकृतिक खेती, स्वच्छ प्रसंस्करण और मसालों के प्रति सम्मान से शुरू होता है। हर मसाला हमारी शुद्धता की प्रतिबद्धता को दर्शाता है।'
                    : 'We believe good food starts with honest farming, careful processing, and culinary integrity. Every blend we craft reflects patience, purity, and our profound love for India’s spice heritage.'
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
                  <Award className="w-4 h-4 text-brand-forest shrink-0" />
                  <span>{language === 'hi' ? 'पारंपरिक धीमी पत्थर पिसाई' : 'Traditional Slow Stone-Ground'}</span>
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
