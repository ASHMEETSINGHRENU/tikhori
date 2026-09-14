import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowLeft, UserPlus, Phone } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const UserRegisterPage = () => {
  const { register: registerUser } = useUserAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      phone: ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMessage('');
    try {
      await registerUser(data);
      navigate('/', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-forest/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src="/assets/logo/logo.png"
              alt="Tikhori Foods Logo"
              className="h-16 w-16 mx-auto object-contain filter drop-shadow-md hover:scale-105 transition-transform"
            />
          </Link>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-charcoal">
            {language === 'hi' ? 'नया खाता बनाएं' : 'Create Account'}
          </h2>
          <p className="mt-1 text-xs text-brand-stone">
            {language === 'hi'
              ? 'टिखोरी फूड्स परिवार से जुड़ें और शुद्ध मसालों का अनुभव लें'
              : 'Join the Tikhori Foods family for clean organic spices & direct updates'}
          </p>
        </div>

        <div className="mt-8 bg-white border border-brand-border/80 rounded-3xl p-8 sm:p-10 shadow-soft">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red-dark flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                {language === 'hi' ? 'उपयोगकर्ता नाम (Username)' : 'Username'} <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Must be at least 3 characters' },
                    pattern: {
                      value: /^[a-zA-Z0-9_.-]+$/,
                      message: 'Letters, numbers, underscores, dashes only'
                    }
                  })}
                  placeholder="e.g. priya_sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-sand/30 text-xs focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-all text-brand-charcoal"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-brand-red mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                {language === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="e.g. priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-sand/30 text-xs focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-all text-brand-charcoal"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-brand-red mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                {language === 'hi' ? 'पूरा नाम (वैकल्पिक)' : 'Full Name (Optional)'}
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-sand/30 text-xs focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-all text-brand-charcoal"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                {language === 'hi' ? 'फ़ोन नंबर (वैकल्पिक)' : 'Phone Number (Optional)'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+91 98765 00000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-sand/30 text-xs focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-all text-brand-charcoal"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
                {language === 'hi' ? 'पासवर्ड (कम से कम 6 अक्षर)' : 'Password'} <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-brand-border bg-brand-sand/30 text-xs focus:border-brand-forest focus:ring-1 focus:ring-brand-forest outline-none transition-all text-brand-charcoal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-brand-stone hover:text-brand-charcoal absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-brand-red mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{language === 'hi' ? 'खाता बनाएं' : 'Register Account'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-brand-border/60 text-center">
            <p className="text-xs text-brand-stone">
              {language === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
              <Link
                to="/login"
                className="font-bold text-brand-forest hover:text-brand-forest-light underline underline-offset-2 ml-1"
              >
                {language === 'hi' ? 'लॉगिन करें' : 'Sign In'}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-brand-stone hover:text-brand-forest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Storefront'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
