import React from 'react';

export function Skeleton({
  variant = 'text', // 'text' | 'rect' | 'circle' | 'card'
  width,
  height,
  className = '',
}) {
  const baseShimmer =
    'animate-pulse bg-slate-200/80 dark:bg-slate-700/60 rounded-md overflow-hidden relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent';

  if (variant === 'circle') {
    return (
      <div
        className={`${baseShimmer} rounded-full ${className}`}
        style={{ width: width || 44, height: height || 44 }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-4 space-y-3">
        <div className="w-full aspect-[16/10] bg-slate-200 dark:bg-slate-700/60 rounded-md animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-1/3 animate-pulse" />
        <div className="h-5 bg-slate-200 dark:bg-slate-700/60 rounded w-4/5 animate-pulse" />
        <div className="flex items-center gap-2 pt-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700/60 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseShimmer} ${variant === 'rect' ? 'rounded-md' : 'rounded-sm'} ${className}`}
      style={{
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
      }}
    />
  );
}

