import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export const Footer = ({ settings, content }) => {
  const { t, tr, language } = useLanguage();

  const footerContent = content?.footer || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-sand border-t border-brand-border/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-brand-border">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/logo/logo.png"
                alt="Tikhori Foods"
                className="h-12 w-12 object-contain"
              />
              <div>
                <span className="font-serif font-bold text-xl text-brand-forest">
                  Tikhori Foods
                </span>
                <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-wider">
                  {t(settings?.tagline, tr('tagline'))}
                </p>
              </div>
            </Link>

            <p className="text-sm text-brand-stone leading-relaxed">
              {t(
                footerContent.brandStatement,
                language === 'hi'
                  ? 'शुद्ध, १००% जैविक भारतीय मसाले, पारंपरिक तरीके से धीमी पिसाई और बिना किसी मिलावट के तैयार।'
                  : 'Pure, 100% organic Indian spices crafted with traditional integrity, slow stone-ground perfection, and uncompromised purity for authentic home cooking.'
              )}
            </p>

            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-4">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-brand-stone hover:text-brand-forest transition-colors">
                  {tr('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-stone hover:text-brand-forest transition-colors">
                  {tr('navProducts')}
                </Link>
              </li>
              <li>
                <Link to="/quality" className="text-brand-stone hover:text-brand-forest transition-colors">
                  {tr('navQuality')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brand-stone hover:text-brand-forest transition-colors">
                  {tr('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-stone hover:text-brand-forest transition-colors">
                  {tr('navContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Spices Lineup */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-4">
              {language === 'hi' ? 'हमारे मुख्य मसाले' : 'Flagship Spices'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products/red-chilli-powder" className="text-brand-stone hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                  <span>{language === 'hi' ? 'लाल मिर्च पाउडर' : 'Red Chilli Powder'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/turmeric-powder" className="text-brand-stone hover:text-brand-gold-dark transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                  <span>{language === 'hi' ? 'हल्दी पाउडर' : 'Turmeric Powder'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/coriander-powder" className="text-brand-stone hover:text-brand-forest transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-forest"></span>
                  <span>{language === 'hi' ? 'धनिया पाउडर' : 'Coriander Powder'}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/kaala-masala" className="text-brand-stone hover:text-brand-charcoal transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal"></span>
                  <span>{language === 'hi' ? 'काला मसाला' : 'Kaala Masala'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-charcoal mb-4">
              {language === 'hi' ? 'संपर्क करें' : 'Contact Care'}
            </h4>
            <ul className="space-y-3 text-sm text-brand-stone">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                <span>
                  {t(settings?.address, 'Plot 42, Spice Industrial Zone, Rural Enterprise Corridor, India')}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-forest shrink-0" />
                <span>{settings?.contactPhone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-forest shrink-0" />
                <span>{settings?.contactEmail || 'care@tikhorifoods.com'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-forest shrink-0" />
                <span>
                  {t(settings?.businessHours, 'Mon - Sat: 9:00 AM - 6:00 PM IST')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-stone">
          <p>
            {t(footerContent.copyright, `© ${currentYear} Tikhori Foods. All rights reserved.`)}
          </p>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1 text-brand-stone">
              <span>{language === 'hi' ? 'निर्मित गर्व से' : 'Crafted with passion for'}</span>
              <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red inline" />
              <span>{language === 'hi' ? 'प्रामाणिक स्वाद' : 'Authentic Indian Taste'}</span>
            </span>

            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-brand-stone/60 hover:text-brand-forest transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>{tr('adminPortal')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
