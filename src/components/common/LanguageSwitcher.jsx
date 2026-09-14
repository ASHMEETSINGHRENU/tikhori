import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ variant = 'default', className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 border transition-all duration-200 ${
        variant === 'dark'
          ? 'bg-brand-forest-dark border-brand-forest-light text-brand-ivory'
          : 'bg-white/80 border-brand-border text-brand-charcoal shadow-sm'
      } ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <Globe className="w-3.5 h-3.5 ml-2 mr-1 opacity-70" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-150 ${
          language === 'en'
            ? 'bg-brand-forest text-white shadow-sm'
            : 'text-brand-stone hover:text-brand-charcoal hover:bg-black/5'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span className="text-brand-stone/40 text-xs px-0.5">|</span>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-150 ${
          language === 'hi'
            ? 'bg-brand-forest text-white shadow-sm'
            : 'text-brand-stone hover:text-brand-charcoal hover:bg-black/5'
        }`}
        aria-pressed={language === 'hi'}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
