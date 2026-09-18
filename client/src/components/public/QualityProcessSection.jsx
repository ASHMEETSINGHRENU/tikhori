import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section: Quality Manufacturing Process
 * Visual journey centered around the 4-step artisan process artwork:
 * /assets/HOMEPAGE SECTION BANNERS  VISUAL SECTIONS/Gemini_Generated_Image_e1css7e1css7e1cs.png
 */
export const QualityProcessSection = ({ content }) => {
  const { t, language } = useLanguage();
  const processData = content?.qualityProcess || {};

  const processBannerSrc = '/assets/homepage-banners/Gemini_Generated_Image_e1css7e1css7e1cs.png';

  const defaultSteps = [
    {
      step: '01',
      title: { en: 'Fresh Raw Spices', hi: 'ताजे प्राकृतिक मसाले' },
      description: {
        en: 'Single-origin raw spices harvested at peak potency directly from natural partner growers.',
        hi: 'प्राकृतिक रूप से उपजे उत्तम मसालों की सीधे खेतों से शुद्धतम संकलन।'
      }
    },
    {
      step: '02',
      title: { en: 'Sorting & Preparation', hi: 'हाथ से छंटाई व सफाई' },
      description: {
        en: 'Manual destemming by women artisans, thorough optical cleaning, and solar drying.',
        hi: 'महिला कारीगरों द्वारा हाथ से डंठल निकालना और स्वच्छ धूप में सुखाना।'
      }
    },
    {
      step: '03',
      title: { en: 'Traditional Grinding', hi: 'पारंपरिक धीमी पत्थर पिसाई' },
      description: {
        en: 'Low-temperature slow stone milling to lock in natural volatile oils, nutrients, and aroma.',
        hi: 'धीमी गति से पत्थर की चक्की पर पिसाई ताकि प्राकृतिक तेल और खुशबू सुरक्षित रहें।'
      }
    },
    {
      step: '04',
      title: { en: 'Finished Pure Powders', hi: 'तैयार शुद्ध मसाले' },
      description: {
        en: '100% pure, unadulterated spice powders sealed in multi-layer aroma-barrier pouches.',
        hi: 'बिना किसी मिलावट या रंग के तैयार शुद्ध मसाले, ताजगी सुरक्षित रखने वाले पाउच में सील।'
      }
    }
  ];

  const steps = processData.steps && processData.steps.length > 0 ? processData.steps : defaultSteps;

  return (
    <section className="py-20 md:py-28 bg-[#FDF6E9] border-t border-b border-[#E8DFCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black text-[#1B4D2E] uppercase tracking-[0.2em] bg-[#1B4D2E]/10 px-3.5 py-1.5 rounded-full border border-[#1B4D2E]/20">
              {t(processData.tagline, language === 'hi' ? 'हमारी कार्यशैली' : 'ARTISANAL PROCESS')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight leading-[1.12]">
              {t(processData.title, language === 'hi' ? 'खेत से थाली तक की यात्रा' : 'The Journey from Farm to Kitchen')}
            </h2>
            <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
              {t(
                processData.subtitle,
                language === 'hi'
                  ? 'हर चरण में प्राकृतिक सुगंध, शुद्धता और पोषक तत्वों को सुरक्षित रखने की हमारी प्रामाणिक विधि।'
                  : 'How we preserve natural aroma, essential oils, and purity at every step of milling.'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Step Process Visual Canvas Banner */}
        <ScrollReveal animation="scale" delay={150} duration={800}>
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#E8DFCF] bg-white group">
            <img
              src={processBannerSrc}
              alt="4-Step Quality Process: Fresh Raw Spices, Sorting, Traditional Grinding, Finished Powders"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-spring"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {/* 4 Steps Editorial Cards Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.slice(0, 4).map((st, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} duration={600}>
              <div
                className="relative p-6 rounded-2xl bg-white border-2 border-[#E8DFCF] hover:border-[#1B4D2E] shadow-soft hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 ease-spring flex flex-col justify-between h-full group"
              >
                <div>
                  <span className="font-display text-3xl font-black text-[#E8DFCF] group-hover:text-[#D4A21A] transition-colors block mb-2">
                    {st.step || `0${idx + 1}`}
                  </span>
                  <h3 className="font-display text-base font-black text-[#1B4D2E] mb-1.5">
                    {t(st.title, '')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A483E] leading-relaxed">
                    {t(st.description, '')}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityProcessSection;
