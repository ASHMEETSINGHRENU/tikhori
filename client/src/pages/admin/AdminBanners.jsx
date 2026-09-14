import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, AlertCircle, Image as ImageIcon, Calendar } from 'lucide-react';
import api from '../../services/api';

export const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('en');

  const [formData, setFormData] = useState({
    titleEn: '',
    titleHi: '',
    subtitleEn: '',
    subtitleHi: '',
    descriptionEn: '',
    descriptionHi: '',
    badgeEn: '',
    badgeHi: '',
    ctaTextEn: 'Explore Products',
    ctaTextHi: 'मसाले देखें',
    ctaLink: '#products',
    image: '',
    isActive: true,
    sortOrder: 0,
    startDate: '',
    endDate: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchBanners = async () => {
    try {
      const res = await api.get('/banners/admin/all');
      if (res.data?.success) {
        setBanners(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      titleEn: '',
      titleHi: '',
      subtitleEn: '',
      subtitleHi: '',
      descriptionEn: '',
      descriptionHi: '',
      badgeEn: '',
      badgeHi: '',
      ctaTextEn: 'Explore Products',
      ctaTextHi: 'मसाले देखें',
      ctaLink: '#products',
      image: '',
      isActive: true,
      sortOrder: 0,
      startDate: '',
      endDate: ''
    });
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData({
      titleEn: b.title?.en || '',
      titleHi: b.title?.hi || '',
      subtitleEn: b.subtitle?.en || '',
      subtitleHi: b.subtitle?.hi || '',
      descriptionEn: b.description?.en || '',
      descriptionHi: b.description?.hi || '',
      badgeEn: b.badge?.en || '',
      badgeHi: b.badge?.hi || '',
      ctaTextEn: b.ctaText?.en || 'Explore Products',
      ctaTextHi: b.ctaText?.hi || 'मसाले देखें',
      ctaLink: b.ctaLink || '#products',
      image: b.image || '',
      isActive: b.isActive !== undefined ? b.isActive : true,
      sortOrder: b.sortOrder || 0,
      startDate: b.startDate ? b.startDate.split('T')[0] : '',
      endDate: b.endDate ? b.endDate.split('T')[0] : ''
    });
    setImageFile(null);
    setImagePreview(b.image || '');
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', JSON.stringify({ en: formData.titleEn, hi: formData.titleHi }));
      data.append('subtitle', JSON.stringify({ en: formData.subtitleEn, hi: formData.subtitleHi }));
      data.append('description', JSON.stringify({ en: formData.descriptionEn, hi: formData.descriptionHi }));
      data.append('badge', JSON.stringify({ en: formData.badgeEn, hi: formData.badgeHi }));
      data.append('ctaText', JSON.stringify({ en: formData.ctaTextEn, hi: formData.ctaTextHi }));
      data.append('ctaLink', formData.ctaLink);
      data.append('isActive', formData.isActive);
      data.append('sortOrder', formData.sortOrder);
      if (formData.startDate) data.append('startDate', formData.startDate);
      if (formData.endDate) data.append('endDate', formData.endDate);

      if (imageFile) {
        data.append('imageFile', imageFile);
      } else if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingBanner) {
        await api.put(`/banners/admin/${editingBanner._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Banner updated successfully');
      } else {
        await api.post('/banners/admin', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Banner created successfully');
      }
      setModalOpen(false);
      fetchBanners();
    } catch (err) {
      alert(err.message || 'Failed to save banner');
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/banners/admin/${deleteModal._id}`);
      showToast('Banner removed successfully');
      setDeleteModal(null);
      fetchBanners();
    } catch (err) {
      alert(err.message || 'Failed to delete banner');
    }
  };

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
          <h1 className="text-2xl font-bold text-slate-900">Promotional Banners & Posters</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage editorial campaign posters, seasonal banners, and mission callouts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Banner / Poster</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : banners.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Banner Media</th>
                  <th className="px-6 py-3.5">Title & Subtitle (EN / HI)</th>
                  <th className="px-6 py-3.5">CTA Link</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="w-20 h-12 rounded-xl bg-slate-900/10 border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={b.image}
                          alt={b.title?.en}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-3.5">
                      <p className="font-bold text-slate-900 text-sm">{b.title?.en}</p>
                      <p className="text-xs font-semibold text-brand-gold-dark mt-0.5">{b.title?.hi}</p>
                      {b.subtitle?.en && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{b.subtitle.en}</p>
                      )}
                    </td>

                    <td className="px-6 py-3.5">
                      <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {b.ctaLink}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {b.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 text-brand-forest hover:bg-brand-forest/10 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModal(b)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-400">
            No banners created yet. Click "Create Banner / Poster" to add one.
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {editingBanner ? 'Edit Banner / Poster' : 'Create Banner / Poster'}
              </h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg ${
                    activeTab === 'en' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('hi')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg ${
                    activeTab === 'hi' ? 'bg-brand-forest text-white shadow-xs' : 'text-slate-500'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Media Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="sm:col-span-4 flex justify-center">
                  <div className="w-32 h-20 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-auto object-contain" />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-8 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Upload Banner Pack / Graphic
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:bg-brand-forest/10 file:text-brand-forest"
                  />
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Or enter path /assets/products/product-1.png"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 font-mono text-slate-600 outline-none mt-1"
                  />
                </div>
              </div>

              {/* Bilingual Copy */}
              {activeTab === 'en' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Banner Heading (EN) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. The Taste of True Purity"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subtitle / Tagline (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.subtitleEn}
                      onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                      placeholder="e.g. 100% Organic • Chemical Free • Empowering Rural Women"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description (EN)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Badge Text (EN)
                      </label>
                      <input
                        type="text"
                        value={formData.badgeEn}
                        onChange={(e) => setFormData({ ...formData, badgeEn: e.target.value })}
                        placeholder="e.g. Harvest Special"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Button Label (EN)
                      </label>
                      <input
                        type="text"
                        value={formData.ctaTextEn}
                        onChange={(e) => setFormData({ ...formData, ctaTextEn: e.target.value })}
                        placeholder="e.g. Explore Spices"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-devanagari">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      बैनर शीर्षक (हिंदी)
                    </label>
                    <input
                      type="text"
                      value={formData.titleHi}
                      onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                      placeholder="उदा. सच्ची शुद्धता का प्रामाणिक स्वाद"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      उप-शीर्षक (हिंदी)
                    </label>
                    <input
                      type="text"
                      value={formData.subtitleHi}
                      onChange={(e) => setFormData({ ...formData, subtitleHi: e.target.value })}
                      placeholder="उदा. १००% जैविक • रसायन मुक्त • ग्रामीण महिलाओं का सहयोग"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      विवरण (हिंदी)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.descriptionHi}
                      onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        बैज (हिंदी)
                      </label>
                      <input
                        type="text"
                        value={formData.badgeHi}
                        onChange={(e) => setFormData({ ...formData, badgeHi: e.target.value })}
                        placeholder="उदा. विशेष संकलन"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        बटन लेबल (हिंदी)
                      </label>
                      <input
                        type="text"
                        value={formData.ctaTextHi}
                        onChange={(e) => setFormData({ ...formData, ctaTextHi: e.target.value })}
                        placeholder="उदा. मसाले देखें"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Button Link / Target
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="#products or /products"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded text-brand-forest focus:ring-brand-forest"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Active on Public Website
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-white bg-brand-forest rounded-xl hover:bg-brand-forest-light shadow-xs"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Delete Banner?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteModal.title?.en}"</span>?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
