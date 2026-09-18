import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowLeft, UserCheck, Sparkles } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ScallopedBadge from '../../components/common/ScallopedBadge';

export const UserLoginPage = () => {
  const { login } = useUserAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollBackdropSrc = encodeURI('/assets/SEPARATE PAGE HERO BANNERS/Gemini_Generated_Image_cog7tmcog7tmcog7.png');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMessage('');
    try {
      await login(data.identifier, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please verify your credentials.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Scroll Backdrop */}
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
            <span>{language === 'hi' ? 'ग्राहक पोर्टल' : 'CUSTOMER PORTAL'}</span>
          </div>
          <h2 className="font-display text-3xl font-black text-[#1B4D2E]">
            {language === 'hi' ? 'ग्राहक लॉगिन' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-[#5A483E]">
            {language === 'hi'
              ? 'टिखोरी फूड्स के साथ अपने शुद्ध मसालों की यात्रा जारी रखें'
              : 'Sign in with your Email Address or Username'}
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
            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'ईमेल पता या यूज़रनेम' : 'Email Address or Username'}{' '}
                <span className="text-[#D6301F]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoComplete="username email"
                  {...register('identifier', { required: language === 'hi' ? 'ईमेल या यूज़रनेम आवश्यक है' : 'Email or Username is required' })}
                  placeholder={language === 'hi' ? 'उदा. your_username या user@example.com' : 'e.g. your_username or user@example.com'}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14] font-medium"
                />
              </div>
              {errors.identifier && (
                <p className="text-xs text-[#D6301F] mt-1">{errors.identifier.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-[#1B4D2E] uppercase tracking-wider mb-1">
                {language === 'hi' ? 'पासवर्ड' : 'Password'} <span className="text-[#D6301F]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C7C72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', { required: language === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required' })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-full border border-[#E8DFCF] bg-[#FDF6E9]/40 text-xs focus:border-[#1B4D2E] outline-none transition-all text-[#2B1D14]"
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
                ? (language === 'hi' ? 'सत्यापित किया जा रहा है...' : 'Verifying...')
                : (language === 'hi' ? 'साइन इन करें' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E8DFCF] text-center space-y-3">
            <p className="text-xs text-[#5A483E]">
              {language === 'hi' ? 'क्या आपका खाता नहीं है?' : "Don't have an account yet?"}{' '}
              <Link to="/register" className="font-bold text-[#D6301F] hover:underline">
                {language === 'hi' ? 'नया खाता बनाएं' : 'Create Account'}
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

export default UserLoginPage;
