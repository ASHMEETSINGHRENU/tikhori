import React from 'react';
import { Leaf, ShieldCheck, Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BrandTrustStrip = () => {
  const { language } = useLanguage();

  const trustItems = [
    {
      icon: Leaf,
      title: language === 'hi' ? '१००% जैविक' : '100% Organic',
      subtitle: language === 'hi' ? 'शुद्ध प्राकृतिक सामग्री' : 'Pure natural ingredients'
    },
    {
      icon: ShieldCheck,
      title: language === 'hi' ? 'रसायन मुक्त' : 'Chemical Free',
      subtitle: language === 'hi' ? 'शून्य कीटनाशक अवशेष' : 'Zero pesticide residue'
    },
    {
      icon: Sparkles,
      title: language === 'hi' ? 'शून्य मिलावट' : 'Zero Added Colours',
      subtitle: language === 'hi' ? 'प्राकृतिक रंग व सुगंध' : 'No synthetic dyes or flavours'
    },
    {
      icon: CheckCircle2,
      title: language === 'hi' ? 'डंठल-रहित मिर्च' : 'Stemless Chilli',
      subtitle: language === 'hi' ? 'सावधानीपूर्वक छंटाई' : 'Meticulously destemmed'
    },
    {
      icon: HeartHandshake,
      title: language === 'hi' ? 'महिला उद्यमिता' : 'Women Empowerment',
      subtitle: language === 'hi' ? 'ग्रामीण स्वावलंबन' : 'Grassroots micro-enterprises'
    }
  ];

  return (
    <section className="bg-brand-sand/60 border-y border-brand-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {trustItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center shrink-0 text-brand-forest shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-brand-stone leading-tight mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandTrustStrip;
