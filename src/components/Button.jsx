import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(function Button(
  {
    children,
    variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'primary-indigo'
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
    sm: 'text-[14px] px-3.5 py-2 min-h-[40px] md:min-h-[38px] rounded-sm gap-1.5',
    md: 'text-[15px] md:text-[16px] px-5 py-2.5 min-h-[44px] rounded-md gap-2',
    lg: 'text-[16px] md:text-[17px] px-6 py-3.5 min-h-[48px] rounded-md gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-accent text-white hover:bg-[#F05545] shadow-cta active:bg-[#E04435] focus-visible:ring-2 focus-visible:ring-accent/50',
    secondary:
      'border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-text dark:text-text-dark hover:border-primary dark:hover:border-primary-contrast hover:text-primary dark:hover:text-primary-contrast active:bg-primary-soft/40 group',
    ghost:
      'bg-transparent text-muted dark:text-muted-dark hover:text-text dark:hover:text-text-dark hover:bg-primary-soft/60 dark:hover:bg-slate-800/60 active:bg-primary-soft',
    'primary-indigo':
      'bg-primary text-white hover:bg-primary-dark shadow-soft active:bg-primary-dark/95 focus-visible:ring-2 focus-visible:ring-primary/50',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { y: -2 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center font-medium font-body transition-colors duration-fast outline-none select-none ${
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
              strokeWidth={1.75}
            />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon
              className="w-4 h-4 shrink-0 transition-transform duration-fast group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          )}
        </>
      )}
    </motion.button>
  );
});

