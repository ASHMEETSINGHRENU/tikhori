import React, { useState, useEffect } from 'react';
import { Search, Trash2, Check, AlertCircle, Mail, Phone, Clock, Eye } from 'lucide-react';
import api from '../../services/api';

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [counts, setCounts] = useState({ total: 0, new: 0, read: 0, resolved: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchEnquiries = async () => {
    try {
      const res = await api.get(
        `/contact/admin/all?search=${encodeURIComponent(search)}&status=${statusFilter}`
      );
      if (res.data?.success) {
        setEnquiries(res.data.data);
        if (res.data.counts) {
          setCounts(res.data.counts);
        }
      }
    } catch (err) {
      console.error('Error fetching contact enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setAdminNotes(enq.adminNotes || '');
    if (enq.status === 'new') {
      // Automatically mark as read when opened
      handleStatusChange(enq._id, 'read');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/contact/admin/${id}/status`, { status: newStatus });
      if (res.data?.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      await api.put(`/contact/admin/${selectedEnquiry._id}/status`, {
        status: selectedEnquiry.status,
        adminNotes
      });
      showToast('Admin notes saved successfully');
      setEnquiries((prev) =>
        prev.map((e) => (e._id === selectedEnquiry._id ? { ...e, adminNotes } : e))
      );
    } catch (err) {
      alert(err.message || 'Failed to save notes');
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/contact/admin/${deleteModal._id}`);
      showToast('Enquiry deleted successfully');
      setDeleteModal(null);
      if (selectedEnquiry?._id === deleteModal._id) {
        setSelectedEnquiry(null);
      }
      fetchEnquiries();
    } catch (err) {
      alert(err.message || 'Failed to delete enquiry');
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
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact & Bulk Enquiries</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review customer inquiries, wholesale requests, and message history.
        </p>
      </div>

      {/* Status Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
            Total Enquiries
          </span>
          <span className="text-2xl font-extrabold">{counts.total}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('new')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'new'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-white text-rose-700 border-rose-200 hover:border-rose-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
            New / Unread
          </span>
          <span className="text-2xl font-extrabold">{counts.new}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('read')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'read'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white text-blue-700 border-blue-200 hover:border-blue-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
            In Review / Read
          </span>
          <span className="text-2xl font-extrabold">{counts.read}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('resolved')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'resolved'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-emerald-700 border-emerald-200 hover:border-emerald-300'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
            Resolved
          </span>
          <span className="text-2xl font-extrabold">{counts.resolved}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by name, email, phone or subject..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-forest outline-none transition-all"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Showing {enquiries.length} results
        </span>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Subject & Message</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-bold text-slate-900 text-sm">{enq.name}</p>
                      <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{enq.email}</span>
                      </p>
                      {enq.phone && (
                        <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{enq.phone}</span>
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-3.5 max-w-sm">
                      <p className="font-semibold text-slate-800">{enq.subject}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{enq.message}</p>
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ${
                          enq.status === 'new'
                            ? 'bg-rose-100 text-rose-700'
                            : enq.status === 'read'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="px-6 py-3.5 text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(enq)}
                          className="p-1.5 text-brand-forest hover:bg-brand-forest/10 rounded-lg"
                          title="View full enquiry"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteModal(enq)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                          title="Delete enquiry"
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
            No contact enquiries found for this filter.
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Enquiry Details
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <span
                className={`text-[10px] font-bold uppercase rounded-full px-2.5 py-1 ${
                  selectedEnquiry.status === 'new'
                    ? 'bg-rose-100 text-rose-700'
                    : selectedEnquiry.status === 'read'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {selectedEnquiry.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <p className="text-slate-400 font-medium">Customer Name</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedEnquiry.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Date Received</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Email Address</p>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-brand-forest hover:underline mt-0.5 block">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Phone Number</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedEnquiry.phone || 'Not provided'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Message Body
              </p>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-line">
                {selectedEnquiry.message}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Internal Admin Notes
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add follow-up notes, phone call summaries, or order status..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none resize-none"
              ></textarea>
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[11px] font-semibold"
                >
                  Save Notes
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Change Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none"
                >
                  <option value="new">New</option>
                  <option value="read">Read / Reviewing</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-600 rounded-xl border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Delete Enquiry?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete the enquiry from <span className="font-semibold text-slate-700">"{deleteModal.name}"</span>?
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

export default AdminEnquiries;
