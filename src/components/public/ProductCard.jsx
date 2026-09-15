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
    <div className="group rounded-3xl bg-white border-2 border-[#E8DFCF] hover:border-[#1B4D2E] p-5 sm:p-6 transition-all duration-400 ease-spring hover:shadow-2xl hover:-translate-y-2.5 flex flex-col justify-between h-full">
      <div>
        {/* Top Feature Pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="forest" size="xs">
            {features[0] || (language === 'hi' ? '१००% जैविक' : '100% Organic')}
          </Badge>
          {features.length > 1 && (
            <span className="text-[10px] font-black text-[#5A483E] uppercase tracking-wider">
              {features[1]}
            </span>
          )}
        </div>

        {/* Product Image Stage with Smooth Scale */}
        <div className="relative py-6 px-4 bg-[#FDF6E9] rounded-2xl mb-5 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={productName}
            className="h-52 sm:h-60 w-auto object-contain transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-1 filter drop-shadow-md"
            loading="lazy"
          />
        </div>

        {/* Product Names */}
        <h3 className="font-display text-xl sm:text-2xl font-black text-[#1B4D2E] group-hover:text-[#D6301F] transition-colors mb-1">
          {productName}
        </h3>

        {/* Subtitle in the alternate language for cultural depth */}
        <p className="text-xs font-bold text-[#D4A21A] mb-3">
          {language === 'en' ? product.name?.hi : product.name?.en}
        </p>

        {/* Short description */}
        <p className="text-sm text-[#5A483E] line-clamp-2 leading-relaxed mb-4">
          {productShortDesc}
        </p>
      </div>

      {/* Footer / CTA */}
      <div className="pt-4 border-t border-[#E8DFCF] flex items-center justify-between">
        <span className="text-xs text-[#5A483E] font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C230]" />
          <span>{language === 'hi' ? 'शुद्ध मसाला' : 'Pure Spice'}</span>
        </span>

        <Link
          to={`/products/${product.slug}`}
          className="btn-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-wider uppercase hover:bg-[#D6301F] group-hover:shadow-xs transition-all duration-300"
        >
          <span>{tr('ctaViewDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
