import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Gift, Award, Flame } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../common/ScallopedBadge';

/**
 * Section 5 — Loyalty / Spice Club Perks
 * Reference: DOCS/tikhori-foods-design-spec.md
 * - Split block: Forest Green (#1B4D2E) on left + Golden Yellow (#F2C230) on right
 * - Content: "Join the Spice Club", perks copy, CTA button
 */
export const SpiceClubSection = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setJoined(true);
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Split Block: Forest Green (#1B4D2E) */}
        <div className="lg:col-span-7 bg-[#1B4D2E] text-[#FDF6E9] p-8 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2C230]/20 border border-[#F2C230]/30 text-[#F2C230] text-xs font-black tracking-[0.2em] uppercase w-fit">
            <Flame className="w-3.5 h-3.5 text-[#F2C230]" />
            <span>{language === 'hi' ? 'विशेष क्लब' : 'THE SPICE CLUB'}</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#FDF6E9] tracking-tight leading-[1.12]">
            {language === 'hi' ? (
              <>
                टिखोरी स्पाइस क्लब से जुड़ें और पाएं <span className="text-[#F2C230] italic font-serif">विशेष लाभ</span>
              </>
            ) : (
              <>
                JOIN THE TIKHORI <span className="text-[#F2C230] italic font-serif">SPICE CLUB</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#FDF6E9]/85 leading-relaxed max-w-xl">
            {language === 'hi'
              ? 'सच्चे भोजन प्रेमियों और घरेलू रसोइयों का परिवार। ताजी फसलों के पहले बैच, प्रामाणिक क्षेत्रीय रेसिपी और विशेष छूट का लाभ उठाएं।'
              : 'Become part of our inner kitchen circle. Savor first access to new seasonal harvest pressings, heirloom regional recipes, and exclusive kitchen member discounts.'}
          </p>

          {/* 3 Perks List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-[#F2C230]/20 text-[#F2C230] mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FDF6E9]">
                  {language === 'hi' ? 'ताजी फसल का पहला संकलन' : 'First-Press Seasonal Harvest Batches'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70">
                  {language === 'hi' ? 'सदस्यों के लिए आरक्षित विशेष बैच' : 'Priority reservation on limited seasonal milling before public release'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-[#F2C230]/20 text-[#F2C230] mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FDF6E9]">
                  {language === 'hi' ? 'पारंपरिक गुप्त रेसिपीज' : 'Heirloom Culinary Secret Recipes'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70">
                  {language === 'hi' ? 'मास्टर शेफ्स द्वारा तैयार मसालेदार व्यंजन' : 'Regional spice pairing cards, marinade guides & slow-cook tips'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-[#F2C230]/20 text-[#F2C230] mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FDF6E9]">
                  {language === 'hi' ? 'सदस्य विशेषाधिकार व छूट' : 'Special Member Pricing & Zero Delivery Fee'}
                </h4>
                <p className="text-xs text-[#FDF6E9]/70">
                  {language === 'hi' ? 'हर ऑर्डर पर विशेष लाभ' : 'VIP discounts on recurring pantry essentials and bulk packs'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D6301F] text-[#FDF6E9] text-sm font-black tracking-widest uppercase hover:bg-[#B72416] transition-all shadow-md active:scale-95 group w-fit"
            >
              <span>{language === 'hi' ? 'आज ही क्लब में शामिल हों' : 'JOIN THE CLUB — FREE'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Split Block: Golden Yellow (#F2C230) */}
        <div className="lg:col-span-5 bg-[#F2C230] text-[#2B1D14] p-8 sm:p-14 lg:p-16 flex flex-col justify-center items-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D4A21A]">
          {/* Subtle background ring */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-4 border-[#D4A21A]/30 pointer-events-none"></div>

          <div className="w-full max-w-sm bg-[#FDF6E9] p-8 rounded-3xl border-2 border-[#1B4D2E] shadow-2xl relative space-y-6 text-center">
            {/* Scalloped VIP Stamp Badge */}
            <div className="absolute -top-7 right-6">
              <ScallopedBadge
                textTop="CLUB"
                textMain="VIP"
                textSub="MEMBER"
                variant="red"
                size="sm"
                rotate={12}
              />
            </div>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1B4D2E] text-[#F2C230] mx-auto shadow-md">
              <Gift className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D6301F]">
                {language === 'hi' ? 'स्वागत उपहार' : 'INSTANT WELCOME REWARD'}
              </span>
              <h3 className="font-display text-2xl font-black text-[#1B4D2E] mt-1">
                {language === 'hi' ? 'पहले ऑर्डर पर १५% की छूट' : '15% Off Your First Order'}
              </h3>
              <p className="text-xs text-[#5A483E] mt-1.5 leading-relaxed">
                {language === 'hi'
                  ? 'अपना ईमेल दर्ज करें और अपने इनबॉक्स में तुरंत वेलकम डिस्काउंट कोड प्राप्त करें।'
                  : 'Subscribe your email to receive your instant welcome discount code and seasonal spice guide.'}
              </p>
            </div>

            {joined ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{language === 'hi' ? 'स्वागत है! आपका कोड भेज दिया गया है।' : 'Welcome to the club! Check your inbox for code.'}</span>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें...' : 'Enter your email address...'}
                  className="w-full px-4 py-3 rounded-full bg-white border border-[#E8DFCF] text-xs text-[#2B1D14] placeholder-[#8C7C72] outline-none focus:border-[#1B4D2E] shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full bg-[#1B4D2E] text-[#FDF6E9] text-xs font-black tracking-widest uppercase hover:bg-[#25663D] transition-colors shadow-xs active:scale-95"
                >
                  {language === 'hi' ? 'कोड प्राप्त करें' : 'CLAIM MY 15% VOUCHER'}
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#8C7C72] tracking-wide">
              {language === 'hi' ? 'शून्य स्पैम। किसी भी समय अनसब्सक्राइब करें।' : 'No spam. Unsubscribe anytime with 1 click.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiceClubSection;
