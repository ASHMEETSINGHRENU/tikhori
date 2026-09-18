import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';
import ScrollReveal from '../common/ScrollReveal';

/**
 * Section: Heritage & About Tikhori
 * Editorial composition featuring archival spice craftsmanship artwork:
 * /assets/HOMEPAGE SECTION BANNERS  VISUAL SECTIONS/Gemini_Generated_Image_lkzooilkzooilkzo.png
 */
export const AboutSection = ({ content }) => {
  const { t, language } = useLanguage();
  const about = content?.about || {};

  const aboutArtworkSrc = '/assets/homepage-banners/Gemini_Generated_Image_lkzooilkzooilkzo.png';

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FDF6E9] relative border-b border-[#E8DFCF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Heritage Artwork */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#E8DFCF] bg-white group">
                <img
                  src={aboutArtworkSrc}
                  alt="Traditional Indian Spice Sorting and Stone Grinding - Tikhori Heritage"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-spring"
                  loading="lazy"
                />

                {/* Overlaid Scalloped Heritage Stamp */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                  <ScallopedBadge
                    textTop="HERITAGE"
                    textMain="100%"
                    textSub="AUTHENTIC"
                    variant="green"
                    size="md"
                    rotate={-8}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Storytelling Typography */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal animation="fade-left" delay={150}>
              <span className="text-xs font-black text-[#1B4D2E] uppercase tracking-[0.2em] bg-[#1B4D2E]/10 px-3.5 py-1.5 rounded-full border border-[#1B4D2E]/20">
                {t(about.tagline, language === 'hi' ? 'हमारी समृद्ध विरासत' : 'OUR LIVING HERITAGE')}
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={250}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight leading-[1.12]">
                {language === 'hi' ? (
                  <>
                    शुद्धता, संयम और <span className="text-[#D6301F] italic font-serif">पारंपरिक स्वाद</span>
                  </>
                ) : (
                  <>
                    ROOTED IN TRADITION. <span className="text-[#D6301F] italic font-serif">DRIVEN BY PURITY.</span>
                  </>
                )}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={350}>
              <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
                {t(
                  about.story,
                  language === 'hi'
                    ? 'टिखोरी फूड्स की शुरुआत एक स्पष्ट संकल्प के साथ हुई: भारतीय रसोई को उसकी प्राचीन शुद्धता और प्रामाणिक स्वाद से जोड़ना। हम रसायनों, कृत्रिम रंगों और शॉर्टकट को नकारते हुए पारंपरिक धीमी पिसाई और असली खुशबू को प्राथमिकता देते हैं।'
                    : 'Tikhori Foods was founded with a single mission: to return Indian cooking to its purest roots. We reject shortcuts, artificial enhancements, and chemical additives in favor of authentic aroma, rich natural flavors, slow stone grinding, and honest practices.'
                )}
              </p>
            </ScrollReveal>

            {/* Quality Philosophy Card */}
            <ScrollReveal animation="fade-left" delay={450}>
              <div className="p-6 rounded-2xl bg-white border-2 border-[#E8DFCF] space-y-3 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1B4D2E]">
                  <Sparkles className="w-4 h-4 text-[#D4A21A]" />
                  <span>{language === 'hi' ? 'हमारी मूल सोच' : 'OUR QUALITY PHILOSOPHY'}</span>
                </div>
                <p className="text-sm text-[#5A483E] leading-relaxed">
                  {t(
                    about.philosophy,
                    language === 'hi'
                      ? 'हमारा मानना है कि अच्छा भोजन ईमानदार प्राकृतिक खेती, स्वच्छ प्रसंस्करण और मसालों के प्रति सम्मान से शुरू होता है। हर मसाला हमारी शुद्धता की प्रतिबद्धता को दर्शाता है।'
                      : 'We believe good food starts with honest farming, careful processing, and culinary integrity. Every blend we craft reflects patience, purity, and our profound love for India’s spice heritage.'
                  )}
                </p>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal animation="fade-left" delay={550}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-widest uppercase hover:bg-[#25663D] hover:-translate-y-0.5 transition-all shadow-md group"
                >
                  <span>{language === 'hi' ? 'पूरी विरासत जानें' : 'EXPLORE OUR STORY'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center gap-4 text-xs font-bold text-[#1B4D2E]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1B4D2E]" />
                    <span>{language === 'hi' ? '१००% जैविक' : '100% Organic'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D4A21A]" />
                    <span>{language === 'hi' ? 'धीमी पत्थर पिसाई' : 'Stone-Ground'}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
