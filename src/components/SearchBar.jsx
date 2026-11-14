import React, { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import coursesData from '../data/courses.json';
import categoriesData from '../data/categories.json';

export function SearchBar({
  placeholder = 'Search skills, courses, mentors (e.g. React, FL Studio)...',
  className = '',
  initialValue = '',
}) {
  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 200);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = debouncedQuery.trim().toLowerCase();

  const matchedCategories = trimmed
    ? categoriesData
        .filter((cat) => cat.name.toLowerCase().includes(trimmed))
        .slice(0, 3)
    : [];

  const matchedCourses = trimmed
    ? coursesData
        .filter(
          (c) =>
            c.title.toLowerCase().includes(trimmed) ||
            c.tags.some((t) => t.toLowerCase().includes(trimmed))
        )
        .slice(0, 4)
    : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsOpen(false);
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-[#6E6E73]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
        </div>

        <input
          type="text"
          id="header-search-input"
          name="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search courses and categories"
          className="w-full pl-11 sm:pl-12 pr-12 py-3 sm:py-3.5 bg-[#F5F5F7] border border-black/[0.08] rounded-pill shadow-soft text-sm sm:text-base text-[#1D1D1F] placeholder:text-[#6E6E73] transition-all focus:bg-white focus:border-[#0859D4] focus:shadow-lift outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-4 p-1 rounded-full text-[#6E6E73] hover:text-[#1D1D1F]"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        )}
      </form>

      {/* Suggestion dropdown */}
      {isOpen && trimmed && (matchedCategories.length > 0 || matchedCourses.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-xl shadow-[0_20px_50px_rgba(29,29,31,0.12)] overflow-hidden z-40 max-h-[380px] overflow-y-auto">
          {matchedCategories.length > 0 && (
            <div className="p-2 border-b border-black/[0.06]">
              <div className="text-[11px] font-semibold text-[#6E6E73] uppercase px-3 py-1">
                Categories
              </div>
              {matchedCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/explore?category=${cat.id}`);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-lg hover:bg-[#F5F5F7] transition-colors text-sm cursor-pointer"
                >
                  <Tag className="w-4 h-4 text-[#0859D4] shrink-0" strokeWidth={1.75} />
                  <span className="font-medium text-[#1D1D1F]">{cat.name}</span>
                  <span className="text-xs text-[#6E6E73] ml-auto">
                    {cat.courseCount} courses
                  </span>
                </button>
              ))}
            </div>
          )}

          {matchedCourses.length > 0 && (
            <div className="p-2">
              <div className="text-[11px] font-semibold text-[#6E6E73] uppercase px-3 py-1">
                Courses
              </div>
              {matchedCourses.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/course/${c.slug}`);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <img
                    src={c.thumbnail}
                    alt=""
                    className="w-8 h-8 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1D1D1F] truncate">
                      {c.title}
                    </p>
                    <p className="text-xs text-[#6E6E73] truncate">
                      {c.level} • {c.durationHours} hrs
                    </p>
                  </div>
                  <BookOpen className="w-4 h-4 text-[#6E6E73] shrink-0" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          )}

          <div className="bg-[#F5F5F7] p-2 text-center border-t border-black/[0.06]">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="text-xs font-semibold text-[#0859D4] hover:underline cursor-pointer"
            >
              See all results for "{query}" →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

