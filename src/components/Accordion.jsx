import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, subtitle, duration, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border dark:border-border-dark rounded-md overflow-hidden bg-surface dark:bg-surface-dark mb-3 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-heading text-[15px] sm:text-[16px] font-semibold text-text dark:text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors select-none"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span>{title}</span>
          {subtitle && (
            <span className="text-xs font-normal text-muted dark:text-muted-dark">
              {subtitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {duration && (
            <span className="text-xs text-muted dark:text-muted-dark font-body">{duration}</span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted dark:text-muted-dark" strokeWidth={1.75} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 dark:border-border-dark/60"
          >
            <div className="px-5 py-4 text-sm text-text/80 dark:text-text-dark/80 bg-slate-50/50 dark:bg-slate-800/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items = [], children }) {
  if (children) return <div className="space-y-3">{children}</div>;
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id || idx}
          title={item.title}
          subtitle={item.subtitle}
          duration={item.duration}
          defaultOpen={idx === 0}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

