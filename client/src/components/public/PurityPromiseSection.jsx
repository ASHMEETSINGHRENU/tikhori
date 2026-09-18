import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section: Purity Promise
 * Visual foundation uses the deckle-edged botanical parchment banner:
 * /assets/HOMEPAGE SECTION BANNERS  VISUAL SECTIONS/Gemini_Generated_Image_f7xarsf7xarsf7xa.png
 */
export const PurityPromiseSection = () => {
  const { language } = useLanguage();

  const parchmentBannerSrc = '/assets/homepage-banners/Gemini_Generated_Image_f7xarsf7xarsf7xa.png';

  const purityPillars = [
    {
      icon: Sprout,
      step: '01',
      title: language === 'hi' ? 'प्राकृतिक जैविक खेती' : 'Direct Organic Sourcing',
      desc: language === 'hi'
        ? 'विश्वसनीय जैविक उत्पादक किसानों से सीधे चयनित मसाले, बिना किसी हानिकारक कीटनाशक के।'
        : 'Single-origin spices sourced directly from trusted organic farms, completely free from chemical pesticides.'
    },
    {
      icon: CheckCircle2,
      step: '02',
      title: language === 'hi' ? 'डंठल-रहित छंटाई' : 'Manual Destemming',
      desc: language === 'hi'
        ? 'पीसने से पहले प्रत्येक मिर्च के डंठल को अलग किया जाता है ताकि कड़वाहट न रहे और गहरा प्राकृतिक रंग मिले।'
        : 'Carefully hand-destemmed before milling to eliminate bitterness and guarantee pure, vibrant natural colour.'
    },
    {
      icon: Award,
      step: '03',
      title: language === 'hi' ? 'धीमी पत्थर पिसाई' : 'Slow Stone-Ground Milling',
      desc: language === 'hi'
        ? 'कम तापमान पर पारंपरिक धीमी पिसाई जिससे मसालों के प्राकृतिक सुगंधित तेल और पोषक तत्व सुरक्षित रहते हैं।'
        : 'Traditional low-temperature stone milling that preserves essential oils, natural pungency, and authentic aroma.'
    },
    {
      icon: ShieldCheck,
      step: '04',
      title: language === 'hi' ? 'सुरक्षित फूड-ग्रेड पैकेजिंग' : 'Aroma-Lock Barrier Packaging',
      desc: language === 'hi'
        ? 'नमी-रोधी मल्टी-लेयर सीलबंद पाउच जो खेत की ताजी महक को आपकी रसोई तक सुरक्षित रखते हैं।'
        : 'Hermetically sealed food-grade pouches protecting delicate volatiles and freshness against moisture and light.'
    }
  ];

  return (
    <section id="purity-promise" className="py-20 md:py-28 bg-[#FDF6E9] relative overflow-hidden border-b border-[#E8DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Editorial Header with Deckle Parchment Banner Canvas */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-[#E8DFCF] bg-white">
            <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] lg:aspect-[3.6/1] overflow-hidden">
              <img
                src={parchmentBannerSrc}
                alt="Tikhori Purity Guarantee Parchment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#FDF6E9]/35 pointer-events-none"></div>

              {/* Centered Editorial Header Text */}
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="max-w-2xl space-y-2">
                  <span className="text-xs font-black text-[#1B4D2E] uppercase tracking-[0.2em] bg-white/90 px-3.5 py-1.5 rounded-full border border-[#1B4D2E]/20 inline-flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                    <span>{language === 'hi' ? 'शुद्धता का सच्चा संकल्प' : 'OUR PURITY PROMISE'}</span>
                  </span>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B4D2E] tracking-tight">
                    {language === 'hi' ? 'खेत की शुद्धता, आपकी थाली तक' : 'Pure Spices. Traditional Craft. Zero Shortcuts.'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5A483E] font-medium leading-relaxed max-w-xl mx-auto hidden sm:block">
                    {language === 'hi'
                      ? 'टिखोरी फूड्स में हर मसाला भारतीय पाक कला की प्राचीन परंपरा, बिना किसी कृत्रिम रंग या रसायन के, और धीमी पिसाई के साथ तैयार किया जाता है।'
                      : 'Every blend is ground with patient care, honoring authentic recipes without artificial colours, chemical preservatives, or synthetic fillers.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Purity Pillars Grid with Spring Physics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {purityPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} duration={600}>
                <div
                  className="bg-white rounded-3xl p-7 border-2 border-[#E8DFCF] hover:border-[#1B4D2E] shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all duration-400 ease-spring relative flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#1B4D2E]/10 text-[#1B4D2E] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1B4D2E] group-hover:text-[#FDF6E9] transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-display text-2xl font-black text-[#E8DFCF] group-hover:text-[#D4A21A] transition-colors">
                        {pillar.step}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-[#1B4D2E] mb-2 group-hover:text-[#D6301F] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A483E] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DFCF] flex items-center gap-1.5 text-xs font-bold text-[#1B4D2E]">
                    <span>{language === 'hi' ? '१००% प्रामाणिक' : '100% Authentic'}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A21A]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="rounded-3xl bg-white border-2 border-[#E8DFCF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2C230]/20 text-[#D4A21A] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-black text-[#1B4D2E]">
                  {language === 'hi' ? 'गुणवत्ता और प्रामाणिकता की गारंटी' : 'Tested for Purity & Authentic Flavour'}
                </h4>
                <p className="text-xs sm:text-sm text-[#5A483E] mt-0.5">
                  {language === 'hi'
                    ? 'शून्य कीटनाशक अवशेष, शून्य मिलावट, १००% शुद्ध साबुत मसालों से निर्मित।'
                    : 'Zero pesticide residue, zero added starch or dyes, crafted solely from whole spices.'}
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D6301F] hover:bg-[#B72416] text-[#FDF6E9] text-xs font-black tracking-widest uppercase transition-all shadow-sm shrink-0"
            >
              <span>{language === 'hi' ? 'मसाले देखें' : 'VIEW SPICES'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PurityPromiseSection;
