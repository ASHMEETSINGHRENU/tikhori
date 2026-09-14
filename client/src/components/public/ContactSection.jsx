import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

export const ContactSection = ({ settings }) => {
  const { t, tr, language } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await api.post('/contact', data);
      if (res.data?.success) {
        setSubmitStatus('success');
        setStatusMessage(
          language === 'hi'
            ? 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम शीघ्र आपसे संपर्क करेंगे।'
            : 'Thank you! Your enquiry has been received. Our team will reach out shortly.'
        );
        reset();
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-sand/40 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-forest uppercase tracking-widest bg-brand-forest/10 px-3 py-1 rounded-full border border-brand-forest/20">
            {language === 'hi' ? 'सीधा संपर्क' : 'Direct Reach'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mt-3 mb-4">
            {tr('contactTitle')}
          </h2>
          <p className="text-base text-brand-stone">
            {tr('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-soft space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-charcoal border-b border-brand-border pb-3">
                {language === 'hi' ? 'कार्यालय विवरण' : 'Office & Inquiries'}
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-forest/10 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      {language === 'hi' ? 'पता' : 'Address'}
                    </h4>
                    <p className="text-brand-stone mt-0.5 leading-relaxed">
                      {t(settings?.address, 'Plot 42, Spice Industrial Zone, Rural Enterprise Corridor, India')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      {language === 'hi' ? 'फ़ोन नंबर' : 'Phone'}
                    </h4>
                    <p className="text-brand-stone mt-0.5">
                      {settings?.contactPhone || '+91 98765 43210'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-red/10 text-brand-red-dark flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      {language === 'hi' ? 'ईमेल' : 'Email'}
                    </h4>
                    <p className="text-brand-stone mt-0.5">
                      {settings?.contactEmail || 'care@tikhorifoods.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-sand text-brand-charcoal flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                      {language === 'hi' ? 'कार्य समय' : 'Business Hours'}
                    </h4>
                    <p className="text-brand-stone mt-0.5">
                      {t(settings?.businessHours, 'Mon - Sat: 9:00 AM - 6:00 PM IST')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro promise card */}
            <div className="p-6 rounded-2xl bg-brand-forest text-white shadow-soft">
              <h4 className="font-serif text-base font-bold mb-1">
                {language === 'hi' ? 'थोक एवं व्यावसायिक पूछताछ' : 'Bulk & Institutional Inquiries'}
              </h4>
              <p className="text-xs text-brand-ivory/80 leading-relaxed">
                {language === 'hi'
                  ? 'हम स्थानीय किराना स्टोर्स, ऑर्गेनिक मार्केट्स और फूड कैटरर्स के साथ सीधे कार्य करते हैं।'
                  : 'We partner directly with certified grocery retailers, organic stores, and hospitality partners.'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-border/80 shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-6">
                {language === 'hi' ? 'संदेश भेजें' : 'Send an Enquiry'}
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-brand-forest/10 border border-brand-forest/20 text-brand-forest flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red-dark flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                      {tr('formName')} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-sm transition-all bg-brand-ivory/40"
                    />
                    {errors.name && (
                      <p className="text-xs text-brand-red mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                      {tr('formEmail')} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-sm transition-all bg-brand-ivory/40"
                    />
                    {errors.email && (
                      <p className="text-xs text-brand-red mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                      {tr('formPhone')}
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-sm transition-all bg-brand-ivory/40"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                      {tr('formSubject')} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="e.g. Bulk Order / Product Query"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-sm transition-all bg-brand-ivory/40"
                    />
                    {errors.subject && (
                      <p className="text-xs text-brand-red mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                    {tr('formMessage')} <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    rows={4}
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none text-sm transition-all bg-brand-ivory/40 resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-brand-red mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-full bg-brand-forest hover:bg-brand-forest-light text-white text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <span>{tr('ctaSending')}</span>
                  ) : (
                    <>
                      <span>{tr('ctaSendEnquiry')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
