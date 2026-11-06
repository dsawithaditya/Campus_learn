import React from 'react';

export function OrangeHorizonLight({
  className = '',
  intensity = 'high',
  height = 'h-[220px]',
  lineOpacity = 'opacity-90',
}) {
  const isHigh = intensity === 'high';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center overflow-visible ${className}`}
    >
      {/* Broad warm diffuse orange bloom */}
      <div
        className={`w-full max-w-6xl ${height} bg-[radial-gradient(ellipse_at_bottom,_rgba(255,107,0,${
          isHigh ? '0.52' : '0.32'
        })_0%,_rgba(245,158,11,${
          isHigh ? '0.24' : '0.14'
        })_35%,_rgba(255,107,0,0.06)_65%,_transparent_80%)] blur-3xl`}
      />

      {/* Intense concentrated core glow */}
      <div
        className={`absolute bottom-0 w-[580px] max-w-full h-[95px] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,170,0,${
          isHigh ? '0.85' : '0.55'
        })_0%,_rgba(255,107,0,${
          isHigh ? '0.5' : '0.3'
        })_50%,_transparent_80%)] blur-xl`}
      />

      {/* Luminous razor-thin horizon line */}
      <div
        className={`absolute bottom-0 w-full max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-[#FF6B00] via-[#FFA726] to-transparent ${lineOpacity} shadow-[0_0_30px_3px_rgba(255,107,0,0.75)]`}
      />
    </div>
  );
}

export default OrangeHorizonLight;
