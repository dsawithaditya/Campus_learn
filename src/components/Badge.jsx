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
    primary: 'bg-[#0859D4]/10 text-[#0859D4]',
    accent: 'bg-[#0859D4]/10 text-[#0859D4]',
    neutral: 'bg-[#F5F5F7] text-[#424242]',
    outline: 'border border-black/15 text-[#424242] bg-transparent',
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

