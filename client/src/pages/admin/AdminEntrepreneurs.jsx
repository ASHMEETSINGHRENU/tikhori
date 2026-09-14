import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Check, AlertCircle, HeartHandshake, MapPin } from 'lucide-react';
import api from '../../services/api';

export const AdminEntrepreneurs = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('en');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    photo: '',
    businessNameEn: '',
    businessNameHi: '',
    storyEn: '',
    storyHi: '',
    journeyEn: '',
    journeyHi: '',
    quoteEn: '',
    quoteHi: '',
    isActive: true,
    sortOrder: 0
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const fetchEntrepreneurs = async () => {
    try {
      const res = await api.get('/entrepreneurs/admin/all');
      if (res.data?.success) {
        setEntrepreneurs(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching entrepreneurs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      location: '',
      photo: '',
      businessNameEn: '',
      businessNameHi: '',
      storyEn: '',
      storyHi: '',
      journeyEn: '',
      journeyHi: '',
      quoteEn: '',
      quoteHi: '',
      isActive: true,
      sortOrder: 0
    });
    setPhotoFile(null);
    setPhotoPreview('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      location: item.location || '',
      photo: item.photo || '',
      businessNameEn: item.businessName?.en || '',
      businessNameHi: item.businessName?.hi || '',
      storyEn: item.story?.en || '',
      storyHi: item.story?.hi || '',
      journeyEn: item.journey?.en || '',
      journeyHi: item.journey?.hi || '',
      quoteEn: item.quote?.en || '',
      quoteHi: item.quote?.hi || '',
      isActive: item.isActive !== undefined ? item.isActive : true,
      sortOrder: item.sortOrder || 0
    });
    setPhotoFile(null);
    setPhotoPreview(item.photo || '');
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('businessName', JSON.stringify({ en: formData.businessNameEn, hi: formData.businessNameHi }));
      data.append('story', JSON.stringify({ en: formData.storyEn, hi: formData.storyHi }));
      data.append('journey', JSON.stringify({ en: formData.journeyEn, hi: formData.journeyHi }));
      data.append('quote', JSON.stringify({ en: formData.quoteEn, hi: formData.quoteHi }));
      data.append('isActive', formData.isActive);
      data.append('sortOrder', formData.sortOrder);

      if (photoFile) {
        data.append('photoFile', photoFile);
      } else if (formData.photo) {
        data.append('photo', formData.photo);
      }

      if (editingItem) {
        await api.put(`/entrepreneurs/admin/${editingItem._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Profile updated successfully');
      } else {
        await api.post('/entrepreneurs/admin', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('New profile created successfully');
      }
      setModalOpen(false);
      fetchEntrepreneurs();
    } catch (err) {
      alert(err.message || 'Failed to save entrepreneur');
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/entrepreneurs/admin/${deleteModal._id}`);
      showToast('Profile removed successfully');
      setDeleteModal(null);
      fetchEntrepreneurs();
    } catch (err) {
      alert(err.message || 'Failed to delete profile');
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
          <h1 className="text-2xl font-bold text-slate-900">Women Entrepreneurs & Micro-Enterprises</h1>
          <p className="text-xs text-slate-500 mt-1">
            Highlight rural women entrepreneurs, their journeys, and community micro-enterprises.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Entrepreneur Profile</span>
        </button>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : entrepreneurs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Entrepreneur</th>
                  <th className="px-6 py-3.5">Business Name</th>
                  <th className="px-6 py-3.5">Story Excerpt</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entrepreneurs.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5 flex items-center gap-3">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center font-bold text-brand-forest shrink-0">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-brand-gold-dark" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 font-medium text-slate-800">
                      <p>{item.businessName?.en || '—'}</p>
                      {item.businessName?.hi && (
                        <p className="text-[11px] text-brand-gold-dark">{item.businessName.hi}</p>
                      )}
                    </td>

                    <td className="px-6 py-3.5 max-w-sm truncate text-slate-600">
                      {item.story?.en}
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-brand-forest hover:bg-brand-forest/10 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModal(item)}
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
            No entrepreneur profiles yet. Add your first profile to display on the public website.
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {editingItem ? 'Edit Profile' : 'Add Entrepreneur Profile'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sunita Patil"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-brand-forest"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location / Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Satara, Maharashtra"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-brand-forest"
                  />
                </div>
              </div>

              {/* Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-3 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">Photo</span>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-9 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Upload Photograph
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:bg-brand-forest/10 file:text-brand-forest"
                  />
                </div>
              </div>

              {/* Bilingual Story / Details */}
              {activeTab === 'en' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Business / Micro-Enterprise Name (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.businessNameEn}
                      onChange={(e) => setFormData({ ...formData, businessNameEn: e.target.value })}
                      placeholder="e.g. Maa Annapurna Spice Collective"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Short Story (EN) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.storyEn}
                      onChange={(e) => setFormData({ ...formData, storyEn: e.target.value })}
                      placeholder="How she started and the women she supports..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Inspiring Quote (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.quoteEn}
                      onChange={(e) => setFormData({ ...formData, quoteEn: e.target.value })}
                      placeholder="A personal quote about her journey..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-devanagari">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      व्यवसाय / समूह का नाम (हिंदी)
                    </label>
                    <input
                      type="text"
                      value={formData.businessNameHi}
                      onChange={(e) => setFormData({ ...formData, businessNameHi: e.target.value })}
                      placeholder="उदा. मां अन्नपूर्णा मसाला समूह"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      प्रेरणादायी कहानी (हिंदी)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.storyHi}
                      onChange={(e) => setFormData({ ...formData, storyHi: e.target.value })}
                      placeholder="उनके उद्यम और संघर्ष की कहानी..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      प्रेरक उद्धरण (हिंदी)
                    </label>
                    <input
                      type="text"
                      value={formData.quoteHi}
                      onChange={(e) => setFormData({ ...formData, quoteHi: e.target.value })}
                      placeholder="उदा. अपनी कमाई ने हमें आत्मसम्मान दिया है..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
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
                      Display on Public Site
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
                  Save Profile
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
                Delete Profile?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <span className="font-semibold text-slate-700">"{deleteModal.name}"</span>?
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

export default AdminEntrepreneurs;
