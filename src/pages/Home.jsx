import React from 'react';
import { Hero } from '../sections/Hero';
import { SubPageHub } from '../sections/SubPageHub';
import { TrendingCourses } from '../sections/TrendingCourses';
import { FinalCTA } from '../sections/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SubPageHub />
      <TrendingCourses />
      <FinalCTA />
    </div>
  );
}
