import React from 'react';
import { motion } from 'framer-motion';

export function Tabs({ tabs, activeTab, onChange, className = '', id = 'tabs' }) {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1 border-b border-black/[0.08] overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-3 text-sm font-heading font-semibold transition-colors duration-fast whitespace-nowrap outline-none select-none cursor-pointer ${
              isActive
                ? 'text-[#0859D4]'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" strokeWidth={1.75} />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#0859D4]/10 text-[#0859D4] border border-[#0859D4]/25'
                      : 'bg-[#F5F5F7] text-[#6E6E73] border border-black/[0.06]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            {isActive && (
              <motion.div
                layoutId={`active-tab-underline-${id}`}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0859D4]"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
