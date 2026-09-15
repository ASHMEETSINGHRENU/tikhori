import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Navigation, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';

/**
 * Section 4 — Stockist / Where to Buy
 * Reference: DOCS/tikhori-foods-design-spec.md
 * - Background: Cream (#FDF6E9)
 * - Content: "Find Tikhori Near You", postcode/city search input, "Use My Location"
 * - Imagery: Product card with scalloped badge ("Small-Batch Ground Fresh")
 */
export const StockistLocatorSection = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');

  const stockists = [
    {
      id: 1,
      name: 'Sharma Organic & Spices',
      city: 'Pune',
      area: 'Kothrud, Pune, Maharashtra 411038',
      phone: '+91 98111 22334',
      type: 'Verified Retailer',
      inStock: ['Red Chilli', 'Turmeric', 'Coriander']
    },
    {
      id: 2,
      name: 'Sahyadri Farm Fresh Bazaar',
      city: 'Satara',
      area: 'Main Highway Road, Satara, Maharashtra 415001',
      phone: '+91 98220 55412',
      type: 'Regional Flagship',
      inStock: ['Red Chilli', 'Turmeric', 'Kaala Masala']
    },
    {
      id: 3,
      name: 'Nature Basket Organic Hub',
      city: 'Mumbai',
      area: 'Bandra West, Mumbai, Maharashtra 400050',
      phone: '+91 98334 77890',
      type: 'Premium Gourmet',
      inStock: ['All 4 Spices']
    },
    {
      id: 4,
      name: 'Pure Roots Kitchen Store',
      city: 'Bengaluru',
      area: 'Indiranagar 100ft Road, Bengaluru, Karnataka 560038',
      phone: '+91 98450 11223',
      type: 'Organic Partner',
      inStock: ['All 4 Spices']
    },
    {
      id: 5,
      name: 'Dilli Spice & Herb Mart',
      city: 'Delhi',
      area: 'Connaught Place, New Delhi 110001',
      phone: '+91 98100 99887',
      type: 'Wholesale Partner',
      inStock: ['Bulk Packs Available']
    }
  ];

  const filteredStockists = stockists.filter((s) => {
    const matchesRegion = activeRegion === 'all' || s.city.toLowerCase() === activeRegion.toLowerCase();
    const matchesQuery = searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  const handleUseLocation = () => {
    setActiveRegion('Pune');
    setSearchQuery('Pune');
  };

  return (
    <section id="stockists" className="relative overflow-hidden bg-[#FDF6E9] py-20 md:py-28 lg:py-36 border-b border-[#E8DFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Search & Store List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-xs font-black tracking-[0.2em] uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#D6301F]" />
              <span>{language === 'hi' ? 'स्टोर खोजें' : 'WHERE TO BUY'}</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4D2E] tracking-tight leading-[1.12]">
              {language === 'hi' ? (
                <>
                  अपने नज़दीकी स्टोर में <span className="text-[#D6301F] italic font-serif">टिखोरी खोजें</span>
                </>
              ) : (
                <>
                  FIND TIKHORI <span className="text-[#D6301F] italic font-serif">NEAR YOU</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed max-w-2xl">
              {language === 'hi'
                ? 'हमारे ताजे और प्रामाणिक मसाले भारत भर के चुनिंदा जैविक स्टोर्स और किराना पार्टनर्स पर उपलब्ध हैं। अपना पिनकोड या शहर दर्ज करें।'
                : 'Experience single-origin, stemless spices in your kitchen today. Locate certified partner stores, organic retailers, and distribution centers near you.'}
            </p>

            {/* Search Input Bar */}
            <div className="pt-2">
              <div className="relative flex items-center bg-white border-2 border-[#1B4D2E] rounded-full p-1.5 shadow-sm max-w-xl">
                <Search className="w-5 h-5 text-[#5A483E] ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'पिनकोड या शहर दर्ज करें (उदा. 411038 या Pune)...' : 'Enter Pincode or City (e.g. 411038 or Pune)...'}
                  className="w-full bg-transparent px-3 py-2 text-sm text-[#2B1D14] placeholder-[#8C7C72] outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="flex-shrink-0 px-6 py-2.5 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-wider uppercase hover:bg-[#25663D] transition-colors"
                >
                  {language === 'hi' ? 'खोजें' : 'SEARCH'}
                </button>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold text-[#1B4D2E]">
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFCF] hover:border-[#1B4D2E] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D6301F]" />
                  <span>{language === 'hi' ? 'मेरी लोकेशन का उपयोग करें' : 'Use My Location'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {['all', 'Pune', 'Mumbai', 'Satara', 'Delhi'].map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => {
                        setActiveRegion(reg);
                        setSearchQuery(reg === 'all' ? '' : reg);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        activeRegion.toLowerCase() === reg.toLowerCase()
                          ? 'bg-[#1B4D2E] text-[#FDF6E9]'
                          : 'bg-white border border-[#E8DFCF] text-[#5A483E] hover:border-[#1B4D2E]'
                      }`}
                    >
                      {reg === 'all' ? (language === 'hi' ? 'सभी स्टोर' : 'All Stores') : reg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredStockists.length > 0 ? (
                filteredStockists.map((store) => (
                  <div
                    key={store.id}
                    className="p-5 rounded-2xl bg-white border-2 border-[#E8DFCF] hover:border-[#1B4D2E] transition-all shadow-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-[#1B4D2E] text-base">
                        {store.name}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F2C230]/30 text-[#1B4D2E] border border-[#F2C230]">
                        {store.type}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A483E] flex items-start gap-1.5 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-[#D6301F] flex-shrink-0 mt-0.5" />
                      <span>{store.area}</span>
                    </p>

                    <p className="text-xs text-[#5A483E] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#1B4D2E] flex-shrink-0" />
                      <span className="font-semibold">{store.phone}</span>
                    </p>

                    <div className="pt-2 border-t border-[#E8DFCF] flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'hi' ? 'स्टॉक उपलब्ध' : 'In Stock'}
                      </span>
                      <span className="text-[#8C7C72]">{store.inStock.join(', ')}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 rounded-2xl bg-white border border-[#E8DFCF] text-center">
                  <p className="text-sm font-semibold text-[#5A483E]">
                    {language === 'hi' ? 'इस क्षेत्र में कोई स्टोर नहीं मिला। ऑनलाइन ऑर्डर करें।' : 'No physical stockist found in this exact radius.'}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-[#D6301F] underline"
                  >
                    <span>{language === 'hi' ? 'हमारे सभी उत्पाद ऑनलाइन देखें' : 'Order Direct from Online Catalog'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Promotional Card with Scalloped Sunburst Badge */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-[#1B4D2E] text-[#FDF6E9] p-6 sm:p-8 border-2 border-[#F2C230]/40 shadow-xl text-center space-y-6">
              <div className="relative inline-block mx-auto">
                <img
                  src="/assets/products/product-1.png"
                  alt="Small-Batch Ground Fresh"
                  className="h-52 w-auto object-contain mx-auto drop-shadow-2xl"
                />

                {/* Overlaid Scalloped Badge */}
                <div className="absolute -top-4 -right-4">
                  <ScallopedBadge
                    textTop="FRESH"
                    textMain="BATCH"
                    textSub="GROUND"
                    variant="yellow"
                    size="md"
                    rotate={8}
                  />
                </div>
              </div>

              <div className="border-t border-[#F2C230]/30 pt-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2C230]">
                  {language === 'hi' ? 'व्यापारिक अवसर' : 'WHOLESALE & RETAIL'}
                </span>
                <h3 className="font-display text-xl font-black text-[#FDF6E9] mt-1">
                  {language === 'hi' ? 'टिखोरी के अधिकृत पार्टनर बनें' : 'Become a Stockist Partner'}
                </h3>
                <p className="text-xs text-[#FDF6E9]/80 mt-2 leading-relaxed">
                  {language === 'hi'
                    ? 'अपने स्टोर पर १००% जैविक और शुद्ध भारतीय मसाले जोड़ें। आकर्षक व्यापारिक मार्जिन और समर्पित सप्लाई।'
                    : 'Supply your gourmet customers with stemless, stone-ground purity. Enjoy reliable bulk distribution & wholesale support.'}
                </p>

                <Link
                  to="/contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#F2C230] text-[#1B4D2E] text-xs font-black tracking-widest uppercase hover:bg-[#D4A21A] transition-colors shadow-md active:scale-95"
                >
                  <span>{language === 'hi' ? 'पार्टनरशिप पूछताछ' : 'INQUIRE FOR STOCK'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockistLocatorSection;
