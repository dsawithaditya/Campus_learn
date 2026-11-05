import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Mic2,
  Music,
  Sparkles,
  Trophy,
  Palette,
  Camera,
  Gamepad2,
  Layers,
} from 'lucide-react';

const iconMap = {
  Code2,
  Mic2,
  Music,
  Sparkles,
  Trophy,
  Palette,
  Camera,
  Gamepad2,
  Layers,
};

export function CategoryChip({ category, active = false, onClick, className = '' }) {
  const IconComponent = (category && iconMap[category.icon]) || Layers;
  const hex = category?.color || '#4F46E5';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      style={{
        backgroundColor: active ? hex : `${hex}1F`, // ~15% opacity when not active
        borderColor: active ? hex : `${hex}33`,
        color: active ? '#FFFFFF' : hex,
      }}
      className={`inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-pill text-[13px] font-semibold border transition-all duration-base cursor-pointer outline-none select-none ${className}`}
    >
      <IconComponent className="w-4 h-4 shrink-0" strokeWidth={1.75} />
      <span className="whitespace-nowrap">{category.name}</span>
    </motion.button>
  );
}

