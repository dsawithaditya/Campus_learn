import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Mic2, Music, Flame, Trophy, Palette, Camera, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import categoriesData from '../data/categories.json';

const iconMap = {
  tech: Code2,
  singing: Mic2,
  music: Music,
  dance: Flame,
  sports: Trophy,
  art: Palette,
  photography: Camera,
  gaming: Gamepad2,
};

export function CategoryRow() {
  const navigate = useNavigate();
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  const handleCategoryClick = (catId) => {
    navigate(`/explore?category=${catId}`);
  };

  return (
    <section className="py-16 sm:py-20 border-b border-white/10 bg-black">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Campus Domains
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Explore Peer-Led Disciplines
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-1 group self-start sm:self-auto transition-colors"
          >
            <span>View all courses</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Categories Grid with Zephyr minimalist dark pill styling */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {safeCategories?.map((cat, index) => {
            const IconComponent = iconMap[cat?.id] || Code2;
            return (
              <motion.button
                key={cat?.id || index}
                type="button"
                onClick={() => handleCategoryClick(cat?.id)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="zephyr-card p-4 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer border border-white/10 hover:border-white/25 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white mb-3 transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors truncate w-full">
                  {cat?.name || 'Domain'}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5">
                  {cat?.courseCount || 12}+ cohorts
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryRow;
