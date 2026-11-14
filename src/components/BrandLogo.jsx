import React from 'react';

/**
 * Geometric architectural emblem representing two peer orbits & a shared node.
 */
export function BrandMark({ className = 'w-4 h-4', strokeWidth = 2, inverted = false }) {
  const primaryStroke = inverted ? '#FFFFFF' : '#1D1D1F';
  const accentColor = inverted ? '#FFFFFF' : '#0859D4';
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-none`} aria-hidden="true">
      {/* Outer compass orbit */}
      <path
        d="M17.2 6.8A7.5 7.5 0 1 0 19 14.2"
        stroke={primaryStroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Interlocking cobalt learning arc */}
      <path
        d="M8.5 14.5L13 10L17.5 14.5"
        stroke={accentColor}
        strokeWidth={strokeWidth + 0.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Shared peer node */}
      <circle cx="17.5" cy="7.5" r="2" fill={accentColor} />
    </svg>
  );
}

export function BrandLogo({
  size = 'md',
  showWordmark = true,
  className = '',
}) {
  const sizes = {
    sm: { box: 'w-6 h-6', icon: 'w-3.5 h-3.5', text: 'text-sm', editorial: 'text-base' },
    md: { box: 'w-7 h-7', icon: 'w-4 h-4', text: 'text-sm sm:text-base', editorial: 'text-lg' },
    lg: { box: 'w-8 h-8', icon: 'w-4.5 h-4.5', text: 'text-lg', editorial: 'text-xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative ${s.box} rounded-full border border-[#0859D4]/30 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(8,89,212,0.12)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6`}
      >
        <BrandMark className={s.icon} />
      </span>
      {showWordmark && (
        <span className={`font-display font-bold ${s.text} tracking-tight text-[#1D1D1F] flex items-baseline gap-1`}>
          Campus{' '}
          <span className={`font-editorial italic text-[#0859D4] font-normal ${s.editorial} leading-none`}>
            Learn
          </span>
        </span>
      )}
    </span>
  );
}

export default BrandLogo;
