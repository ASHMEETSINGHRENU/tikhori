import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { LanguageProvider } from './context/LanguageContext';
import api from './services/api';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import QualityPage from './pages/public/QualityPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import UserLoginPage from './pages/public/UserLoginPage';
import UserRegisterPage from './pages/public/UserRegisterPage';

// Admin Components & Pages
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBanners from './pages/admin/AdminBanners';
import AdminContent from './pages/admin/AdminContent';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSettings from './pages/admin/AdminSettings';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Container
const PublicLayout = () => {
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [sRes, cRes] = await Promise.allSettled([
          api.get('/settings'),
          api.get('/content')
        ]);
        if (sRes.status === 'fulfilled' && sRes.value.data?.success) {
          setSettings(sRes.value.data.data);
        }
        if (cRes.status === 'fulfilled' && cRes.value.data?.success) {
          setContent(cRes.value.data.data);
        }
      } catch (err) {
        console.error('Error fetching layout metadata:', err);
      }
    };
    fetchMeta();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer settings={settings} content={content} />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/quality" element={<QualityPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<UserLoginPage />} />
                <Route path="/register" element={<UserRegisterPage />} />
              </Route>

              {/* Admin Authentication Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Dashboard Protected Routes */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/:id/edit" element={<AdminProductForm />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="banners" element={<AdminBanners />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="enquiries" element={<AdminEnquiries />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;
