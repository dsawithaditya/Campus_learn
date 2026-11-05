import React from 'react';
import { motion } from 'framer-motion';

export function Tabs({ tabs, activeTab, onChange, className = '', id = 'tabs' }) {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1 border-b border-border dark:border-border-dark overflow-x-auto no-scrollbar ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-3 text-sm md:text-base font-semibold transition-colors duration-fast whitespace-nowrap outline-none select-none ${
              isActive
                ? 'text-primary dark:text-primary-contrast'
                : 'text-muted dark:text-muted-dark hover:text-text dark:hover:text-text-dark'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" strokeWidth={1.75} />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-primary-soft text-primary dark:bg-primary-soft/20 dark:text-primary-contrast'
                      : 'bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted-dark'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            {isActive && (
              <motion.div
                layoutId={`active-tab-underline-${id}`}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-contrast"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

