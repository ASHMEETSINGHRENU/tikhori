import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';

/**
 * Section 2 — Origin Story
 * Reference: DOCS/tikhori-foods-design-spec.md
 * - Background: Forest Green (#1B4D2E), full-bleed
 * - Eyebrow: Golden Yellow (#F2C230) all-caps, tracked out (WHERE IT ALL STARTED)
 * - Headline: Large Cream display headline
 * - Visual: Split layout with patterned plate and circular scalloped origin badge
 * - CTA: Golden Yellow (#F2C230) pill button
 */
export const OriginStorySection = ({ content }) => {
  const { t, language } = useLanguage();
  const about = content?.about || {};

  return (
    <section id="origin-story" className="relative overflow-hidden bg-[#1B4D2E] text-[#FDF6E9] py-20 md:py-28 lg:py-36">
      {/* Subtle background decorative spice rings */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full border-2 border-[#F2C230]/10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full border-2 border-[#F2C230]/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Golden Yellow Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2C230]/15 border border-[#F2C230]/30 text-[#F2C230] text-xs font-black tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'हमारी शुरुआत' : 'WHERE IT ALL STARTED'}</span>
            </div>

            {/* Large Cream Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#FDF6E9] tracking-tight leading-[1.12]">
              {language === 'hi' ? (
                <>
                  मिट्टी की सौंधी सुगंध और <span className="text-[#F2C230] italic font-serif">पारंपरिक कारीगरी</span>
                </>
              ) : (
                <>
                  ROOTED IN THE HEARTLAND OF <span className="text-[#F2C230] italic font-serif">HONEST SPICES</span>
                </>
              )}
            </h2>

            {/* Supporting Story Paragraph */}
            <p className="text-base sm:text-lg text-[#FDF6E9]/85 leading-relaxed">
              {t(
                about.story,
                language === 'hi'
                  ? 'टिखोरी फूड्स की शुरुआत एक सरल संकल्प के साथ हुई: भारतीय रसोई को उसकी शुद्धतम जड़ों से जोड़ना। हम कृत्रिम रंगों, रसायनों और तीव्र हीटिंग वाली आधुनिक पिसाई के शॉर्टकट को नकारते हैं, और चुनते हैं पारंपरिक धीमी पिसाई जिससे मसालों का प्राकृतिक तेल और सौंधी महक हमेशा सुरक्षित रहे।'
                  : 'Tikhori Foods was founded with a single mission: to return Indian cooking to its purest roots. We reject shortcuts, artificial dyes, and ultra-high-heat industrial mills in favor of authentic cold stone grinding, preserving the vital essential oils that define true home taste.'
              )}
            </p>

            {/* 3 Heritage Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#123620] p-4 rounded-2xl border border-[#F2C230]/20">
                <span className="text-[#F2C230] text-xl font-bold font-display">01</span>
                <h4 className="text-sm font-bold text-[#FDF6E9] mt-1">
                  {language === 'hi' ? 'सीधा जैविक स्रोत' : 'Direct Organic Sourcing'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70 mt-1">
                  {language === 'hi' ? 'बिना रासायनिक कीटनाशक' : 'Zero synthetic pesticides'}
                </p>
              </div>

              <div className="bg-[#123620] p-4 rounded-2xl border border-[#F2C230]/20">
                <span className="text-[#F2C230] text-xl font-bold font-display">02</span>
                <h4 className="text-sm font-bold text-[#FDF6E9] mt-1">
                  {language === 'hi' ? 'हाथ से डंठल निकालना' : 'Manual Destemming'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70 mt-1">
                  {language === 'hi' ? 'कड़वाहट मुक्त प्रामाणिक रंग' : 'Pure vibrant natural hue'}
                </p>
              </div>

              <div className="bg-[#123620] p-4 rounded-2xl border border-[#F2C230]/20">
                <span className="text-[#F2C230] text-xl font-bold font-display">03</span>
                <h4 className="text-sm font-bold text-[#FDF6E9] mt-1">
                  {language === 'hi' ? 'धीमी पत्थर पिसाई' : 'Slow Stone-Ground'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70 mt-1">
                  {language === 'hi' ? 'प्राकृतिक तेल व खुशबू' : 'Locks in volatile aromatics'}
                </p>
              </div>
            </div>

            {/* CTA Button in Golden Yellow */}
            <div className="pt-4">
              <Link
                to="/quality"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F2C230] text-[#1B4D2E] text-sm font-black tracking-widest uppercase hover:bg-[#D4A21A] transition-all shadow-md active:scale-95 group"
              >
                <span>{language === 'hi' ? 'हमारी गुणवत्ता यात्रा जानें' : 'DISCOVER OUR PROCESS'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Split Visual on Patterned Plate with Scalloped Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Patterned Frame / Plate Background */}
              <div className="relative rounded-3xl p-5 sm:p-6 bg-[#123620] border-2 border-[#F2C230]/30 shadow-2xl overflow-hidden">
                {/* Vintage Scrapbook Styling Plate */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FDF6E9] p-4 sm:p-6 text-center transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative">
                    <img
                      src="/assets/products/product-2.png"
                      alt="Stone Ground Haldi"
                      className="h-60 sm:h-72 w-auto mx-auto object-contain drop-shadow-xl"
                    />

                    {/* Circular Scalloped Badge Overlaying the Photo */}
                    <div className="absolute -top-3 -right-3 sm:-right-4">
                      <ScallopedBadge
                        textTop="STONE"
                        textMain="SLOW"
                        textSub="MILLED"
                        variant="yellow"
                        size="md"
                        rotate={-12}
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DFCF]">
                    <p className="text-xs font-bold text-[#1B4D2E] tracking-wider uppercase">
                      {language === 'hi' ? '१००% जैविक हल्दी पाउडर' : 'Turmeric Rhizome Cold Milling'}
                    </p>
                    <p className="text-[11px] text-[#5A483E] mt-0.5">
                      {language === 'hi' ? 'उच्च करक्यूमिन युक्त प्राकृतिक सुगंध' : 'High Curcumin & Natural Earthy Aroma'}
                    </p>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#F2C230] px-2 font-bold uppercase tracking-wider">
                  <span>✦ Heritage Craft</span>
                  <span>Pure Quality ✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStorySection;
