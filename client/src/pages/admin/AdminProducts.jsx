import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ExternalLink, AlertCircle, Check } from 'lucide-react';
import api from '../../services/api';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null); // product object or null
  const [toast, setToast] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/admin/all');
      if (res.data?.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleStatus = async (product) => {
    setActionLoading(product._id);
    try {
      const res = await api.patch(`/products/admin/${product._id}/toggle`);
      if (res.data?.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, isActive: !p.isActive } : p))
        );
        showToast(`Product ${!product.isActive ? 'activated' : 'deactivated'} successfully!`);
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle product status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      const res = await api.delete(`/products/admin/${deleteModal._id}`);
      if (res.data?.success) {
        setProducts((prev) => prev.filter((p) => p._id !== deleteModal._id));
        showToast('Product deleted successfully');
        setDeleteModal(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const filtered = products.filter((p) => {
    const en = p.name?.en?.toLowerCase() || '';
    const hi = p.name?.hi || '';
    const q = search.toLowerCase();
    return en.includes(q) || hi.includes(q);
  });

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
          <h1 className="text-2xl font-bold text-slate-900">Products Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your spice offerings, bilingual information, high-res packs, and visibility.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by English or Hindi name..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-forest outline-none transition-all"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Total: {products.length} items
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Pack</th>
                  <th className="px-6 py-3.5">Product Name (EN / HI)</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5 text-center">Order</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-xl bg-brand-sand/40 border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={prod.image}
                          alt={prod.name?.en}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    </td>

                    {/* Names */}
                    <td className="px-6 py-3">
                      <p className="font-bold text-slate-900 text-sm">{prod.name?.en}</p>
                      <p className="text-xs font-semibold text-brand-gold-dark mt-0.5">{prod.name?.hi}</p>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-3">
                      <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {prod.slug}
                      </span>
                    </td>

                    {/* Sort Order */}
                    <td className="px-6 py-3 text-center font-semibold text-slate-700">
                      {prod.sortOrder || 0}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(prod)}
                        disabled={actionLoading === prod._id}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          prod.isActive
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {prod.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View on store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          to={`/admin/products/${prod._id}/edit`}
                          className="p-1.5 text-brand-forest hover:bg-brand-forest/10 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeleteModal(prod)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete product"
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
            No products found matching your search.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Delete Product?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteModal.name?.en}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
