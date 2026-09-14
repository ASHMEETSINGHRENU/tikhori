import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Award, Users, Sprout, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import EntrepreneurCard from './EntrepreneurCard';

export const WomenEmpowermentSection = ({ content, entrepreneurs = [] }) => {
  const { t, tr, language } = useLanguage();
  const empowerment = content?.empowerment || {};

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
    <section id="women-empowerment" className="py-20 bg-brand-sand/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold text-brand-red-dark uppercase tracking-widest bg-brand-red/10 px-3.5 py-1 rounded-full border border-brand-red/20 inline-flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t(empowerment.tagline, language === 'hi' ? 'सामाजिक प्रभाव' : 'Social Impact')}</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal mt-3 mb-4">
            {t(empowerment.title, 'Empowering Women. Strengthening Rural Businesses.')}
          </h2>

          <p className="font-medium text-lg text-brand-forest">
            {t(empowerment.heading, 'More Than Spices. A Purpose to Empower.')}
          </p>

          <p className="text-sm sm:text-base text-brand-stone leading-relaxed mt-3">
            {t(
              empowerment.story,
              'Tikhori Foods believes that meaningful economic growth begins at the grassroots level. By partnering with women entrepreneurs and rural micro-enterprises, we help establish sustainable processing clusters, provide fair earnings, and foster financial independence for rural households.'
            )}
          </p>
        </div>

        {/* Visual Impact Flow Diagram */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xs font-bold text-brand-stone uppercase tracking-widest">
              {tr('sectionImpactTitle')}
            </h3>
            <p className="text-xs text-brand-stone/80 mt-0.5">
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

        {/* Dynamic Women Entrepreneur Stories (Only if profiles exist) */}
        {entrepreneurs && entrepreneurs.length > 0 && (
          <div className="mt-12 pt-12 border-t border-brand-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                  {language === 'hi' ? 'मिलिए हमारी ग्रामीण महिला उद्यमियों से' : 'Meet the Women Behind the Journey'}
                </h3>
                <p className="text-xs text-brand-stone mt-1">
                  {language === 'hi'
                    ? 'प्रत्यक्ष प्रेरणा, वास्तविक कहानियां और सम्मानजनक काम।'
                    : 'Real stories of leadership, rural resilience, and purposeful craft.'}
                </p>
              </div>

              <Link
                to="/women-empowerment"
                className="text-xs font-semibold text-brand-forest hover:text-brand-forest-light inline-flex items-center gap-1 shrink-0"
              >
                <span>{language === 'hi' ? 'सभी कहानियां देखें' : 'View Full Journey'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entrepreneurs.slice(0, 2).map((item) => (
                <EntrepreneurCard key={item._id} entrepreneur={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WomenEmpowermentSection;
