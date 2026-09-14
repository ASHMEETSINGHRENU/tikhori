import React, { useState, useEffect } from 'react';
import { HeartHandshake, Sprout, Users, Award, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import EntrepreneurCard from '../../components/public/EntrepreneurCard';

export const WomenEmpowermentPage = () => {
  const { t, tr, language } = useLanguage();
  const [content, setContent] = useState({});
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, entreRes] = await Promise.allSettled([
          api.get('/content/empowerment'),
          api.get('/entrepreneurs')
        ]);
        if (contentRes.status === 'fulfilled' && contentRes.value.data?.success) {
          setContent(contentRes.value.data.data);
        }
        if (entreRes.status === 'fulfilled' && entreRes.value.data?.success) {
          setEntrepreneurs(entreRes.value.data.data);
        }
      } catch (err) {
        console.error('Error fetching empowerment page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const empowerment = content || {};

  const impactSteps = [
    {
      icon: Sprout,
      title: tr('flowStep1'),
      desc: language === 'hi' ? 'प्राकृतिक जैविक खेती व सीधे संबंध' : 'Direct sourcing with fair farmer remuneration'
    },
    {
      icon: Users,
      title: tr('flowStep2'),
      desc: language === 'hi' ? 'महिला स्वयं-सहायता समूहों का गठन' : 'Equipping village women with grading & processing skills'
    },
    {
      icon: Award,
      title: tr('flowStep3'),
      desc: language === 'hi' ? 'स्वच्छता व प्रामाणिक शुद्धता' : 'Uncompromising purity, destemming, and aroma retention'
    },
    {
      icon: TrendingUp,
      title: tr('flowStep4'),
      desc: language === 'hi' ? 'सम्मानजनक आजीविका व आत्मनिर्भरता' : 'Financial independence and dignity in rural households'
    }
  ];

  return (
    <div className="py-16 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-red-dark uppercase tracking-widest bg-brand-red/10 px-3.5 py-1 rounded-full border border-brand-red/20 inline-flex items-center gap-1.5 mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t(empowerment.tagline, language === 'hi' ? 'सामाजिक प्रभाव' : 'Social Impact')}</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
            {t(empowerment.title, 'Empowering Women. Strengthening Rural Businesses.')}
          </h1>

          <p className="font-medium text-lg text-brand-forest mb-4">
            {t(empowerment.heading, 'More Than Spices. A Purpose to Empower.')}
          </p>

          <p className="text-base text-brand-stone leading-relaxed">
            {t(
              empowerment.story,
              'Tikhori Foods believes that meaningful economic growth begins at the grassroots level. By partnering with women entrepreneurs and rural micro-enterprises, we help establish sustainable processing clusters, provide fair earnings, and foster financial independence for rural households.'
            )}
          </p>
        </div>

        {/* Impact Flow Diagram */}
        <div className="mb-20 bg-brand-sand/50 rounded-3xl p-8 sm:p-12 border border-brand-border">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              {tr('sectionImpactTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-brand-stone mt-1">
              {tr('sectionImpactSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-soft relative flex flex-col items-center text-center group hover:border-brand-forest/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/10 text-brand-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-gold-dark tracking-wider uppercase mb-1">
                    Step 0{idx + 1}
                  </span>
                  <h4 className="font-serif text-base font-bold text-brand-charcoal mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-brand-stone leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Women Entrepreneurs Grid */}
        {entrepreneurs && entrepreneurs.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-serif text-3xl font-bold text-brand-charcoal">
                {language === 'hi' ? 'ग्रामीण महिला उद्यमियों की कहानियां' : 'Stories from the Heartlands'}
              </h2>
              <p className="text-xs sm:text-sm text-brand-stone mt-2">
                {language === 'hi'
                  ? 'यह सिर्फ मसाले नहीं, आत्मनिर्भरता और गरिमा की जीवंत यात्रा है।'
                  : 'Real stories of women pioneering spice processing clusters in their villages.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {entrepreneurs.map((item) => (
                <EntrepreneurCard key={item._id} entrepreneur={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenEmpowermentPage;
