import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Mic2, Music, Flame, Trophy, Palette, Camera, Gamepad2 } from 'lucide-react';
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
    <section className="py-14 border-y border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SkillCamp Disciplines</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Choose your creative playground
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View all 8 skill domains</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Categories Grid matching the 3D icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {safeCategories?.map((cat) => {
            const Icon = iconMap[cat?.id] || Sparkles;
            return (
              <button
                key={cat?.id}
                onClick={() => handleCategoryClick(cat?.id)}
                className="group glass-card p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-500/40 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-3 shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: cat?.color || '#3b82f6' }}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {cat?.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  {cat?.courseCount} Camps
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
