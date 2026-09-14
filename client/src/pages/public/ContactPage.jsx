import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ContactSection from '../../components/public/ContactSection';

export const ContactPage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-brand-ivory min-h-screen">
      <ContactSection settings={settings} />
    </div>
  );
};

export default ContactPage;
