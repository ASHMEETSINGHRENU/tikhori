import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import DecorativePatternStrip from './DecorativePatternStrip';

/**
 * Section: Global Footer
 * Topped with an authentic botanical pattern border
 * - Background: Cream (#FDF6E9)
 * - Text color: Forest Green (#1B4D2E)
 * - Navigation columns, Flagship range, and contact coordinates
 */
export const Footer = ({ settings, content }) => {
  const { t, tr, language } = useLanguage();

  const footerContent = content?.footer || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDF6E9] text-[#1B4D2E] border-t-2 border-[#E8DFCF]">
      {/* Decorative Botanical Border across the top of footer */}
      <DecorativePatternStrip variant="botanical" height="sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#E8DFCF]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/logo/logo.png"
                alt="Tikhori Foods"
                className="h-12 w-12 object-contain"
              />
              <div>
                <span className="font-display font-black text-2xl text-[#1B4D2E] tracking-tight">
                  Tikhori Foods
                </span>
                <p className="text-[11px] font-black text-[#D4A21A] uppercase tracking-[0.2em]">
                  {t(settings?.tagline, 'SPICE CRAFTED RIGHT')}
                </p>
              </div>
            </Link>

            <p className="text-sm text-[#5A483E] leading-relaxed">
              {t(
                footerContent.brandStatement,
                language === 'hi'
                  ? 'शुद्ध, १००% जैविक भारतीय मसाले, पारंपरिक तरीके से धीमी पिसाई और बिना किसी मिलावट के तैयार।'
                  : 'Pure, 100% organic Indian spices crafted with traditional slow stone-grinding integrity, zero chemicals, and uncompromised purity for authentic home cooking.'
              )}
            </p>

            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-black text-[#1B4D2E] uppercase tracking-wider mb-4">
              {language === 'hi' ? 'त्वरित लिंक' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link to="/" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {tr('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {tr('navProducts')}
                </Link>
              </li>
              <li>
                <Link to="/quality" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {tr('navQuality')}
                </Link>
              </li>
              <li>
                <a href="/#stockists" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {language === 'hi' ? 'स्टोर खोजें' : 'Store Locator'}
                </a>
              </li>
              <li>
                <Link to="/about" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {tr('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors">
                  {tr('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Spices Lineup */}
          <div>
            <h4 className="font-display text-base font-black text-[#1B4D2E] uppercase tracking-wider mb-4">
              {language === 'hi' ? 'हमारे मुख्य मसाले' : 'Flagship Range'}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link to="/products/red-chilli-powder" className="text-[#5A483E] hover:text-[#D6301F] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D6301F]"></span>
                  <span>{language === 'hi' ? 'लाल मिर्च पाउडर (डंठल-रहित)' : 'Red Chilli Powder (Stemless)'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/turmeric-powder" className="text-[#5A483E] hover:text-[#D4A21A] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2C230]"></span>
                  <span>{language === 'hi' ? 'हल्दी पाउडर (शुद्ध जैविक)' : 'Turmeric Powder (Organic)'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/coriander-powder" className="text-[#5A483E] hover:text-[#1B4D2E] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B4D2E]"></span>
                  <span>{language === 'hi' ? 'धनिया पाउडर (धीमी पिसाई)' : 'Coriander Powder (Stone-Ground)'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/kaala-masala" className="text-[#5A483E] hover:text-[#2B1D14] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B1D14]"></span>
                  <span>{language === 'hi' ? 'काला मसाला (पारंपरिक भुना)' : 'Kaala Masala (Heritage Roasted)'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div>
            <h4 className="font-display text-base font-black text-[#1B4D2E] uppercase tracking-wider mb-4">
              {language === 'hi' ? 'संपर्क केंद्र' : 'Contact Care'}
            </h4>
            <ul className="space-y-3 text-sm text-[#5A483E] font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6301F] shrink-0 mt-0.5" />
                <span>
                  {t(settings?.address, 'Plot 42, Spice Industrial Zone, Food Processing Corridor, India')}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1B4D2E] shrink-0" />
                <span className="font-semibold text-[#1B4D2E]">{settings?.contactPhone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1B4D2E] shrink-0" />
                <span>{settings?.contactEmail || 'care@tikhorifoods.com'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#1B4D2E] shrink-0" />
                <span>
                  {t(settings?.businessHours, 'Mon - Sat: 9:00 AM - 6:00 PM IST')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A483E] font-semibold">
          <p>
            {t(footerContent.copyright, `© ${currentYear} Tikhori Foods. All rights reserved.`)}
          </p>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-[#1B4D2E]">
              <span>{language === 'hi' ? 'निर्मित गर्व से' : 'Crafted with passion for'}</span>
              <Heart className="w-3.5 h-3.5 text-[#D6301F] fill-[#D6301F] inline" />
              <span>{language === 'hi' ? 'प्रामाणिक स्वाद' : 'Authentic Indian Taste'}</span>
            </span>

            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-[#5A483E]/70 hover:text-[#1B4D2E] transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{tr('adminPortal')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
