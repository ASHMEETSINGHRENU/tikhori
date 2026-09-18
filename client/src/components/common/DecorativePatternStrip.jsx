import React from 'react';

/**
 * DecorativePatternStrip
 * Visual separator using authentic hand-printed Indian textile & botanical spice patterns
 * from /assets/DECORATIVE PATTERN  TRANSITION BANNERS/
 *
 * Supports:
 * - 'botanical': Hand-drawn botanical spice border (chillies, turmeric roots, coriander, marigolds)
 * - 'paisley': Vintage block-printed Indian paisley motif on warm parchment
 * - Legacy variants ('cream', 'forest', 'gold') for backward compatibility
 */
export const DecorativePatternStrip = ({
  variant = 'botanical', // 'botanical' | 'paisley' | 'cream' | 'forest' | 'gold'
  speed = 'normal', // 'normal' | 'slow'
  height = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  seamless = true
}) => {
  // Map variant to image asset
  const isPaisley = variant === 'paisley' || variant === 'forest';
  const patternSrc = isPaisley
    ? '/assets/decorative-patterns/Gemini_Generated_Image_7rrakh7rrakh7rra.png'
    : '/assets/decorative-patterns/Gemini_Generated_Image_av7xeiav7xeiav7x.png';

  const heightClasses = {
    sm: 'h-12 sm:h-14',
    md: 'h-16 sm:h-20 lg:h-24',
    lg: 'h-24 sm:h-28 lg:h-32'
  };

  const bgClasses = {
    botanical: 'bg-[#FDF6E9]',
    paisley: 'bg-[#FDF6E9]',
    cream: 'bg-[#FDF6E9]',
    forest: 'bg-[#1B4D2E]',
    gold: 'bg-[#F2C230]'
  };

  return (
    <div
      role="separator"
      aria-label="Decorative pattern divider"
      className={`w-full overflow-hidden relative select-none border-t border-b border-[#E8DFCF]/70 ${heightClasses[height] || heightClasses.md} ${bgClasses[variant] || 'bg-[#FDF6E9]'} ${className}`}
    >
      {/* Repeating Pattern Track with Smooth Continuous Marquee */}
      <div className="flex w-max h-full animate-marquee hover:[animation-play-state:paused] pointer-events-none">
        <div className="flex items-center h-full flex-shrink-0">
          <img
            src={patternSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-cover max-w-none opacity-90"
            loading="lazy"
          />
          <img
            src={patternSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-cover max-w-none opacity-90"
            loading="lazy"
          />
        </div>
        <div className="flex items-center h-full flex-shrink-0">
          <img
            src={patternSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-cover max-w-none opacity-90"
            loading="lazy"
          />
          <img
            src={patternSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-cover max-w-none opacity-90"
            loading="lazy"
          />
        </div>
      </div>

      {/* Subtle paper grain texture & edge shading */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E9]/40 via-transparent to-[#FDF6E9]/40 pointer-events-none"></div>
    </div>
  );
};

export default DecorativePatternStrip;
