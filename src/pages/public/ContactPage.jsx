import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import ContactSection from '../../components/public/ContactSection';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import ScallopedBadge from '../../components/common/ScallopedBadge';
import ScrollReveal from '../../components/common/ScrollReveal';

export const ContactPage = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState(null);

  const heroBannerSrc = encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_y0kljly0kljly0kl.png');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-[#FDF6E9] min-h-screen">
      {/* 1. Dedicated Spice-Framed Hero Banner Canvas */}
      <section className="relative overflow-hidden bg-[#FDF6E9] border-b border-[#E8DFCF]">
        <div className="relative w-full min-h-[460px] lg:min-h-[520px] flex items-center justify-center">
          {/* Panoramic Whole Spice Framed Artwork */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroBannerSrc}
              alt="Authentic Whole Spices Frame - Tikhori Foods Contact"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#FDF6E9]/50 pointer-events-none"></div>
          </div>

          {/* Centered Editorial Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20 text-center space-y-4">
            {/* Breadcrumb */}
            <ScrollReveal animation="fade-up" delay={50}>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#8C7C72]">
                <Link to="/" className="hover:text-[#1B4D2E] transition-colors">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</Link>
                <span>/</span>
                <span className="text-[#1B4D2E]">{language === 'hi' ? 'संपर्क' : 'Contact Us'}</span>
              </div>
            </ScrollReveal>

            {/* Eyebrow */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A21A]" />
                <span>{language === 'hi' ? 'सीधा संपर्क' : 'DIRECT REACH & B2B'}</span>
              </div>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal animation="fade-up" delay={150}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B4D2E] tracking-tight leading-[1.08]">
                {language === 'hi' ? (
                  <>
                    हमसे जुड़ें, <span className="text-[#D6301F] italic font-serif">स्वाद की बात करें</span>
                  </>
                ) : (
                  <>
                    LET’S TALK <span className="text-[#D6301F] italic font-serif">AUTHENTIC FLAVOR</span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed max-w-2xl mx-auto font-medium">
                {language === 'hi'
                  ? 'चाहे आप खुदरा ग्राहक हों, शेफ या थोक वितरण भागीदार — हमारी टीम आपके हर प्रश्न और पूछताछ के लिए तत्पर है।'
                  : 'Whether you are a home chef, restaurant proprietor, or retail distributor, our spice experts are ready to assist with single-origin batches and custom wholesale requirements.'}
              </p>
            </ScrollReveal>
          </div>

          {/* Floating Scalloped Badge */}
          <div className="hidden lg:block absolute bottom-10 right-12 z-20 pointer-events-none">
            <ScallopedBadge
              textTop="SUPPORT"
              textMain="24/7"
              textSub="DIRECT"
              variant="yellow"
              size="lg"
              rotate={8}
            />
          </div>
        </div>
      </section>

      {/* 2. Contact Form & Details Section */}
      <ContactSection settings={settings} />

      {/* 3. Decorative Transition Strip */}
      <DecorativePatternStrip variant="botanical" />
    </div>
  );
};

export default ContactPage;
