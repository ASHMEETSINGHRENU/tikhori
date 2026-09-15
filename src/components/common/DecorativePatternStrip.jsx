import React from 'react';

/**
 * DecorativePatternStrip
 * Custom repeating spice, chili, and heritage motif strip
 * Features continuous GPU-accelerated horizontal marquee animation
 * that pauses gently on mouse hover.
 */
export const DecorativePatternStrip = ({
  variant = 'cream', // 'cream' | 'forest' | 'gold'
  speed = 'normal', // 'normal' | 'slow'
  className = ''
}) => {
  const bgStyles = {
    cream: 'bg-[#FDF6E9] border-t border-b border-[#E8DFCF]',
    forest: 'bg-[#1B4D2E] border-t border-b border-[#123620]',
    gold: 'bg-[#F2C230] border-t border-b border-[#D4A21A]'
  };

  const renderUnits = (keyPrefix) =>
    Array.from({ length: 10 }).map((_, i) => (
      <div key={`${keyPrefix}-${i}`} className="flex items-center gap-5 flex-shrink-0 px-2">
        {/* Chili Icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D6301F] fill-current transform -rotate-12 transition-transform hover:scale-125" aria-hidden="true">
          <path d="M12 2C11.5 2 11 2.5 11 3C11 3.5 11.2 4 11.5 4.3C8.5 6 6 9.5 6 14C6 18.4 9.6 22 14 22C14.6 22 15 21.6 15 21C15 15 13 9 12 2Z" />
          <path d="M13 2C13.5 2 15 1 16 0" stroke="#1B4D2E" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Diamond Star Accent */}
        <span className="text-[#F2C230] font-black text-sm select-none">✦</span>

        {/* Heritage Mustache Accent */}
        <svg viewBox="0 0 32 16" className="w-6 h-3 text-[#2B1D14] fill-current opacity-70" aria-hidden="true">
          <path d="M16 8C14 5 10 3 4 5C1 6 0 9 2 10C5 11 10 11 15 8C17 11 22 11 25 10C27 9 26 6 23 5C17 3 13 5 16 8Z" />
        </svg>

        {/* Diamond Accent */}
        <span className="text-[#D6301F] font-black text-xs select-none">◆</span>

        {/* Spice Jar Silhouette */}
        <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#1B4D2E] fill-current" aria-hidden="true">
          <rect x="5" y="2" width="10" height="3" rx="1.5" />
          <path d="M4 6H16V17C16 18.1 15.1 19 14 19H6C4.9 19 4 18.1 4 17V6Z" />
          <circle cx="10" cy="12" r="2" fill="#F2C230" />
        </svg>

        {/* Brand Text Badge */}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 select-none">
          SPICE CRAFTED RIGHT
        </span>

        {/* Golden Star */}
        <span className="text-[#F2C230] font-black text-xs select-none">✦</span>
      </div>
    ));

  return (
    <div className={`w-full overflow-hidden py-2.5 select-none relative ${bgStyles[variant] || bgStyles.cream} ${className}`}>
      {/* Seamless infinite marquee flex container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
        <div className="flex items-center">
          {renderUnits('track1')}
        </div>
        <div className="flex items-center">
          {renderUnits('track2')}
        </div>
      </div>
    </div>
  );
};

export default DecorativePatternStrip;
