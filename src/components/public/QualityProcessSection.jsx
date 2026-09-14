import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const QualityProcessSection = ({ content }) => {
  const { t, language } = useLanguage();
  const processData = content?.qualityProcess || {};

  const defaultSteps = [
    {
      step: '01',
      title: { en: 'Careful Selection', hi: 'उत्तम चयन' },
      description: {
        en: 'Hand-sorted raw spices sourced directly from partner natural growers.',
        hi: 'प्राकृतिक रूप से उपजे उत्तम मसालों की हाथ से छंटाई व चयन।'
      }
    },
    {
      step: '02',
      title: { en: 'Stemming & Cleaning', hi: 'सफाई व डंठल निकालना' },
      description: {
        en: 'Thorough destemming and traditional solar drying under hygienic conditions.',
        hi: 'धूल-मिट्टी और डंठल को अलग कर स्वच्छ वातावरण में सुखाना।'
      }
    },
    {
      step: '03',
      title: { en: 'Gentle Grinding', hi: 'पारंपरिक पिसाई' },
      description: {
        en: 'Low-temperature slow stone milling to lock in volatile oils and natural color.',
        hi: 'धीमी गति से पिसाई ताकि प्राकृतिक तेल और खुशबू सुरक्षित रहें।'
      }
    },
    {
      step: '04',
      title: { en: 'Aroma-Lock Packaging', hi: 'सुरक्षित पैकेजिंग' },
      description: {
        en: 'Hermetically sealed food-grade pouches that preserve aroma and protect from moisture.',
        hi: 'नमी-रोधी फूड-ग्रेड पाउच में सीलिंग ताकि ताजगी बनी रहे।'
      }
    },
    {
      step: '05',
      title: { en: 'Your Kitchen', hi: 'आपकी रसोई' },
      description: {
        en: 'Delivering authentic, chemical-free flavor to elevate every family meal.',
        hi: 'आपकी थाली तक बिना किसी मिलावट का प्रामाणिक स्वाद।'
      }
    }
  ];

  const steps = processData.steps && processData.steps.length > 0 ? processData.steps : defaultSteps;

  return (
    <section className="py-20 bg-brand-ivory border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
            {t(processData.tagline, language === 'hi' ? 'हमारी कार्यशैली' : 'Our Philosophy')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3 mb-4">
            {t(processData.title, 'The Journey from Farm to Kitchen')}
          </h2>
          <p className="text-base text-brand-stone">
            {t(
              processData.subtitle,
              'How we preserve natural aroma, purity, and nutrients at every step.'
            )}
          </p>
        </div>

        {/* 5 Steps Linear Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white border border-brand-border/80 shadow-soft flex flex-col justify-between hover:border-brand-forest/40 transition-all group"
            >
              <div>
                <span className="font-serif text-3xl font-black text-brand-sand group-hover:text-brand-gold transition-colors block mb-3">
                  {st.step || `0${idx + 1}`}
                </span>
                <h3 className="font-serif text-base font-bold text-brand-charcoal mb-2">
                  {t(st.title, '')}
                </h3>
                <p className="text-xs text-brand-stone leading-relaxed">
                  {t(st.description, '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityProcessSection;
