import React from 'react';
import { Hero } from '../sections/Hero';
import { TrendingCourses } from '../sections/TrendingCourses';
import { HowItWorks } from '../sections/HowItWorks';
import { Mentors } from '../sections/Mentors';
import { Stats } from '../sections/Stats';
import { MentorCTA } from '../sections/MentorCTA';
import { Testimonials } from '../sections/Testimonials';
import { FinalCTA } from '../sections/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrendingCourses />
      <HowItWorks />
      <Mentors />
      <Stats />
      <MentorCTA />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}

