import React from 'react';
import { Leaf, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section: The 5 Core Trust Pillars (Why Tikhori)
 * Enriched with the golden parchment scroll texture:
 * /assets/HOMEPAGE SECTION BANNERS  VISUAL SECTIONS/Gemini_Generated_Image_ssi9gpssi9gpssi9.png
 */
export const WhyTikhoriSection = ({ content }) => {
  const { t, language } = useLanguage();
  const whyData = content?.whyTikhori || {};

  const scrollBackdropSrc = '/assets/homepage-banners/Gemini_Generated_Image_ssi9gpssi9gpssi9.png';

  const iconMap = {
    Leaf,
    ShieldCheck,
    Sparkles,
    CheckCircle2,
    Award
  };

  const defaultPoints = [
    {
      icon: 'Leaf',
      title: { en: '100% Organic', hi: '१००% जैविक' },
      description: {
        en: 'Carefully selected ingredients grown naturally without synthetic fertilizers or harmful additives.',
        hi: 'प्राकृतिक रूप से उगाए गए मसाले, बिना किसी रासायनिक खाद या हानिकारक तत्वों के।'
      }
    },
    {
      icon: 'ShieldCheck',
      title: { en: 'Chemical Free', hi: 'रसायन मुक्त' },
      description: {
        en: 'A transparent, clean approach to spice processing that guarantees zero pesticide residues.',
        hi: 'मसालों की शुद्ध और पारदर्शी प्रक्रिया जो पूरी तरह रसायन और कीटनाशक मुक्त है।'
      }
    },
    {
      icon: 'Sparkles',
      title: { en: 'Zero Added Colours', hi: 'शून्य कृत्रिम रंग' },
      description: {
        en: 'Letting the natural aroma, vibrant hue, and authentic pungency of each spice speak for itself.',
        hi: 'मसालों का प्राकृतिक रंग और सौंधी खुशबू बिना किसी कृत्रिम रंग या मिलावट के।'
      }
    },
    {
      icon: 'CheckCircle2',
      title: { en: 'Stemless Chilli', hi: 'डंठल-रहित मिर्च' },
      description: {
        en: 'Meticulously destemmed chillies before grinding for superior smoothness, purity, and rich color.',
        hi: 'पीसने से पहले डंठल अलग करने की विशेष प्रक्रिया, जिससे मिले बेहतर शुद्धता और गाढ़ा रंग।'
      }
    },
    {
      icon: 'Award',
      title: { en: 'Traditional Stone Grinding', hi: 'पारंपरिक धीमी पिसाई' },
      description: {
        en: 'Slow, low-temperature stone milling that preserves natural essential oils, vibrant color, and authentic aroma.',
        hi: 'पारंपरिक धीमी पिसाई जिससे प्राकृतिक सुगंध, तेल और असली स्वाद पूरी तरह सुरक्षित रहते हैं।'
      }
    }
  ];

  const points = whyData.points && whyData.points.length > 0 ? whyData.points : defaultPoints;

  return (
    <section id="why-tikhori" className="py-20 md:py-28 bg-[#FDF6E9] relative border-b border-[#E8DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Editorial Header Banner with Parchment Scroll Foundation */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-[#E8DFCF] bg-[#FDF6E9]">
            {/* Background Parchment Graphic */}
            <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] lg:aspect-[4/1] overflow-hidden">
              <img
                src={scrollBackdropSrc}
                alt="Tikhori Heritage Parchment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#FDF6E9]/40 pointer-events-none"></div>

              {/* Centered Editorial Typography within the parchment */}
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 text-center">
                <div className="max-w-2xl space-y-2">
                  <span className="text-xs font-black text-[#1B4D2E] uppercase tracking-[0.2em] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#1B4D2E]/20 inline-block shadow-2xs">
                    {t(whyData.tagline, language === 'hi' ? 'टिखोरी की विशेषता' : 'THE TIKHORI DIFFERENCE')}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B4D2E] tracking-tight">
                    {t(whyData.title, 'Why Tikhori Foods?')}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-[#5A483E] font-medium leading-relaxed max-w-xl mx-auto hidden sm:block">
                    {t(
                      whyData.subtitle,
                      language === 'hi'
                        ? 'हर चम्मच में है प्रामाणिकता, बेमिसाल शुद्धता और भारतीय मसालों की समृद्ध परंपरा।'
                        : 'Every spoonful is grounded in authenticity, uncompromising purity, and traditional stone-ground milling.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5 Value Cards Grid with Staggered ScrollReveal & Spring Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const IconComp = iconMap[pt.icon] || Leaf;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} duration={600}>
                <div
                  className="p-8 rounded-3xl bg-white border-2 border-[#E8DFCF] hover:border-[#1B4D2E] shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 ease-spring flex flex-col group h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1B4D2E] text-[#F2C230] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-xl font-black text-[#1B4D2E] mb-2 group-hover:text-[#D6301F] transition-colors">
                    {t(pt.title, '')}
                  </h3>

                  <p className="text-sm text-[#5A483E] leading-relaxed">
                    {t(pt.description, '')}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTikhoriSection;
