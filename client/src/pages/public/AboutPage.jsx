import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Award, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import AboutSection from '../../components/public/AboutSection';
import OriginStorySection from '../../components/public/OriginStorySection';
import QualityProcessSection from '../../components/public/QualityProcessSection';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import ScallopedBadge from '../../components/common/ScallopedBadge';
import ScrollReveal from '../../components/common/ScrollReveal';

/**
 * About Page — Heritage Editorial Story
 * Visual rhythm: TEXT HERO (f3jcn0f3jcn0f3jc.png) → HERITAGE IMAGERY → PATTERN → ORIGIN STORY → PATTERN → QUALITY PROCESS → CTA
 */
export const AboutPage = () => {
  const { t, language } = useLanguage();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const heroBannerSrc = encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_f3jcn0f3jcn0f3jc.png');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        if (res.data?.success) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching about page content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="bg-[#FDF6E9] min-h-screen">
      {/* 1. Dedicated About Hero Banner Canvas */}
      <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
        <div className="relative w-full min-h-[480px] lg:min-h-[560px] flex items-center">
          {/* Panoramic Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroBannerSrc}
              alt="Heritage Masala Dabba and Indian Spice Traditions - Tikhori Foods"
              className="w-full h-full object-cover object-right lg:object-center"
              loading="eager"
            />
            {/* Gentle gradient wash on left for legible HTML typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9] via-[#FDF6E9]/90 to-transparent lg:via-[#FDF6E9]/75 w-full lg:w-[62%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#FDF6E9]/55 lg:hidden pointer-events-none"></div>
          </div>

          {/* Editorial Content Block */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 w-full">
            <div className="max-w-xl space-y-4">
              {/* Breadcrumb */}
              <ScrollReveal animation="fade-up" delay={50}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7C72]">
                  <Link to="/" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</Link>
                  <span>/</span>
                  <span className="text-[#1B4D2E]">{language === 'hi' ? 'हमारी कहानी' : 'About Us'}</span>
                </div>
              </ScrollReveal>

              {/* Eyebrow */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                  <span>{language === 'hi' ? 'हमारी विरासत' : 'OUR LIVING STORY'}</span>
                </div>
              </ScrollReveal>

              {/* Display Page Title */}
              <ScrollReveal animation="fade-up" delay={150}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                  {language === 'hi' ? (
                    <>
                      सदियों पुरानी परंपरा, <span className="text-[#D6301F] italic font-serif">सच्ची शुद्धता</span>
                    </>
                  ) : (
                    <>
                      ANCIENT HEIRLOOMS, <span className="text-[#D6301F] italic font-serif">TIMELESS PURITY</span>
                    </>
                  )}
                </h1>
              </ScrollReveal>

              {/* Short Supporting Text */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
                  {language === 'hi'
                    ? 'टिखोरी फूड्स केवल मसाले नहीं बनाता, यह भारतीय रसोइयों की उस पवित्र परंपरा को जीवित रखता है जहाँ शुद्धता और धैर्य ही स्वाद की असली पहचान हैं।'
                    : 'Crafted with reverence for authentic Indian culinary heritage. We combine single-origin organic harvesting, hand-destemming, and traditional slow stone milling.'}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Floating Scalloped Heritage Badge */}
          <div className="hidden lg:block absolute bottom-10 right-12 z-20 pointer-events-none">
            <ScallopedBadge
              textTop="ORIGINAL"
              textMain="HEIRLOOM"
              textSub="RECIPES"
              variant="yellow"
              size="lg"
              rotate={8}
            />
          </div>
        </div>
      </section>

      {/* 2. Heritage / About Section */}
      <AboutSection content={content} />

      {/* 3. Decorative Botanical Pattern Divider */}
      <DecorativePatternStrip variant="botanical" />

      {/* 4. Origin / Farm-to-Kitchen Story Section */}
      <OriginStorySection content={content} />

      {/* 5. Decorative Paisley Pattern Divider */}
      <DecorativePatternStrip variant="paisley" />

      {/* 6. Quality Process Section */}
      <QualityProcessSection content={content} />

      {/* 7. Final Editorial Call to Action */}
      <section className="py-20 bg-[#FDF6E9] border-t border-[#E8DFCF] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal animation="fade-up" delay={50}>
            <span className="text-xs font-black text-[#1B4D2E] uppercase tracking-[0.2em] bg-[#1B4D2E]/10 px-3.5 py-1.5 rounded-full border border-[#1B4D2E]/20">
              {language === 'hi' ? 'शुद्धता का अनुभव करें' : 'TASTE THE AUTHENTICITY'}
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight">
              {language === 'hi' ? 'अपनी रसोई को दें प्रामाणिक महक' : 'Bring Living Heritage to Your Pantry'}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="text-base text-[#5A483E] leading-relaxed">
              {language === 'hi'
                ? 'हमारे १००% जैविक, डंठल-रहित और धीमी पिसाई वाले मसालों का संग्रह देखें और हर कौर में शुद्धता महसूस करें।'
                : 'Explore our complete collection of single-origin, stemless, and stone-ground spices milled fresh for your dining table.'}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350}>
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
