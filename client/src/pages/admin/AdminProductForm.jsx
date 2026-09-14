import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('en'); // 'en' | 'hi'

  // Form states
  const [formData, setFormData] = useState({
    nameEn: '',
    nameHi: '',
    slug: '',
    shortDescEn: '',
    shortDescHi: '',
    descEn: '',
    descHi: '',
    usageEn: '',
    usageHi: '',
    storageEn: '',
    storageHi: '',
    packagingEn: '',
    packagingHi: '',
    features: ['100% Organic', 'Chemical Free', 'Zero Added Colours'],
    ingredientsEn: [''],
    ingredientsHi: [''],
    benefitsEn: [''],
    benefitsHi: [''],
    sortOrder: 0,
    isActive: true,
    image: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/admin/${id}`);
          if (res.data?.success) {
            const p = res.data.data;
            setFormData({
              nameEn: p.name?.en || '',
              nameHi: p.name?.hi || '',
              slug: p.slug || '',
              shortDescEn: p.shortDescription?.en || '',
              shortDescHi: p.shortDescription?.hi || '',
              descEn: p.description?.en || '',
              descHi: p.description?.hi || '',
              usageEn: p.usage?.en || '',
              usageHi: p.usage?.hi || '',
              storageEn: p.storage?.en || '',
              storageHi: p.storage?.hi || '',
              packagingEn: p.packaging?.en || '',
              packagingHi: p.packaging?.hi || '',
              features: p.features || [],
              ingredientsEn: p.ingredients?.en?.length ? p.ingredients.en : [''],
              ingredientsHi: p.ingredients?.hi?.length ? p.ingredients.hi : [''],
              benefitsEn: p.benefits?.en?.length ? p.benefits.en : [''],
              benefitsHi: p.benefits?.hi?.length ? p.benefits.hi : [''],
              sortOrder: p.sortOrder || 0,
              isActive: p.isActive !== undefined ? p.isActive : true,
              image: p.image || ''
            });
            setImagePreview(p.image || '');
          }
        } catch (err) {
          setErrorMessage(err.message || 'Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Dynamic list helpers
  const handleListChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addListItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAddFeature = (feature) => {
    if (!feature.trim()) return;
    if (!formData.features.includes(feature.trim())) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, feature.trim()] }));
    }
  };

  const handleRemoveFeature = (feat) => {
    setFormData((prev) => ({ ...prev, features: prev.features.filter((f) => f !== feat) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    if (!formData.nameEn.trim()) {
      setErrorMessage('English product name is required.');
      setSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', JSON.stringify({ en: formData.nameEn, hi: formData.nameHi }));
      data.append('slug', formData.slug);
      data.append(
        'shortDescription',
        JSON.stringify({ en: formData.shortDescEn, hi: formData.shortDescHi })
      );
      data.append('description', JSON.stringify({ en: formData.descEn, hi: formData.descHi }));
      data.append('usage', JSON.stringify({ en: formData.usageEn, hi: formData.usageHi }));
      data.append('storage', JSON.stringify({ en: formData.storageEn, hi: formData.storageHi }));
      data.append('packaging', JSON.stringify({ en: formData.packagingEn, hi: formData.packagingHi }));
      data.append(
        'ingredients',
        JSON.stringify({
          en: formData.ingredientsEn.filter(Boolean),
          hi: formData.ingredientsHi.filter(Boolean)
        })
      );
      data.append(
        'benefits',
        JSON.stringify({
          en: formData.benefitsEn.filter(Boolean),
          hi: formData.benefitsHi.filter(Boolean)
        })
      );
      data.append('features', JSON.stringify(formData.features));
      data.append('sortOrder', formData.sortOrder);
      data.append('isActive', formData.isActive);

      if (imageFile) {
        data.append('imageFile', imageFile);
      } else if (formData.image) {
        data.append('image', formData.image);
      }

      if (isEdit) {
        await api.put(`/products/admin/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/products/admin', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/admin/products');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Product' : 'Add New Spice Product'}
            </h1>
            <p className="text-xs text-slate-500">
              Manage bilingual descriptions, packaging images, and characteristics.
            </p>
          </div>
        </div>

        {/* Tab switch for English vs Hindi */}
        <div className="bg-slate-200 p-1 rounded-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'en'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'hi'
                ? 'bg-brand-forest text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी View
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Core Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* English Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Product Name (English) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Red Chilli Powder"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none"
              />
            </div>

            {/* Hindi Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                उत्पाद का नाम (हिंदी) <span className="text-brand-forest">(Hindi)</span>
              </label>
              <input
                type="text"
                value={formData.nameHi}
                onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                placeholder="उदा. लाल मिर्च पाउडर"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none font-devanagari"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated if left empty"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none font-mono text-slate-600"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-forest focus:ring-brand-forest"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Visible on Public Website
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Packaging Image Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Product Image
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Preview Box */}
            <div className="sm:col-span-4 flex justify-center">
              <div className="w-44 h-44 rounded-2xl bg-brand-sand/40 border-2 border-dashed border-slate-300 p-3 flex items-center justify-center overflow-hidden relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-auto object-contain"
                  />
                ) : (
                  <p className="text-xs text-slate-400 text-center">No image selected</p>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="sm:col-span-8 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upload New Image File (.png, .jpg, .webp)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-forest/10 file:text-brand-forest hover:file:bg-brand-forest/20"
              />

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Or Existing Image Path
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="/assets/products/product-1.png"
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 font-mono text-slate-600 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Key Feature Badges
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {formData.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/10 text-brand-forest text-xs font-semibold"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feat)}
                  className="hover:text-rose-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              id="newFeatureInput"
              placeholder="e.g. Stemless Chilli"
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('newFeatureInput');
                if (input) {
                  handleAddFeature(input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
            >
              Add Badge
            </button>
          </div>
        </div>

        {/* Bilingual Content Blocks */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              4. Descriptions & Detailed Content ({activeTab === 'en' ? 'English' : 'हिंदी'})
            </h3>
            <span className="text-xs text-brand-gold-dark font-semibold uppercase">
              Current Language: {activeTab === 'en' ? 'English' : 'हिंदी'}
            </span>
          </div>

          {activeTab === 'en' ? (
            /* English Fields */
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Description (English)
                </label>
                <input
                  type="text"
                  value={formData.shortDescEn}
                  onChange={(e) => setFormData({ ...formData, shortDescEn: e.target.value })}
                  placeholder="One or two sentences summarizing purity and heat..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Description (English)
                </label>
                <textarea
                  rows={4}
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  placeholder="Full background on sourcing, aroma, and recipe heritage..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Usage Instructions (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.usageEn}
                    onChange={(e) => setFormData({ ...formData, usageEn: e.target.value })}
                    placeholder="How to use in dishes..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Storage Guidelines (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.storageEn}
                    onChange={(e) => setFormData({ ...formData, storageEn: e.target.value })}
                    placeholder="e.g. Airtight container in dry place..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Packaging Notes (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.packagingEn}
                    onChange={(e) => setFormData({ ...formData, packagingEn: e.target.value })}
                    placeholder="e.g. Aroma-lock pouch..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          ) : (
            /* Hindi Fields */
            <div className="space-y-5 font-devanagari">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  संक्षिप्त विवरण (हिंदी)
                </label>
                <input
                  type="text"
                  value={formData.shortDescHi}
                  onChange={(e) => setFormData({ ...formData, shortDescHi: e.target.value })}
                  placeholder="उत्पाद का संक्षिप्त विवरण..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  विस्तृत विवरण (हिंदी)
                </label>
                <textarea
                  rows={4}
                  value={formData.descHi}
                  onChange={(e) => setFormData({ ...formData, descHi: e.target.value })}
                  placeholder="उत्पाद की प्रामाणिकता, स्वाद और शुद्धता के बारे में पूरी जानकारी..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-forest outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    उपयोग विधि (हिंदी)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.usageHi}
                    onChange={(e) => setFormData({ ...formData, usageHi: e.target.value })}
                    placeholder="व्यंजनों में इस्तेमाल कैसे करें..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    रख-रखाव (हिंदी)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.storageHi}
                    onChange={(e) => setFormData({ ...formData, storageHi: e.target.value })}
                    placeholder="हवाबंद डिब्बे में रखें..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    पैकेजिंग जानकारी (हिंदी)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.packagingHi}
                    onChange={(e) => setFormData({ ...formData, packagingHi: e.target.value })}
                    placeholder="खुशबू सुरक्षित रखने वाले पाउच..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ingredients & Benefits Lists */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            5. Ingredients & Key Benefits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ingredients ({activeTab.toUpperCase()})
                </label>
                <button
                  type="button"
                  onClick={() => addListItem(activeTab === 'en' ? 'ingredientsEn' : 'ingredientsHi')}
                  className="text-xs text-brand-forest hover:underline font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line</span>
                </button>
              </div>

              {(activeTab === 'en' ? formData.ingredientsEn : formData.ingredientsHi).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleListChange(
                        activeTab === 'en' ? 'ingredientsEn' : 'ingredientsHi',
                        idx,
                        e.target.value
                      )
                    }
                    placeholder={activeTab === 'en' ? 'e.g. Whole Stemless Chilli' : 'उदा. साबुत डंठल-रहित मिर्च'}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeListItem(activeTab === 'en' ? 'ingredientsEn' : 'ingredientsHi', idx)
                    }
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Key Benefits ({activeTab.toUpperCase()})
                </label>
                <button
                  type="button"
                  onClick={() => addListItem(activeTab === 'en' ? 'benefitsEn' : 'benefitsHi')}
                  className="text-xs text-brand-forest hover:underline font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line</span>
                </button>
              </div>

              {(activeTab === 'en' ? formData.benefitsEn : formData.benefitsHi).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleListChange(
                        activeTab === 'en' ? 'benefitsEn' : 'benefitsHi',
                        idx,
                        e.target.value
                      )
                    }
                    placeholder={activeTab === 'en' ? 'e.g. Pure capsaicin with zero dyes' : 'उदा. बिना किसी कृत्रिम रंग के शुद्ध'}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeListItem(activeTab === 'en' ? 'benefitsEn' : 'benefitsHi', idx)
                    }
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to="/admin/products"
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-60 flex items-center gap-2"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
