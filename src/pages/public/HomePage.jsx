import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

import HeroSection from '../../components/public/HeroSection';
import BrandTrustStrip from '../../components/public/BrandTrustStrip';
import ProductCard from '../../components/public/ProductCard';
import WhyTikhoriSection from '../../components/public/WhyTikhoriSection';
import WomenEmpowermentSection from '../../components/public/WomenEmpowermentSection';
import PromotionalBanner from '../../components/public/PromotionalBanner';
import QualityProcessSection from '../../components/public/QualityProcessSection';
import AboutSection from '../../components/public/AboutSection';
import ContactSection from '../../components/public/ContactSection';

export const HomePage = () => {
  const { tr, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [banner, setBanner] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [prodRes, contentRes, entreRes, bannerRes, settRes] = await Promise.allSettled([
          api.get('/products'),
          api.get('/content'),
          api.get('/entrepreneurs'),
          api.get('/banners'),
          api.get('/settings')
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.data?.success) {
          setProducts(prodRes.value.data.data);
        }
        if (contentRes.status === 'fulfilled' && contentRes.value.data?.success) {
          setContent(contentRes.value.data.data);
        }
        if (entreRes.status === 'fulfilled' && entreRes.value.data?.success) {
          setEntrepreneurs(entreRes.value.data.data);
        }
        if (bannerRes.status === 'fulfilled' && bannerRes.value.data?.success) {
          // Take the first active banner if available
          const banners = bannerRes.value.data.data;
          if (banners && banners.length > 0) {
            setBanner(banners[0]);
          }
        }
        if (settRes.status === 'fulfilled' && settRes.value.data?.success) {
          setSettings(settRes.value.data.data);
        }
      } catch (err) {
        console.error('Error fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection content={content} />

      {/* 2. Trust Indicators Strip */}
      <BrandTrustStrip />

      {/* 3. Products Showcase */}
      <section id="products" className="py-20 bg-brand-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 text-center sm:text-left">
            <div>
              <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
                {language === 'hi' ? 'प्रामाणिक मसाले' : 'Flagship Collection'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3">
                {tr('sectionSpicesTitle')}
              </h2>
              <p className="text-sm sm:text-base text-brand-stone mt-1.5 max-w-xl">
                {tr('sectionSpicesSubtitle')}
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-forest hover:text-brand-forest-light transition-colors py-2 px-4 rounded-full border border-brand-border bg-white shadow-xs"
            >
              <span>{language === 'hi' ? 'सभी उत्पाद देखें' : 'View Full Catalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Tikhori Foods Section */}
      <WhyTikhoriSection content={content} />

      {/* 5. Promotional Poster/Banner (if active) */}
      {banner && <PromotionalBanner banner={banner} />}

      {/* 6. Women Empowerment & Rural Entrepreneurship */}
      <WomenEmpowermentSection content={content} entrepreneurs={entrepreneurs} />

      {/* 7. Quality & Process Journey */}
      <QualityProcessSection content={content} />

      {/* 8. About Tikhori Foods */}
      <AboutSection content={content} />

      {/* 9. Contact & Inquiry Section */}
      <ContactSection settings={settings} />
    </div>
  );
};

export default HomePage;
