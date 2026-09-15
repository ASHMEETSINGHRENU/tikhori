import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  HeartHandshake,
  Image as ImageIcon,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalUsers: 0,
    activeBanners: 0,
    totalEnquiries: 0,
    unreadEnquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, userRes, bannerRes, enqRes] = await Promise.allSettled([
          api.get('/products/admin/all'),
          api.get('/users'),
          api.get('/banners/admin/all'),
          api.get('/contact/admin/all')
        ]);

        const products = prodRes.status === 'fulfilled' ? prodRes.value.data?.data || [] : [];
        const users = userRes.status === 'fulfilled' ? userRes.value.data?.data || [] : [];
        const banners = bannerRes.status === 'fulfilled' ? bannerRes.value.data?.data || [] : [];
        const enquiries = enqRes.status === 'fulfilled' ? enqRes.value.data?.data || [] : [];

        setStats({
          totalProducts: products.length,
          activeProducts: products.filter((p) => p.isActive).length,
          totalUsers: users.length,
          activeBanners: banners.filter((b) => b.isActive).length,
          totalEnquiries: enquiries.length,
          unreadEnquiries: enquiries.filter((e) => e.status === 'new').length
        });

        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      subtext: `${stats.activeProducts} active on store`,
      icon: Package,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      link: '/admin/products'
    },
    {
      title: 'Registered Users',
      value: stats.totalUsers,
      subtext: 'Client & buyer accounts',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      link: '/admin/users'
    },
    {
      title: 'Active Banners',
      value: stats.activeBanners,
      subtext: 'Promotional posters running',
      icon: ImageIcon,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      link: '/admin/banners'
    },
    {
      title: 'Contact Enquiries',
      value: stats.totalEnquiries,
      subtext: `${stats.unreadEnquiries} new / unread`,
      icon: Mail,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      link: '/admin/enquiries'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of products, enquiries, dynamic content, and community stories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-semibold tracking-wide transition-colors shadow-sm"
          >
            <Package className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-600">{card.title}</span>
                <div className={`p-2.5 rounded-xl border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-slate-900">{card.value}</span>
                <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                  <span>{card.subtext}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-slate-700" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/admin/content"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-forest transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900">Website Content CMS</h4>
            <p className="text-xs text-slate-500 mt-0.5">Edit bilingual Hero, About, Quality & Mission</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/admin/users"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-forest transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900">Client / Customer Directory</h4>
            <p className="text-xs text-slate-500 mt-0.5">Manage store partners and wholesale leads</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/admin/settings"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-forest transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900">Brand Settings</h4>
            <p className="text-xs text-slate-500 mt-0.5">Update phone, email, address & social links</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Recent Contact Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Customer & Bulk Enquiries</h3>
            <p className="text-xs text-slate-500">Latest messages submitted via the public contact form</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-brand-forest hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-semibold text-slate-900">{enq.name}</p>
                      <p className="text-[11px] text-slate-400">{enq.email}</p>
                    </td>
                    <td className="px-6 py-3.5 max-w-xs truncate">
                      <span className="font-medium text-slate-800">{enq.subject}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'new'
                            ? 'bg-rose-100 text-rose-700'
                            : enq.status === 'read'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="text-brand-forest hover:text-brand-forest-light font-semibold"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No contact enquiries submitted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
