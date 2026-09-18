import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowLeft, Phone, Sparkles } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const UserRegisterPage = () => {
  const { register: registerUser } = useUserAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollBackdropSrc = '/assets/page-heroes/Gemini_Generated_Image_cog7tmcog7tmcog7.png';

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
    <div className="min-h-screen bg-[#FDF6E9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Scroll Backdrop */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <img
          src={scrollBackdropSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block hover:scale-105 transition-transform">
            <img
              src="/assets/logo/logo.png"
              alt="Tikhori Foods Logo"
              className="h-20 w-20 mx-auto object-contain filter drop-shadow-md"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4D2E]/10 border border-[#1B4D2E]/20 text-[#1B4D2E] text-[10px] font-black tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3 text-[#D4A21A]" />
            <span>{language === 'hi' ? 'नया सदस्य' : 'JOIN OUR FAMILY'}</span>
          </div>
          <h2 className="font-display text-3xl font-black text-[#1B4D2E]">
            {language === 'hi' ? 'नया खाता बनाएं' : 'Create Account'}
          </h2>
          <p className="text-xs text-[#5A483E]">
            {language === 'hi'
              ? 'टिखोरी फूड्स परिवार से जुड़ें और शुद्ध मसालों का अनुभव लें'
              : 'Join the Tikhori Foods family for clean organic spices & member perks'}
          </p>
        </div>

        <div className="mt-8 bg-white border-2 border-[#E8DFCF] rounded-3xl p-8 sm:p-10 shadow-xl relative">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#D6301F]/10 border border-[#D6301F]/20 text-[#D6301F] flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'उपयोगकर्ता नाम (Username)' : 'Username'} <span className="text-[#D6301F]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14] font-medium"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-[#D6301F] mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="text-[#D6301F]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="e.g. priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14] font-medium"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#D6301F] mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-2.5 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14] font-medium"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14] font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'पासवर्ड' : 'Password'} <span className="text-[#D6301F]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Must be at least 6 characters' }
                  })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7C72] hover:text-[#1B4D2E]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#D6301F] mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-shimmer w-full mt-2 py-3.5 px-4 rounded-full bg-[#1B4D2E] hover:bg-[#25663D] text-[#FDF6E9] text-xs font-black tracking-widest uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {submitting
                ? (language === 'hi' ? 'खाता बनाया जा रहा है...' : 'Creating Account...')
                : (language === 'hi' ? 'खाता बनाएं' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E8DFCF] text-center space-y-3">
            <p className="text-xs text-[#5A483E]">
              {language === 'hi' ? 'क्या पहले से खाता है?' : 'Already have an account?'}{' '}
              <Link to="/login" className="font-bold text-[#D6301F] hover:underline">
                {language === 'hi' ? 'साइन इन करें' : 'Sign In'}
              </Link>
            </p>
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#8C7C72] hover:text-[#1B4D2E] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Home'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
