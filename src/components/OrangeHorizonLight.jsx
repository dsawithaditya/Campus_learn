import React from 'react';

export function OrangeHorizonLight({
  className = '',
  intensity = 'high',
  height = 'h-[180px]',
  lineOpacity = 'opacity-80',
}) {
  const isHigh = intensity === 'high';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center overflow-visible ${className}`}
    >
      <div
        className={`w-full max-w-6xl ${height} bg-[radial-gradient(ellipse_at_bottom,_rgba(8,89,212,${
          isHigh ? '0.12' : '0.07'
        })_0%,_rgba(24,160,251,${
          isHigh ? '0.06' : '0.03'
        })_45%,_transparent_78%)] blur-3xl`}
      />
      <div
        className={`absolute bottom-0 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#0859D4]/45 to-transparent ${lineOpacity}`}
      />
    </div>
  );
}

export default OrangeHorizonLight;
