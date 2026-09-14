import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Badge from '../common/Badge';

export const ProductCard = ({ product }) => {
  const { t, tr, language } = useLanguage();

  if (!product) return null;

  const productName = t(product.name, 'Organic Spice');
  const productShortDesc = t(product.shortDescription, '');
  const features = product.features || [];

  return (
    <div className="group rounded-3xl bg-white border border-brand-border/90 p-5 sm:p-6 transition-all duration-300 hover:shadow-soft-lg hover:border-brand-forest/40 flex flex-col justify-between h-full">
      <div>
        {/* Top Feature Pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="forest" size="xs">
            {features[0] || (language === 'hi' ? '१००% जैविक' : '100% Organic')}
          </Badge>
          {features.length > 1 && (
            <span className="text-[10px] font-semibold text-brand-stone uppercase tracking-wider">
              {features[1]}
            </span>
          )}
        </div>

        {/* Product Image Stage */}
        <div className="relative py-6 px-4 bg-brand-sand/40 rounded-2xl mb-5 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={productName}
            className="h-52 sm:h-60 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md"
            loading="lazy"
          />
        </div>

        {/* Product Names */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors mb-1">
          {productName}
        </h3>

        {/* Subtitle in the alternate language for cultural depth */}
        <p className="text-xs font-semibold text-brand-gold-dark mb-3">
          {language === 'en' ? product.name?.hi : product.name?.en}
        </p>

        {/* Short description */}
        <p className="text-sm text-brand-stone line-clamp-2 leading-relaxed mb-4">
          {productShortDesc}
        </p>
      </div>

      {/* Footer / CTA */}
      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
        <span className="text-xs text-brand-stone font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>{language === 'hi' ? 'शुद्ध मसाला' : 'Pure Spice'}</span>
        </span>

        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-forest hover:text-brand-forest-light group-hover:translate-x-0.5 transition-all"
        >
          <span>{tr('ctaViewDetails')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
