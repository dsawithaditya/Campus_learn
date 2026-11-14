import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, subtitle, duration, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-black/[0.08] rounded-xl overflow-hidden bg-white mb-3 transition-colors shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-heading text-[15px] sm:text-[16px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7]/70 transition-colors select-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span>{title}</span>
          {subtitle && (
            <span className="text-xs font-normal text-[#6E6E73]">
              {subtitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {duration && (
            <span className="text-xs text-[#6E6E73] font-body">{duration}</span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-[#6E6E73]" strokeWidth={1.75} />
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
            className="overflow-hidden border-t border-black/[0.08]"
          >
            <div className="px-5 py-4 text-sm text-[#424242] bg-[#F9F9FB]">
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

