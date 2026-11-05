import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/Button';
import categoriesData from '../data/categories.json';

const benefits = [
  {
    icon: Award,
    title: 'Resume-Ready Leadership',
    desc: 'Receive official recognition and verified mentor credentials valued by campus placement recruiters.',
  },
  {
    icon: Users,
    title: 'Campus Wide Reach',
    desc: 'Teach across 100+ colleges and build an active student following in your club or technical domain.',
  },
  {
    icon: Sparkles,
    title: 'Zero Friction Tooling',
    desc: 'Curate modules easily with markdown, video embeds, and peer interactive questions.',
  },
];

export default function Teach() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '3rd year',
    branch: '',
    category: 'tech',
    skillTitle: '',
    courseIdea: '',
    targetAudience: 'Beginner students',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero section */}
      <div className="py-12 bg-slate-50 dark:bg-slate-900/40 border-b border-border/80 dark:border-border-dark/80 text-center">
        <div className="container-custom max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-primary-soft dark:bg-primary-soft/15 border border-primary/20 text-xs font-semibold text-primary dark:text-primary-contrast mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Campus Mentorship Initiative</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text dark:text-text-dark tracking-tight mb-4">
            Become a Campus Mentor
          </h1>
          <p className="text-muted dark:text-muted-dark text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Pass on the lessons you learned the hard way. Guide juniors in tech, sports, music and college societies.
          </p>
        </div>
      </div>

      <div className="container-custom mt-12 max-w-4xl space-y-16">
        {/* Benefits Section: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-6 shadow-soft text-center sm:text-left space-y-3"
              >
                <div className="w-10 h-10 rounded-md bg-primary-soft text-primary dark:bg-primary-soft/15 dark:text-primary-contrast flex items-center justify-center mx-auto sm:mx-0">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-base text-text dark:text-text-dark">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted dark:text-muted-dark leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3-Step Application Form with Progress Bar */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg p-6 sm:p-10 shadow-lift">
          {isSubmitted ? (
            /* Success Screen with Confetti-free Checkmark Animation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center max-w-md mx-auto space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" strokeWidth={2} />
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text dark:text-text-dark">
                Application Received!
              </h2>
              <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
                Thank you for stepping up to guide your peers. We will review your application and verify your college email within 48 hours.
              </p>
              <div className="pt-4">
                <Button variant="primary" onClick={() => (window.location.href = '/')}>
                  Back to Campus Learn
                </Button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Progress Bar Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-muted dark:text-muted-dark mb-2">
                  <span>Step {currentStep} of 3</span>
                  <span>
                    {currentStep === 1
                      ? 'Basic Information'
                      : currentStep === 2
                      ? 'Your Skills & Category'
                      : 'Course Proposal Idea'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleNext} className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Siddharth Verma"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          College Email
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@college.edu or .ac.in"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          College / University
                        </label>
                        <input
                          type="text"
                          required
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="e.g. IIT Delhi, BITS Goa, COEP"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          Academic Year
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                        >
                          <option value="2nd year">2nd Year</option>
                          <option value="3rd year">3rd Year</option>
                          <option value="4th year">4th Year</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Skill & Category */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Skill Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                      >
                        {categoriesData.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Specific Competencies / Tools (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="e.g. React, Next.js, DSA, Tailwind CSS"
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Course Idea */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Proposed Course Title
                      </label>
                      <input
                        type="text"
                        required
                        name="skillTitle"
                        value={formData.skillTitle}
                        onChange={handleChange}
                        placeholder="e.g. Modern Full-Stack Web Dev for SIH Hackathon"
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Brief Outline of Modules & Lessons
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="courseIdea"
                        value={formData.courseIdea}
                        onChange={handleChange}
                        placeholder="Explain 2-3 key takeaways and how this helps a college junior..."
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-primary"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-border/60 dark:border-border-dark/60">
                  {currentStep > 1 ? (
                    <Button variant="secondary" onClick={handleBack} icon={ArrowLeft}>
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    variant="primary"
                    type="submit"
                    icon={currentStep === 3 ? CheckCircle2 : ArrowRight}
                    iconPosition="right"
                  >
                    {currentStep === 3 ? 'Submit Mentor Application' : 'Continue'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

