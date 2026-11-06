import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(function Button(
  {
    children,
    variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'interactive'
    size = 'md', // 'sm' | 'md' | 'lg'
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-1.5 min-h-[38px] rounded-lg gap-1.5',
    md: 'text-[14px] md:text-[15px] px-5 py-2.5 min-h-[44px] rounded-xl gap-2 font-semibold',
    lg: 'text-[15px] md:text-[16px] px-6 py-3.5 min-h-[48px] rounded-xl gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'btn-interactive',
    interactive:
      'btn-interactive',
    secondary:
      'border border-white/10 dark:border-white/10 bg-zinc-900/60 dark:bg-zinc-900/60 backdrop-blur-md text-zinc-100 hover:border-orange-500/50 hover:text-orange-400 active:scale-[0.96] shadow-sm group',
    ghost:
      'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/5 active:scale-[0.96]',
    'primary-indigo':
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-indigo-500/50',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { y: -2 }}
      whileTap={disabled || loading ? {} : { scale: 0.96, y: 1 }}
      transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
      className={`inline-flex items-center justify-center font-body outline-none select-none transition-all ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.primary} ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" strokeWidth={2} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon
              className="w-4 h-4 shrink-0 transition-transform duration-fast group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon
              className="w-4 h-4 shrink-0 transition-transform duration-fast group-hover:translate-x-1"
              strokeWidth={2}
            />
          )}
        </>
      )}
    </motion.button>
  );
});
