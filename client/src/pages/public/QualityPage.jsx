import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import QualityProcessSection from '../../components/public/QualityProcessSection';
import PurityPromiseSection from '../../components/public/PurityPromiseSection';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import ScallopedBadge from '../../components/common/ScallopedBadge';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * Quality Page — Purity & Standards
 * Dedicated hero banner:
 * /assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_jjeurnjjeurnjjeu.png
 */
export const QualityPage = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const heroBannerSrc = '/assets/page-heroes/Gemini_Generated_Image_jjeurnjjeurnjjeu.png';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        if (res.data?.success) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching quality page content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="bg-[#FDF6E9] min-h-screen">
      {/* 1. Dedicated Quality Hero Canvas */}
      <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
        <div className="relative w-full min-h-[480px] lg:min-h-[540px] flex items-center">
          {/* Panoramic Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroBannerSrc}
              alt="Granite Stone Spice Inspection and Measuring - Tikhori Quality"
              className="w-full h-full object-cover object-right lg:object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/92 to-transparent lg:via-[#FDF6E9]/75 w-full lg:w-[62%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#FDF6E9]/60 lg:hidden pointer-events-none"></div>
          </div>

          {/* Editorial Text Block */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 w-full">
            <div className="max-w-xl space-y-4">
              {/* Breadcrumb */}
              <ScrollReveal animation="fade-up" delay={50}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7C72]">
                  <Link to="/" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</Link>
                  <span>/</span>
                  <span className="text-[#1B4D2E]">{language === 'hi' ? 'शुद्धता मानक' : 'Quality & Purity'}</span>
                </div>
              </ScrollReveal>

              {/* Eyebrow */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                  <span>{language === 'hi' ? 'गुणवत्ता और प्रामाणिकता' : 'LAB-TESTED & CERTIFIED'}</span>
                </div>
              </ScrollReveal>

              {/* Display Page Title */}
              <ScrollReveal animation="fade-up" delay={150}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                  {language === 'hi' ? (
                    <>
                      शुद्धता का सच्चा वादा, <span className="text-[#D6301F] italic font-serif">शून्य मिलावट</span>
                    </>
                  ) : (
                    <>
                      THE TIKHORI STANDARD <span className="text-[#D6301F] italic font-serif">OF PURITY</span>
                    </>
                  )}
                </h1>
              </ScrollReveal>

              {/* Short Supporting Text */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
                  {language === 'hi'
                    ? 'खेत से आपकी रसोई तक, हर मसाला प्राकृतिक शुद्धता, पारंपरिक धीमी पिसाई और बिना किसी रसायन या कृत्रिम रंग के तैयार किया जाता है।'
                    : 'From organic farm sourcing to low-temperature slow stone milling, our obsessive standard guarantees zero pesticide residue, zero added colors, and true essential oils.'}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Floating Scalloped Badge */}
          <div className="hidden lg:block absolute bottom-10 right-12 z-20 pointer-events-none">
            <ScallopedBadge
              textTop="LAB"
              textMain="ZERO"
              textSub="PESTICIDE"
              variant="green"
              size="lg"
              rotate={-6}
            />
          </div>
        </div>
      </section>

      {/* 2. Purity Promise Section */}
      <PurityPromiseSection />

      {/* 3. Decorative Transition Strip */}
      <DecorativePatternStrip variant="botanical" />

      {/* 4. Quality Process Section */}
      <QualityProcessSection content={content} />

      {/* 5. Decorative Transition Strip */}
      <DecorativePatternStrip variant="paisley" />

      {/* 6. Final Call to Action Strip */}
      <section className="py-20 bg-[#FDF6E9] border-t border-[#E8DFCF] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight">
            {language === 'hi' ? 'अनुभव करें सच्ची शुद्धता का स्वाद' : 'Experience Pure Indian Spice Heritage'}
          </h2>
          <p className="text-base text-[#5A483E] max-w-xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'हमारे १००% जैविक और डंठल-रहित मसालों का स्वाद चखें और अपनी रसोई को दें प्रामाणिक महक।'
              : 'Explore our range of 100% organic, stemless masalas slow-ground for authentic taste and aroma.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-xs font-black tracking-widest uppercase hover:bg-[#B72416] transition-all shadow-md active:scale-95 group"
            >
              <span>{language === 'hi' ? 'मसाले देखें' : 'EXPLORE SPICES'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-[#1B4D2E] text-[#1B4D2E] text-xs font-bold tracking-wider uppercase hover:bg-[#F2C230]/20 transition-all shadow-xs"
            >
              <span>{language === 'hi' ? 'संपर्क करें' : 'CONTACT US'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityPage;
