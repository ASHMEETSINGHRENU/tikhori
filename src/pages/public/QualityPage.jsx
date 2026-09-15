import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import QualityProcessSection from '../../components/public/QualityProcessSection';
import PurityPromiseSection from '../../components/public/PurityPromiseSection';

export const QualityPage = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

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
    <div className="bg-brand-ivory min-h-screen">
      {/* Hero Header */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-brand-sand/50 via-brand-ivory to-brand-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3.5 py-1.5 rounded-full border border-brand-forest/20 inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{language === 'hi' ? 'गुणवत्ता और प्रामाणिकता' : 'Purity & Traditional Standards'}</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
            {language === 'hi' ? 'हमारी गुणवत्ता का वादा' : 'The Tikhori Standard of Purity'}
          </h1>

          <p className="text-base sm:text-lg text-brand-stone leading-relaxed max-w-2xl mx-auto">
            {language === 'hi'
              ? 'खेत से आपकी रसोई तक, हर मसाला प्राकृतिक शुद्धता, पारंपरिक धीमी पिसाई और बिना किसी रसायन के तैयार किया जाता है।'
              : 'From ethical farm partnerships to low-temperature slow stone milling, our passion is delivering authentic, chemical-free flavor to your everyday family meals.'}
          </p>
        </div>
      </section>

      {/* 4 Purity Pillars */}
      <PurityPromiseSection />

      {/* 5 Steps Process */}
      <QualityProcessSection content={content} />

      {/* Final CTA */}
      <section className="py-16 bg-brand-sand/30 border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal mb-3">
            {language === 'hi' ? 'अनुभव करें सच्ची शुद्धता का स्वाद' : 'Experience Pure Indian Spice Heritage'}
          </h2>
          <p className="text-sm text-brand-stone mb-6 max-w-xl mx-auto">
            {language === 'hi'
              ? 'हमारे १००% जैविक और डंठल-रहित मसालों का स्वाद चखें और अपनी रसोई को दें प्रामाणिक महक।'
              : 'Explore our range of 100% organic, stemless masalas slow-ground for authentic taste and aroma.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-forest text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-forest-light transition-all shadow-sm"
            >
              <span>{language === 'hi' ? 'मसाले देखें' : 'Explore Spices'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-brand-border text-brand-charcoal text-xs font-bold tracking-wider uppercase hover:bg-brand-sand transition-all shadow-xs"
            >
              <span>{language === 'hi' ? 'संपर्क करें' : 'Contact Us'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityPage;
