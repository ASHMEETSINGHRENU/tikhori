import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// UI dictionaries for core navigation and common UI elements
const UI_TRANSLATIONS = {
  en: {
    brandName: 'Tikhori Foods',
    tagline: 'Spice Crafted Right',
    navHome: 'Home',
    navProducts: 'Our Spices',
    navWhyTikhori: 'Why Tikhori',
    navQuality: 'Quality & Process',
    navAbout: 'About Us',
    navContact: 'Contact',
    ctaExplore: 'Explore Spices',
    ctaMission: 'Our Heritage',
    ctaViewDetails: 'View Details',
    ctaBackToProducts: 'Back to Spices',
    ctaSendEnquiry: 'Send Message',
    ctaSending: 'Sending...',
    ctaOrderEnquiry: 'Enquire for Bulk / Purchase',
    searchPlaceholder: 'Search spices...',
    badgeOrganic: '100% Organic',
    badgeStemless: 'Stemless Chilli',
    badgeChemicalFree: 'Chemical Free',
    badgeZeroColours: 'Zero Added Colours',
    badgeZeroFlavours: 'Zero Added Flavours',
    badgeStoneGround: 'Traditional Stone-Ground',
    sectionSpicesTitle: 'Our Pure Spices',
    sectionSpicesSubtitle: 'Crafted with passion, purity, and authentic traditional methods.',
    sectionImpactTitle: 'The Purity Standard',
    sectionImpactSubtitle: 'How patient stone grinding and destemming deliver pure aroma to your kitchen.',
    flowStep1: 'Direct Organic Sourcing',
    flowStep2: 'Manual Destemming',
    flowStep3: 'Slow Stone-Ground Milling',
    flowStep4: 'Aroma-Lock Packaging',
    ingredientsLabel: 'Pure Ingredients',
    benefitsLabel: 'Key Characteristics & Benefits',
    usageLabel: 'How to Use in Cooking',
    storageLabel: 'Storage & Care',
    packagingLabel: 'Packaging Information',
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Have questions about our pure spices, bulk orders, retail distribution, or culinary inquiries? We would love to hear from you.',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formPhone: 'Phone Number (Optional)',
    formSubject: 'Subject / Enquiry Type',
    formMessage: 'Your Message',
    formSuccess: 'Thank you for reaching out! We will get back to you shortly.',
    footerTagline: 'Spice Crafted Right',
    footerCopyright: '© 2026 Tikhori Foods. All rights reserved.',
    adminPortal: 'Admin Portal'
  },
  hi: {
    brandName: 'टिखोरी फूड्स',
    tagline: 'स्वाद और शुद्धता का सही संगम',
    navHome: 'होम',
    navProducts: 'हमारे मसाले',
    navWhyTikhori: 'टिखोरी ही क्यों',
    navQuality: 'गुणवत्ता व विधि',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क करें',
    ctaExplore: 'मसाले देखें',
    ctaMission: 'हमारी विरासत',
    ctaViewDetails: 'विवरण देखें',
    ctaBackToProducts: 'वापस मसालों पर जाएं',
    ctaSendEnquiry: 'संदेश भेजें',
    ctaSending: 'भेजा जा रहा है...',
    ctaOrderEnquiry: 'खरीद / थोक पूछताछ',
    searchPlaceholder: 'मसाले खोजें...',
    badgeOrganic: '१००% जैविक',
    badgeStemless: 'डंठल-रहित मिर्च',
    badgeChemicalFree: 'रसायन मुक्त',
    badgeZeroColours: 'बिना किसी कृत्रिम रंग',
    badgeZeroFlavours: 'बिना किसी कृत्रिम स्वाद',
    badgeStoneGround: 'पारंपरिक धीमी पिसाई',
    sectionSpicesTitle: 'हमारे शुद्ध मसाले',
    sectionSpicesSubtitle: 'परंपरा, शुद्धता और प्राकृतिक गुणों से भरपूर अनूठे मसाले।',
    sectionImpactTitle: 'शुद्धता का सच्चा मानक',
    sectionImpactSubtitle: 'धीमी पिसाई और स्वच्छता से तैयार मसाले जो आपके भोजन को दें असली स्वाद।',
    flowStep1: 'प्राकृतिक जैविक खेती',
    flowStep2: 'डंठल-रहित छंटाई',
    flowStep3: 'धीमी पत्थर पिसाई',
    flowStep4: 'सुरक्षित फूड-ग्रेड पैकेजिंग',
    ingredientsLabel: 'शुद्ध सामग्री',
    benefitsLabel: 'विशेषताएं एवं गुण',
    usageLabel: 'उपयोग विधि',
    storageLabel: 'रख-रखाव व सुरक्षा',
    packagingLabel: 'पैकेजिंग जानकारी',
    contactTitle: 'हमसे संपर्क करें',
    contactSubtitle: 'हमारे शुद्ध मसालों, थोक खरीद, रिटेल वितरण या किसी भी जानकारी के लिए हमसे संपर्क करें।',
    formName: 'पूरा नाम',
    formEmail: 'ईमेल पता',
    formPhone: 'फ़ोन नंबर (वैकल्पिक)',
    formSubject: 'विषय / पूछताछ का प्रकार',
    formMessage: 'आपका संदेश',
    formSuccess: 'संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
    footerTagline: 'स्वाद और शुद्धता का सही संगम',
    footerCopyright: '© २०२६ टिखोरी फूड्स। सर्वाधिकार सुरक्षित।',
    adminPortal: 'व्यवस्थापक पोर्टल'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('tikhori_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('tikhori_language', language);
    document.documentElement.lang = language;
    if (language === 'hi') {
      document.body.classList.add('font-devanagari');
    } else {
      document.body.classList.remove('font-devanagari');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  /**
   * Helper to retrieve localized text from database objects:
   * e.g. t({ en: 'Red Chilli', hi: 'लाल मिर्च' }) => 'Red Chilli' or 'लाल मिर्च'
   */
  const t = (data, fallback = '') => {
    if (!data) return fallback;
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      return data[language] || data['en'] || fallback;
    }
    return fallback;
  };

  // Static dictionary translation
  const tr = (key, fallback = '') => {
    const dict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
    return dict[key] || UI_TRANSLATIONS.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
