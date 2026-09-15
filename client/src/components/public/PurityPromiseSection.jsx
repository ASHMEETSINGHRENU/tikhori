import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PurityPromiseSection = () => {
  const { language } = useLanguage();

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
    <section id="purity-promise" className="py-20 bg-brand-sand/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3.5 py-1.5 rounded-full border border-brand-forest/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{language === 'hi' ? 'शुद्धता का सच्चा संकल्प' : 'Our Purity Promise'}</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal mt-4 mb-4">
            {language === 'hi' ? 'खेत की शुद्धता, आपकी थाली तक' : 'Pure Spices. Traditional Craft. Zero Shortcuts.'}
          </h2>

          <p className="text-base sm:text-lg text-brand-stone leading-relaxed">
            {language === 'hi'
              ? 'टिखोरी फूड्स में हर मसाला भारतीय पाक कला की प्राचीन परंपरा, बिना किसी कृत्रिम रंग या रसायन के, और धीमी पिसाई के साथ तैयार किया जाता है।'
              : 'Every Tikhori Foods blend is ground with patient care, honoring authentic Indian recipes without artificial colours, chemical preservatives, or synthetic fillers.'}
          </p>
        </div>

        {/* 4 Purity Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14">
          {purityPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-brand-border/80 shadow-soft relative flex flex-col justify-between hover:border-brand-forest/40 hover:shadow-soft-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-forest/10 text-brand-forest flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-forest group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-brand-stone/30 group-hover:text-brand-gold transition-colors">
                      {pillar.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-stone leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center gap-1.5 text-xs font-semibold text-brand-forest">
                  <span>{language === 'hi' ? '१००% प्रामाणिक' : '100% Authentic'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="rounded-3xl bg-white border border-brand-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-brand-charcoal">
                {language === 'hi' ? 'गुणवत्ता और प्रामाणिकता की गारंटी' : 'Tested for Purity & Authentic Flavour'}
              </h4>
              <p className="text-xs text-brand-stone mt-0.5">
                {language === 'hi'
                  ? 'शून्य कीटनाशक अवशेष, शून्य मिलावट, १००% शुद्ध साबुत मसालों से निर्मित।'
                  : 'Zero pesticide residue, zero added starch or dyes, crafted solely from whole spices.'}
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold tracking-wider uppercase transition-all shadow-xs shrink-0"
          >
            <span>{language === 'hi' ? 'मसाले देखें' : 'View Spices'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PurityPromiseSection;
