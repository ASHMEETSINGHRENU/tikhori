import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section: Women's Empowerment & Artisanal Spice Journey
 * Special editorial feature celebrating rural women artisans who hand-destem,
 * sort, and stone-mill Tikhori spices with generational expertise.
 *
 * Visual Asset: /assets/SPECIAL SECTION — WOMEN'S EMPOWERMENT  JOURNEY/Gemini_Generated_Image_uv69bfuv69bfuv69.png
 */
export const WomensEmpowermentSection = () => {
  const { language } = useLanguage();

  const journeyImage = '/assets/womens-empowerment/Gemini_Generated_Image_uv69bfuv69bfuv69.png';

  const milestones = [
    {
      metric: '100%',
      label: language === 'hi' ? 'हाथ से डंठल छंटाई' : 'Hand Destemmed',
      desc: language === 'hi' ? 'कड़वाहट रहित गाढ़ा प्राकृतिक रंग' : 'Zero bitter calyx, purest vibrant color'
    },
    {
      metric: '500+',
      label: language === 'hi' ? 'महिला कारीगर परिवार' : 'Artisan Women Empowered',
      desc: language === 'hi' ? 'सम्मानजनक आजीविका और आत्मनिर्भरता' : 'Dignified rural livelihoods & fair wages'
    },
    {
      metric: '100%',
      label: language === 'hi' ? 'प्राकृतिक पत्थर पिसाई' : 'Heritage Craft',
      desc: language === 'hi' ? 'पीढ़ियों से संजोई पारंपरिक कला' : 'Preserving ancient culinary knowledge'
    }
  ];

  return (
    <section id="empowerment" className="relative py-20 md:py-28 lg:py-36 bg-[#FDF6E9] border-t border-b border-[#E8DFCF] overflow-hidden">
      {/* Background Decorative Accent Rings */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full border-2 border-[#D4A21A]/15 pointer-events-none animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Eyebrow & Main Section Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
              <Heart className="w-3.5 h-3.5 text-[#D6301F] fill-current" />
              <span>{language === 'hi' ? 'हमारी ताकत • नारी शक्ति' : "WOMEN'S EMPOWERMENT JOURNEY"}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight leading-[1.15]">
              {language === 'hi' ? (
                <>
                  शुद्धता को संवारते <span className="text-[#D6301F] italic font-serif">कारीगर हाथ</span>
                </>
              ) : (
                <>
                  THE ARTISAN HANDS THAT <span className="text-[#D6301F] italic font-serif">CRAFT PURITY</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
              {language === 'hi'
                ? 'टिखोरी के हर पैकेट के पीछे है ग्रामीण महिलाओं का समर्पण, पीढ़ियों का पाक ज्ञान और बिना किसी समझौते की शुद्धता।'
                : 'Behind every batch of Tikhori spices is the patient expertise of rural women artisans who meticulously hand-grade, destem, and preserve India’s culinary soul.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Large Panoramic Editorial Feature Canvas */}
        <ScrollReveal animation="scale" delay={150} duration={800}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E8DFCF] bg-white group">
            {/* Base Panoramic Artwork */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.35/1] overflow-hidden">
              <img
                src={journeyImage}
                alt="Women Artisans Destemming and Grading Spices - Tikhori Foods"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-spring"
                loading="lazy"
              />

              {/* Desktop Central Text Overlay sitting on the parchment negative space */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                <div className="w-[36%] max-w-md text-center p-6 bg-[#FDF6E9]/92 backdrop-blur-xs rounded-3xl border border-[#D4A21A]/30 shadow-lg pointer-events-auto space-y-3 transform -translate-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-[10px] font-black tracking-widest uppercase">
                    <Sparkles className="w-3 h-3 text-[#F2C230]" />
                    <span>{language === 'hi' ? 'हस्तशिल्प और सम्मान' : 'HONORING HERITAGE'}</span>
                  </div>

                  <h3 className="font-display text-2xl font-black text-[#1B4D2E] leading-snug">
                    {language === 'hi' ? 'हर मिर्च की बारीकी से छंटाई' : 'Single-Spur Stem Removal'}
                  </h3>

                  <p className="text-xs text-[#5A483E] leading-relaxed">
                    {language === 'hi'
                      ? 'मशीनों की जगह हमारी महिला कारीगर हर मिर्च का डंठल हाथों से अलग करती हैं, जिससे कड़वाहट खत्म होती है और मिलता है गहरा शुद्ध लाल रंग।'
                      : 'Eliminating the bitter stalk requires human discernment. Our women artisans individually destem each chilli, ensuring unmatched sweetness, depth, and fiery brilliance.'}
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D6301F] text-[#FDF6E9] text-xs font-black tracking-wider uppercase hover:bg-[#B72416] transition-all shadow-xs group/btn"
                    >
                      <span>{language === 'hi' ? 'पूरी कहानी पढ़ें' : 'READ THEIR STORY'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Scalloped Heritage Seal positioned top-right on desktop */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none z-20">
                <ScallopedBadge
                  textTop="EMPOWER"
                  textMain="RURAL"
                  textSub="ARTISANS"
                  variant="yellow"
                  size="md"
                  rotate={12}
                />
              </div>
            </div>

            {/* Mobile / Tablet Narrative Card below image */}
            <div className="lg:hidden p-6 sm:p-8 bg-[#FDF6E9] border-t border-[#E8DFCF] text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-[10px] font-black tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-[#F2C230]" />
                <span>{language === 'hi' ? 'हस्तशिल्प और सम्मान' : 'HONORING HERITAGE'}</span>
              </div>

              <h3 className="font-display text-2xl font-black text-[#1B4D2E]">
                {language === 'hi' ? 'हर मिर्च की बारीकी से छंटाई' : 'Single-Spur Stem Removal'}
              </h3>

              <p className="text-sm text-[#5A483E] leading-relaxed max-w-xl mx-auto">
                {language === 'hi'
                  ? 'मशीनों की जगह हमारी महिला कारीगर हर मिर्च का डंठल हाथों से अलग करती हैं, जिससे कड़वाहट खत्म होती है और मिलता है गहरा शुद्ध लाल रंग।'
                  : 'Eliminating the bitter stalk requires human discernment. Our women artisans individually destem each chilli, ensuring unmatched sweetness, depth, and fiery brilliance.'}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D6301F] text-[#FDF6E9] text-xs font-black tracking-wider uppercase hover:bg-[#B72416] transition-all shadow-md"
                >
                  <span>{language === 'hi' ? 'पूरी कहानी पढ़ें' : 'READ THEIR STORY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {milestones.map((item, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 120} duration={600}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E8DFCF] hover:border-[#1B4D2E] shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-spring text-center flex flex-col justify-between h-full group">
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-black text-[#1B4D2E] group-hover:text-[#D6301F] transition-colors block mb-2">
                    {item.metric}
                  </span>
                  <h4 className="font-display text-lg font-black text-[#2B1D14] mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A483E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFCF] flex items-center justify-center gap-1.5 text-xs font-bold text-[#1B4D2E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F2C230]" />
                  <span>{language === 'hi' ? 'सत्यापित परंपरा' : 'Verified Artisanal Standard'}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WomensEmpowermentSection;
