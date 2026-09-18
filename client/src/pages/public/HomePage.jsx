import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

// Public Sections
import HeroSection from '../../components/public/HeroSection';
import AboutSection from '../../components/public/AboutSection';
import OriginStorySection from '../../components/public/OriginStorySection';
import ProductShowcaseSection from '../../components/public/ProductShowcaseSection';
import WhyTikhoriSection from '../../components/public/WhyTikhoriSection';
import PurityPromiseSection from '../../components/public/PurityPromiseSection';
import QualityProcessSection from '../../components/public/QualityProcessSection';
import WomensEmpowermentSection from '../../components/public/WomensEmpowermentSection';
import StockistLocatorSection from '../../components/public/StockistLocatorSection';
import SpiceClubSection from '../../components/public/SpiceClubSection';
import PromotionalBanner from '../../components/public/PromotionalBanner';
import NewsletterBar from '../../components/public/NewsletterBar';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';

export const HomePage = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState({});
  const [banner, setBanner] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [prodRes, contentRes, bannerRes, settRes] = await Promise.allSettled([
          api.get('/products'),
          api.get('/content'),
          api.get('/banners'),
          api.get('/settings')
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.data?.success) {
          setProducts(prodRes.value.data.data);
        }
        if (contentRes.status === 'fulfilled' && contentRes.value.data?.success) {
          setContent(contentRes.value.data.data);
        }
        if (bannerRes.status === 'fulfilled' && bannerRes.value.data?.success) {
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
    <div className="space-y-0 w-full overflow-hidden">
      {/* 1. Main Hero (Panoramic Artwork ygkm7pygkm7pygkm.png) */}
      <HeroSection content={content} />

      {/* 2. Heritage / About Section (Archival Sorting lkzooilkzooilkzo.png) */}
      <AboutSection content={content} />

      {/* 3. Decorative Botanical Pattern Divider */}
      <DecorativePatternStrip variant="botanical" />

      {/* 4. Origin / Farm-to-Kitchen Story (Plantation to Board hh4m7uhh4m7uhh4m.png) */}
      <OriginStorySection content={content} />

      {/* Optional Promotional Banner from CMS if active */}
      {banner && <PromotionalBanner banner={banner} />}

      {/* 5. Product Showcase (4-Spice Arrangement h4jzeh4jzeh4jzeh.png + Cards) */}
      <ProductShowcaseSection products={products} />

      {/* 6. Decorative Block-Print Paisley Divider */}
      <DecorativePatternStrip variant="paisley" />

      {/* 7. Why Tikhori — 5 Trust Pillars (Parchment Texture ssi9gpssi9gpssi9.png) */}
      <WhyTikhoriSection content={content} />

      {/* 8. Purity Promise (Deckle Border Banner f7xarsf7xarsf7xa.png) */}
      <PurityPromiseSection />

      {/* 9. Quality Process (4-Step Manufacturing Journey e1css7e1css7e1cs.png) */}
      <QualityProcessSection content={content} />

      {/* 10. Decorative Botanical Pattern Divider */}
      <DecorativePatternStrip variant="botanical" />

      {/* 11. Special Section: Women's Empowerment Journey (Artwork uv69bfuv69bfuv69.png) */}
      <WomensEmpowermentSection />

      {/* 12. Stockist Locator / Retail Partners (Apothecary 6vejnf6vejnf6vej.png) */}
      <StockistLocatorSection />

      {/* 13. Spice Club / VIP Loyalty (Indian Culinary Feast ptxa53ptxa53ptxa.png) */}
      <SpiceClubSection />

      {/* 14. Newsletter Bar */}
      <NewsletterBar />
    </div>
  );
};

export default HomePage;
