import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CategoryChip } from '../components/CategoryChip';
import { Rating } from '../components/Rating';
import { Skeleton } from '../components/Skeleton';
import { ProgressRing } from '../components/ProgressRing';
import { StatCounter } from '../components/StatCounter';
import { Tabs } from '../components/Tabs';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Modal } from '../components/Modal';
import { CourseCard } from '../components/CourseCard';
import { MentorCard } from '../components/MentorCard';
import { SearchBar } from '../components/SearchBar';
import { useAppStore } from '../store/useAppStore';
import coursesData from '../data/courses.json';
import categoriesData from '../data/categories.json';
import mentorsData from '../data/mentors.json';

export default function ComponentsShowcase() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToast = useAppStore((state) => state.addToast);

  return (
    <div className="pt-28 pb-20 container-custom space-y-12">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-text dark:text-text-dark">
          Design System & Components Showcase
        </h1>
        <p className="text-muted dark:text-muted-dark text-sm mt-1">
          Verification page for all design tokens, components, and animations.
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
          <Button variant="secondary" size="md">Secondary Outline</Button>
          <Button variant="ghost" size="md">Ghost Button</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" onClick={() => addToast('Test notification trigger!', 'success')}>
            Trigger Toast
          </Button>
        </div>
      </section>

      {/* Badges & Category Chips */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Badges & Category Chips</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge variant="primary">Primary Badge</Badge>
          <Badge variant="accent">Accent Badge</Badge>
          <Badge variant="neutral">Neutral Badge</Badge>
          <Badge variant="outline">Outline Badge</Badge>
        </div>
        <div className="flex flex-wrap gap-2.5 pt-2">
          {categoriesData.slice(0, 4).map((c, i) => (
            <CategoryChip key={c.id} category={c} active={i === 0} />
          ))}
        </div>
      </section>

      {/* Ratings & Counters */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Rating & Progress Ring</h2>
        <div className="flex items-center gap-8">
          <Rating value={4.8} count={340} size="md" />
          <ProgressRing value={75} size={64} />
          <StatCounter end={12500} suffix="+" label="Verified Students" />
        </div>
      </section>

      {/* Search Bar */}
      <section className="space-y-4 max-w-xl">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Search Bar (with debounced suggestions)</h2>
        <SearchBar />
      </section>

      {/* Cards Sample */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Course & Mentor Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CourseCard course={coursesData[0]} />
          <CourseCard course={coursesData[3]} />
          <MentorCard mentor={mentorsData[0]} />
          <MentorCard mentor={mentorsData[1]} />
        </div>
      </section>

      {/* Skeletons */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text dark:text-text-dark">Skeleton Loaders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      </section>

      {/* Modal Trigger */}
      <section className="space-y-4">
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          Open Modal Demo
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Component Modal Test">
          <p className="text-sm text-muted dark:text-muted-dark">
            This modal has focus trap, Esc close, backdrop click close, and smooth 2D motion.
          </p>
        </Modal>
      </section>
    </div>
  );
}

