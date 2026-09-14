import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import ProductCard from '../../components/public/ProductCard';

export const ProductsPage = () => {
  const { tr, t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data?.success) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const name = t(p.name, '').toLowerCase();
    const altName = (language === 'en' ? p.name?.hi : p.name?.en) || '';
    const desc = t(p.shortDescription, '').toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || altName.toLowerCase().includes(q) || desc.includes(q);
  });

  return (
    <div className="py-12 sm:py-16 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
            {language === 'hi' ? 'शुद्ध मसाला संग्रह' : 'Pure Spice Collection'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal mt-3 mb-4">
            {tr('sectionSpicesTitle')}
          </h1>
          <p className="text-sm sm:text-base text-brand-stone">
            {tr('sectionSpicesSubtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="w-5 h-5 text-brand-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tr('searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-border bg-white text-sm focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-brand-border p-8 max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-brand-gold mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">
              {language === 'hi' ? 'कोई मसाला नहीं मिला' : 'No Spices Found'}
            </h3>
            <p className="text-xs text-brand-stone mt-1">
              {language === 'hi'
                ? 'कृपया कोई अन्य खोज शब्द आज़माएं।'
                : 'Try searching with a different spice name or term.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
