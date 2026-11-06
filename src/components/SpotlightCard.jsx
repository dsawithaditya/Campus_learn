import React from 'react';

export function SpotlightCard({ children, className = '', style = {}, ...props }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`glass-card relative overflow-hidden ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(249,115,22,0.12), transparent 40%)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

