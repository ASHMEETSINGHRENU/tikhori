import React from 'react';
import { Leaf, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WhyTikhoriSection = ({ content }) => {
  const { t, language } = useLanguage();
  const whyData = content?.whyTikhori || {};

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
      title: { en: 'Zero Added Flavours & Colours', hi: 'शून्य कृत्रिम रंग व स्वाद' },
      description: {
        en: 'Letting the natural aroma, vibrant hue, and authentic pungency of each spice speak for itself.',
        hi: 'मसालों का प्राकृतिक रंग और सौंधी खुशबू बिना किसी कृत्रिम रंग या फ्लेवर के।'
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
    <section id="why-tikhori" className="py-20 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
            {t(whyData.tagline, language === 'hi' ? 'टिखोरी की विशेषता' : 'The Tikhori Difference')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3 mb-4">
            {t(whyData.title, 'Why Tikhori Foods?')}
          </h2>
          <p className="text-base sm:text-lg text-brand-stone leading-relaxed">
            {t(
              whyData.subtitle,
              language === 'hi'
                ? 'हर चम्मच में है प्रामाणिकता, बेमिसाल शुद्धता और भारतीय मसालों की समृद्ध परंपरा।'
                : 'Every spoonful is grounded in authenticity, uncompromising purity, and India’s rich culinary heritage.'
            )}
          </p>
        </div>

        {/* 5 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const IconComp = iconMap[pt.icon] || Leaf;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-soft hover:shadow-soft-lg hover:border-brand-forest/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-sand flex items-center justify-center text-brand-forest mb-6 border border-brand-border/60">
                  <IconComp className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-3">
                  {t(pt.title, '')}
                </h3>

                <p className="text-sm text-brand-stone leading-relaxed">
                  {t(pt.description, '')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTikhoriSection;
