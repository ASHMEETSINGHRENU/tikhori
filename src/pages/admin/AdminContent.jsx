import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, FileText, Sparkles, Layers, HeartHandshake, Award } from 'lucide-react';
import api from '../../services/api';

export const AdminContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeLang, setActiveLang] = useState('en');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchContent = async () => {
    try {
      const res = await api.get('/content');
      if (res.data?.success) {
        setContent(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdate = (section, key, lang, value) => {
    setContent((prev) => {
      const sectionData = { ...(prev[section] || {}) };
      if (lang) {
        sectionData[key] = {
          ...(sectionData[key] || {}),
          [lang]: value
        };
      } else {
        sectionData[key] = value;
      }
      return { ...prev, [section]: sectionData };
    });
  };

  const handleSaveSection = async (section) => {
    setSaving(true);
    try {
      const dataToSave = content[section] || {};
      const res = await api.put(`/content/${section}`, { data: dataToSave });
      if (res.data?.success) {
        showToast(`Section "${section}" saved successfully!`);
      }
    } catch (err) {
      alert(err.message || 'Failed to save section content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const sectionsList = [
    { id: 'hero', name: 'Hero Section', icon: Sparkles },
    { id: 'whyTikhori', name: 'Why Tikhori Section', icon: Award },
    { id: 'empowerment', name: 'Women Empowerment', icon: HeartHandshake },
    { id: 'qualityProcess', name: 'Quality & Process', icon: Layers },
    { id: 'about', name: 'About Brand', icon: FileText },
    { id: 'footer', name: 'Footer Info', icon: FileText }
  ];

  const currentSectionData = content[activeSection] || {};

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Website Content CMS</h1>
          <p className="text-xs text-slate-500 mt-1">
            Dynamically edit English and Hindi marketing copy across all public website sections.
          </p>
        </div>

        {/* Global Language Toggle */}
        <div className="bg-slate-200 p-1 rounded-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Editing English
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'hi' ? 'bg-brand-forest text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Editing हिंदी
          </button>
        </div>
      </div>

      {/* Main CMS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Section Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeSection === sec.id
                    ? 'bg-brand-forest text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* Section Editor Form */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 capitalize">
                {activeSection} Section
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Language: <span className="font-bold text-brand-forest">{activeLang === 'en' ? 'English' : 'हिंदी'}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSaveSection(activeSection)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-98 disabled:opacity-60"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

          {/* Section: HERO */}
          {activeSection === 'hero' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline Badge ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.badge?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('hero', 'badge', activeLang, e.target.value)}
                  placeholder={activeLang === 'en' ? '100% Organic & Chemical Free' : '१००% जैविक और रसायन मुक्त'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Main Heading ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.title?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('hero', 'title', activeLang, e.target.value)}
                  placeholder={activeLang === 'en' ? 'Spice Crafted Right' : 'स्वाद और शुद्धता का सही संगम'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Subtitle ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.subtitle?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('hero', 'subtitle', activeLang, e.target.value)}
                  placeholder={activeLang === 'en' ? 'Pure. Organic. Authentic. Made with Purpose.' : 'शुद्ध। जैविक। प्रामाणिक। एक सार्थक उद्देश्य के साथ।'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Supporting Narrative ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={4}
                  value={currentSectionData.description?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('hero', 'description', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary CTA Label ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={currentSectionData.ctaPrimary?.[activeLang] || ''}
                    onChange={(e) => handleUpdate('hero', 'ctaPrimary', activeLang, e.target.value)}
                    placeholder={activeLang === 'en' ? 'Explore Our Spices' : 'हमारे मसाले देखें'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secondary CTA Label ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={currentSectionData.ctaSecondary?.[activeLang] || ''}
                    onChange={(e) => handleUpdate('hero', 'ctaSecondary', activeLang, e.target.value)}
                    placeholder={activeLang === 'en' ? 'Our Mission' : 'हमारा उद्देश्य'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: WHY TIKHORI */}
          {activeSection === 'whyTikhori' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Title ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.title?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('whyTikhori', 'title', activeLang, e.target.value)}
                  placeholder="Why Tikhori Foods?"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.subtitle?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('whyTikhori', 'subtitle', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>
          )}

          {/* Section: EMPOWERMENT */}
          {activeSection === 'empowerment' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Empowerment Headline ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.title?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('empowerment', 'title', activeLang, e.target.value)}
                  placeholder="Empowering Women. Strengthening Rural Businesses."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Story Subheading ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.heading?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('empowerment', 'heading', activeLang, e.target.value)}
                  placeholder="More Than Spices. A Purpose to Empower."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mission Story ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={5}
                  value={currentSectionData.story?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('empowerment', 'story', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Section: QUALITY PROCESS */}
          {activeSection === 'qualityProcess' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Title ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.title?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('qualityProcess', 'title', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subtitle ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.subtitle?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('qualityProcess', 'subtitle', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>
          )}

          {/* Section: ABOUT */}
          {activeSection === 'about' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  About Heading ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.title?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('about', 'title', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none font-serif text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brand Story ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={4}
                  value={currentSectionData.story?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('about', 'story', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Quality Philosophy ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={currentSectionData.philosophy?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('about', 'philosophy', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Section: FOOTER */}
          {activeSection === 'footer' && (
            <div className={`space-y-4 ${activeLang === 'hi' ? 'font-devanagari' : ''}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brand Mission Statement ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={currentSectionData.brandStatement?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('footer', 'brandStatement', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Copyright Line ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={currentSectionData.copyright?.[activeLang] || ''}
                  onChange={(e) => handleUpdate('footer', 'copyright', activeLang, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
