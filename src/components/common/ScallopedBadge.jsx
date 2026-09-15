import React from 'react';

/**
 * ScallopedBadge
 * Inspired by Tikhori logo's circular sunburst / scalloped ring.
 * Used for origin stamps, certifications (100% Organic, Small Batch, Stone-Ground), and stickers.
 */
export const ScallopedBadge = ({
  textTop = '',
  textMain = '100%',
  textSub = 'NATURAL',
  variant = 'yellow', // 'yellow' | 'green' | 'red' | 'cream'
  size = 'md', // 'sm' | 'md' | 'lg'
  rotate = 0,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-20 h-20 text-[10px]',
    md: 'w-28 h-28 text-xs',
    lg: 'w-36 h-36 text-sm'
  };

  const variantStyles = {
    yellow: {
      ring: '#F2C230',
      disc: '#1B4D2E',
      textTop: '#F2C230',
      textMain: '#FDF6E9',
      textSub: '#F2C230'
    },
    green: {
      ring: '#1B4D2E',
      disc: '#F2C230',
      textTop: '#1B4D2E',
      textMain: '#1B4D2E',
      textSub: '#1B4D2E'
    },
    red: {
      ring: '#D6301F',
      disc: '#1B4D2E',
      textTop: '#FDF6E9',
      textMain: '#F2C230',
      textSub: '#FDF6E9'
    },
    cream: {
      ring: '#FDF6E9',
      disc: '#1B4D2E',
      textTop: '#F2C230',
      textMain: '#FDF6E9',
      textSub: '#F2C230'
    }
  };

  const style = variantStyles[variant] || variantStyles.yellow;

  // Generate 24 scalloped points path for smooth sunburst seal
  const points = 24;
  const outerR = 48;
  const innerR = 43;
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    d += (i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `);
  }
  d += 'Z';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none font-display ${sizeMap[size]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Scalloped Ring */}
        <path d={d} fill={style.ring} />
        {/* Inner Solid Disc */}
        <circle cx="50" cy="50" r="39" fill={style.disc} />
        {/* Inner Dashed Stitch Ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={style.ring}
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
          opacity="0.8"
        />
      </svg>

      {/* Centered Badge Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 pointer-events-none leading-tight">
        {textTop && (
          <span
            className="text-[9px] font-bold tracking-widest uppercase mb-0.5 opacity-90"
            style={{ color: style.textTop }}
          >
            {textTop}
          </span>
        )}
        <span
          className="font-black tracking-tight leading-none text-base sm:text-lg"
          style={{ color: style.textMain }}
        >
          {textMain}
        </span>
        {textSub && (
          <span
            className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase mt-0.5"
            style={{ color: style.textSub }}
          >
            {textSub}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScallopedBadge;
