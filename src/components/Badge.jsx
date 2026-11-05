import React from 'react';

export function Badge({
  children,
  variant = 'primary', // 'primary' | 'accent' | 'neutral' | 'outline'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-pill font-medium gap-1',
    md: 'text-[13px] px-2.5 py-1 rounded-pill font-semibold gap-1.5',
  };

  const variantStyles = {
    primary: 'bg-primary-soft text-primary dark:bg-primary-soft/15 dark:text-primary-contrast',
    accent: 'bg-accent-soft text-accent dark:bg-accent-soft/15 dark:text-[#FFA194]',
    neutral: 'bg-slate-100 text-muted dark:bg-slate-800 dark:text-muted-dark',
    outline: 'border border-border dark:border-border-dark text-muted dark:text-muted-dark bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-body ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
    </span>
  );
}

