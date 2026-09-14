import React from 'react';

export const Badge = ({ children, variant = 'forest', size = 'sm', className = '' }) => {
  const variantStyles = {
    forest: 'bg-brand-forest/10 text-brand-forest border-brand-forest/20',
    gold: 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/20',
    red: 'bg-brand-red/10 text-brand-red-dark border-brand-red/20',
    neutral: 'bg-brand-sand text-brand-stone border-brand-border',
    dark: 'bg-brand-charcoal text-white border-brand-charcoal'
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[10px] font-medium tracking-wide',
    sm: 'px-2.5 py-1 text-xs font-medium tracking-wide',
    md: 'px-3.5 py-1.5 text-xs font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border uppercase ${variantStyles[variant] || variantStyles.forest} ${sizeStyles[size] || sizeStyles.sm} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
