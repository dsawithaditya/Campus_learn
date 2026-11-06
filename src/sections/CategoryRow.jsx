import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryChip } from '../components/CategoryChip';
import categoriesData from '../data/categories.json';

export function CategoryRow() {
  const navigate = useNavigate();
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  const handleCategoryClick = (catId) => {
    navigate(`/explore?category=${catId}`);
  };

  return (
    <section className="py-8 border-y border-white/5 bg-zinc-950/40">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Explore by Category
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="text-xs sm:text-sm font-semibold text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1 group"
          >
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Scrollable on mobile, wrapping on desktop */}
        <div className="flex md:flex-wrap items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {safeCategories?.map((category) => (
            <CategoryChip
              key={category?.id}
              category={category}
              onClick={() => handleCategoryClick(category?.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
