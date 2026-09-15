import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

// Full-bleed Color Block Sections per DOCS/tikhori-foods-design-spec.md
import HeroSection from '../../components/public/HeroSection';
import OriginStorySection from '../../components/public/OriginStorySection';
import ProductShowcaseSection from '../../components/public/ProductShowcaseSection';
import StockistLocatorSection from '../../components/public/StockistLocatorSection';
import WhyTikhoriSection from '../../components/public/WhyTikhoriSection';
import SpiceClubSection from '../../components/public/SpiceClubSection';
import NewsletterBar from '../../components/public/NewsletterBar';
import DecorativePatternStrip from '../../components/common/DecorativePatternStrip';
import PromotionalBanner from '../../components/public/PromotionalBanner';

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
      {/* Section 1 — Hero (Background: Cream #FDF6E9) */}
      <HeroSection content={content} />

      {/* Decorative Spice/Chili Pattern Strip */}
      <DecorativePatternStrip variant="cream" />

      {/* Section 2 — Origin Story (Background: Forest Green #1B4D2E, Full-Bleed) */}
      <OriginStorySection content={content} />

      {/* Optional Promotional Banner from CMS if active */}
      {banner && <PromotionalBanner banner={banner} />}

      {/* Section 3 — Product Showcase (Background: Golden Yellow #F2C230, Full-Bleed) */}
      <ProductShowcaseSection products={products} />

      {/* Decorative Spice/Chili Pattern Strip */}
      <DecorativePatternStrip variant="gold" />

      {/* Section 4 — Stockist / Where to Buy (Background: Cream #FDF6E9) */}
      <StockistLocatorSection />

      {/* Section: The 5 Core Purity Pillars (Why Tikhori) */}
      <WhyTikhoriSection content={content} />

      {/* Section 5 — Loyalty / Spice Club Perks (Split Block: Green + Golden Yellow) */}
      <SpiceClubSection />

      {/* Section 6 — Decorative Divider Strip */}
      <DecorativePatternStrip variant="forest" />

      {/* Section 7 — Newsletter Signup Bar (Forest Green #1B4D2E) */}
      <NewsletterBar />
    </div>
  );
};

export default HomePage;
