import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  ArrowRight, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown, 
  Sparkles,
  ShoppingBag,
  Mail,
  Phone
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUserAuth } from '../../context/UserAuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export const Navbar = () => {
  const { tr, language } = useLanguage();
  const { user, isAuthenticated, logout } = useUserAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: tr('navHome'), path: '/' },
    { name: tr('navProducts'), path: '/products' },
    { name: tr('navWhyTikhori'), path: '/#why-tikhori' },
    { name: tr('navQuality'), path: '/quality' },
    { name: tr('navAbout'), path: '/about' },
    { name: tr('navContact'), path: '/contact' }
  ];

  const handleNavClick = (path) => {
    if (path.includes('#') && location.pathname === '/') {
      const id = path.split('#')[1];
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#FDF6E9]/95 backdrop-blur-md border-[#E8DFCF] py-2.5 shadow-soft'
          : 'bg-[#FDF6E9]/95 backdrop-blur-sm border-[#E8DFCF] py-3.5'
      }`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6 lg:gap-10">
          
          {/* 1. Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none shrink-0">
            <div className="relative">
              <img
                src="/assets/logo/logo.png"
                alt="Tikhori Foods Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xs"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2C230] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2C230]"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl text-[#1B4D2E] tracking-tight leading-none group-hover:text-[#25663D] transition-colors">
                Tikhori Foods
              </span>
              <span className="text-[10px] sm:text-[11px] font-black text-[#D4A21A] tracking-[0.2em] uppercase mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#F2C230]" />
                {tr('tagline')}
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links (Floating, spacious links) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => {
              const isAnchor = link.path.includes('#');
              const isActive = location.pathname === link.path;

              return isAnchor && location.pathname === '/' ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className="text-xs xl:text-sm font-semibold text-brand-stone hover:text-brand-forest transition-colors py-1.5 relative hover:scale-102"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold transition-colors py-1.5 relative hover:scale-102 ${
                    isActive
                      ? 'text-brand-forest font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-forest after:rounded-full'
                      : 'text-brand-stone hover:text-brand-forest'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Action Toolbar (Generously spaced) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Customer Authentication State */}
            {isAuthenticated && user ? (
              /* Authenticated User Pill & Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2.5 bg-white hover:bg-brand-sand/40 border border-brand-border px-3.5 py-1.5 rounded-full shadow-2xs transition-all focus:outline-none"
                  aria-expanded={userDropdown}
                >
                  <div className="w-6 h-6 rounded-full bg-brand-forest text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-brand-charcoal max-w-[100px] truncate leading-tight">
                      @{user.username}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white shrink-0"></span>
                  <ChevronDown className={`w-3.5 h-3.5 text-brand-stone transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-lg border border-brand-border py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-brand-border/60">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-dark">
                        {language === 'hi' ? 'ग्राहक खाता' : 'Customer Account'}
                      </p>
                      <p className="text-sm font-bold text-brand-charcoal truncate mt-0.5">
                        {user.name || `@${user.username}`}
                      </p>
                      <p className="text-xs text-brand-stone truncate flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-brand-stone/70 shrink-0" />
                        <span>{user.email}</span>
                      </p>
                      {user.phone && (
                        <p className="text-xs text-brand-stone truncate flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-brand-stone/70 shrink-0" />
                          <span>{user.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="py-1">
                      <Link
                        to="/products"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-sand/50 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-forest" />
                        <span>{language === 'hi' ? 'मसाले ब्राउज़ करें' : 'Browse Spices'}</span>
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-sand/50 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{language === 'hi' ? 'थोक / पूछताछ सहायता' : 'Wholesale / Inquiry'}</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-brand-border/60 px-2">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-brand-red hover:bg-brand-red/10 rounded-xl transition-colors"
                      >
                        <span>{language === 'hi' ? 'लॉगआउट करें' : 'Sign Out'}</span>
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Auth Buttons */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-forest/40 bg-white hover:bg-brand-sand/50 text-xs font-bold text-brand-forest transition-all shadow-2xs hover:shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-brand-stone hover:text-brand-forest hover:bg-brand-sand/40 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'रजिस्टर' : 'Register'}</span>
                </Link>
              </div>
            )}

            {/* Explore Spices CTA */}
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D6301F] text-[#FDF6E9] text-xs font-black tracking-wider uppercase hover:bg-[#B72416] transition-all shadow-sm hover:shadow active:scale-95 shrink-0"
            >
              <span>{language === 'hi' ? 'दुकान' : 'SHOP NOW'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Divider */}
            <div className="h-4 w-px bg-brand-border shrink-0"></div>

            {/* Admin Portal Gateway */}
            <Link
              to="/admin/dashboard"
              className="p-2 text-brand-stone/70 hover:text-brand-forest hover:bg-brand-sand/60 rounded-full transition-colors shrink-0"
              title={tr('adminPortal')}
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          {/* 4. Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher className="scale-90" />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-charcoal bg-white border border-brand-border hover:bg-brand-sand transition-colors shadow-2xs"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-brand-red" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-brand-border bg-white px-4 pt-3 pb-6 space-y-4 shadow-soft-lg animate-fadeIn">
          
          {/* Mobile User Card */}
          <div className="p-3 rounded-2xl bg-brand-sand/50 border border-brand-border">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-forest text-white flex items-center justify-center text-sm font-bold shadow-xs">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-brand-charcoal">@{user.username}</p>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <p className="text-[11px] text-brand-stone truncate max-w-[160px]">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-brand-red font-bold hover:bg-brand-red/10 rounded-lg transition-colors border border-brand-red/20"
                >
                  {language === 'hi' ? 'लॉगआउट' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-brand-stone text-center font-medium">
                  {language === 'hi' ? 'ग्राहक खाता एक्सेस करें:' : 'Access your customer account:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-3 rounded-xl bg-brand-forest text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'लॉगिन' : 'Sign In'}</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="py-2 px-3 rounded-xl bg-white border border-brand-border text-brand-charcoal hover:bg-brand-sand text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-brand-forest" />
                    <span>{language === 'hi' ? 'रजिस्टर' : 'Register'}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick(link.path);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-forest text-white font-bold'
                      : 'text-brand-charcoal hover:bg-brand-sand/60'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : 'text-brand-stone'}`} />
                </Link>
              );
            })}
          </div>

          {/* Primary CTA */}
          <div className="pt-2 border-t border-brand-border">
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
            >
              <span>{tr('ctaExplore')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Admin link */}
          <div className="pt-1 flex justify-center">
            <Link
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs text-brand-stone hover:text-brand-forest"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{tr('adminPortal')}</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
};

export default Navbar;
