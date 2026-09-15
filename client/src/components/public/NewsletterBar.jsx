import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Section 7 — Newsletter Signup Bar
 * Reference: DOCS/tikhori-foods-design-spec.md
 * - Background: Forest Green (#1B4D2E)
 * - Content: Short headline + email input + Golden Yellow accent submit button
 */
export const NewsletterBar = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-[#1B4D2E] text-[#FDF6E9] py-10 px-4 sm:px-6 lg:px-8 border-t border-[#123620]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Short Headline */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#F2C230] text-[#1B4D2E] items-center justify-center flex-shrink-0 shadow-md">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2C230]">
              {language === 'hi' ? 'सीधा इनबॉक्स में' : 'STAY SPICED & INFORMED'}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#FDF6E9] mt-0.5">
              {language === 'hi'
                ? 'ताजा फसल की खबरें और विशेष रेसिपी पाएं'
                : 'Get Harvest Updates & Regional Recipe Drops'}
            </h3>
          </div>
        </div>

        {/* Right Side: Email Input Form */}
        <div className="w-full md:w-auto md:min-w-[420px]">
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-full border border-[#F2C230]/40 text-xs font-bold text-[#F2C230]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'धन्यवाद! आप सफलतापूर्वक जुड़ गए हैं।' : 'Thank you! You are now subscribed.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-full p-1.5 shadow-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'hi' ? 'अपना ईमेल पता दर्ज करें...' : 'Enter your email for updates...'}
                className="w-full bg-transparent px-4 py-2 text-xs sm:text-sm text-[#2B1D14] placeholder-[#8C7C72] outline-none font-medium"
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F2C230] text-[#1B4D2E] text-xs font-black tracking-wider uppercase hover:bg-[#D4A21A] transition-colors shadow-xs active:scale-95"
              >
                <span>{language === 'hi' ? 'जुड़ें' : 'SIGN UP'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBar;
