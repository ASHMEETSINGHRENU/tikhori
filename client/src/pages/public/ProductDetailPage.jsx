import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Package,
  Layers,
  Flame,
  Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import Badge from '../../components/common/Badge';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, tr, language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/products/slug/${slug}`);
        if (res.data?.success) {
          setProduct(res.data.data);
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-ivory py-20">
        <div className="max-w-md mx-auto text-center px-4 bg-white p-8 rounded-3xl border border-brand-border shadow-soft">
          <Info className="w-10 h-10 text-brand-gold mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
            {language === 'hi' ? 'उत्पाद नहीं मिला' : 'Product Not Found'}
          </h2>
          <p className="text-sm text-brand-stone mb-6">
            {language === 'hi'
              ? 'यह उत्पाद उपलब्ध नहीं है अथवा हटा दिया गया है।'
              : 'The product you are looking for is currently unavailable or has been moved.'}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-forest text-white text-xs font-semibold tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tr('ctaBackToProducts')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const productName = t(product.name, 'Organic Spice');
  const alternateName = language === 'en' ? product.name?.hi : product.name?.en;
  const shortDesc = t(product.shortDescription, '');
  const description = t(product.description, '');
  const usage = t(product.usage, '');
  const storage = t(product.storage, '');
  const packaging = t(product.packaging, '');

  const ingredients = product.ingredients?.[language] || product.ingredients?.en || [];
  const benefits = product.benefits?.[language] || product.benefits?.en || [];
  const features = product.features || [];

  return (
    <div className="py-10 sm:py-16 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back breadcrumb button */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-stone hover:text-brand-forest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tr('ctaBackToProducts')}</span>
          </Link>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl border border-brand-border/90 p-8 sm:p-12 shadow-soft flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={productName}
                className="h-80 sm:h-96 w-auto object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Information & Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {features.map((feat, idx) => (
                <Badge key={idx} variant={idx === 0 ? 'forest' : 'neutral'} size="xs">
                  {feat}
                </Badge>
              ))}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest leading-tight">
                {productName}
              </h1>
              {alternateName && (
                <p className="text-base font-serif font-bold text-brand-gold-dark mt-1">
                  {alternateName}
                </p>
              )}
            </div>

            {/* Short Description */}
            {shortDesc && (
              <p className="text-base sm:text-lg text-brand-charcoal/90 font-medium leading-relaxed">
                {shortDesc}
              </p>
            )}

            {/* Detailed Description */}
            {description && (
              <div className="text-sm text-brand-stone leading-relaxed border-t border-brand-border/80 pt-4">
                <p>{description}</p>
              </div>
            )}

            {/* Key Benefits List */}
            {benefits && benefits.length > 0 && (
              <div className="p-6 rounded-2xl bg-brand-sand/60 border border-brand-border/80 space-y-3">
                <h3 className="font-serif text-base font-bold text-brand-charcoal flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold-dark" />
                  <span>{tr('benefitsLabel')}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-brand-stone">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order / Inquiry Action Box */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to={`/contact?subject=Order Inquiry: ${productName}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-forest text-white text-sm font-semibold tracking-wide hover:bg-brand-forest-light transition-all shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{tr('ctaOrderEnquiry')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Secondary Tabs / Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-brand-border">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-soft">
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-forest" />
              <span>{tr('ingredientsLabel')}</span>
            </h4>
            {ingredients && ingredients.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-brand-stone">
                {ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-forest"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-brand-stone italic">100% Pure single-source organic spice</p>
            )}
          </div>

          {/* Usage Instructions */}
          <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-soft">
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-brand-red" />
              <span>{tr('usageLabel')}</span>
            </h4>
            <p className="text-xs text-brand-stone leading-relaxed">
              {usage || (language === 'hi' ? 'स्वादानुसार व्यंजनों में उपयोग करें।' : 'Add according to heat and aroma preferences during cooking.')}
            </p>
          </div>

          {/* Storage Information */}
          <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-soft">
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
              <span>{tr('storageLabel')}</span>
            </h4>
            <p className="text-xs text-brand-stone leading-relaxed">
              {storage || (language === 'hi' ? 'ठंडी और सूखी जगह पर रखें।' : 'Store in a cool dry place inside an airtight container away from light.')}
            </p>
          </div>

          {/* Packaging Information */}
          <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-soft">
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-forest" />
              <span>{tr('packagingLabel')}</span>
            </h4>
            <p className="text-xs text-brand-stone leading-relaxed">
              {packaging || (language === 'hi' ? 'खुशबू और ताजगी सुरक्षित रखने वाले विशेष पाउच में उपलब्ध।' : 'Packaged in multi-layer aroma-lock pouch preventing moisture ingress.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
