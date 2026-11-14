import React from 'react';
import { Star } from 'lucide-react';

export function Rating({ value = 5, count = null, size = 'sm', showValue = true, className = '' }) {
  const numericValue = Number(value) || 0;
  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className={`inline-flex items-center gap-1.5 font-body ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = numericValue >= starIndex;
          const half = !filled && numericValue >= starIndex - 0.5;

          return (
            <div key={starIndex} className="relative">
              <Star
                className={`${starSize} ${
                  filled
                    ? 'fill-amber-400 text-amber-400'
                    : half
                    ? 'fill-amber-400/40 text-amber-400'
                    : 'text-black/15'
                }`}
                strokeWidth={1.75}
              />
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="font-semibold text-[#1D1D1F] text-[13px]">
          {numericValue.toFixed(1)}
        </span>
      )}
      {count !== null && (
        <span className="text-[#6E6E73] text-[12px]">({count})</span>
      )}
    </div>
  );
}

