import React, { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import AboutSection from '../../components/public/AboutSection';
import QualityProcessSection from '../../components/public/QualityProcessSection';

export const AboutPage = () => {
  const { t, language } = useLanguage();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        if (res.data?.success) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching about page content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="bg-brand-ivory min-h-screen">
      <AboutSection content={content} />
      <QualityProcessSection content={content} />
    </div>
  );
};

export default AboutPage;
