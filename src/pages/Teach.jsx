import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '../components/Button';
import { useAppStore } from '../store/useAppStore';
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
  const navigate = useNavigate();
  const addToast = useAppStore((state) => state.addToast);
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      addToast('Application submitted successfully! Our campus leads will review your profile.', 'success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="pt-24 pb-16 min-h-screen relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero section */}
      <div className="py-12 border-b border-border/80 dark:border-border-dark/80 text-center relative">
        <div className="container-custom max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-400 mb-4 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <Sparkles className="w-4 h-4 text-orange-400" />
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

      <div className="container-custom mt-12 max-w-4xl space-y-12">
        {/* Benefits Section: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits?.map((b, i) => {
            const Icon = b?.icon;
            return (
              <div
                key={b?.title || i}
                className="glass-card rounded-xl p-6 text-center sm:text-left space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center mx-auto sm:mx-0 shadow-soft">
                  {Icon && <Icon className="w-5 h-5" strokeWidth={2} />}
                </div>
                <h3 className="font-heading font-bold text-base text-text dark:text-text-dark">
                  {b?.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted dark:text-muted-dark leading-relaxed">
                  {b?.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3-Step Application Form with Progress Bar */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 shadow-lift border border-border/80 dark:border-border-dark/80">
          {isSubmitted ? (
            /* Success Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center max-w-md mx-auto space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-10 h-10" strokeWidth={2} />
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text dark:text-text-dark">
                Application Received!
              </h2>
              <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
                Thank you for stepping up to guide your peers. We will review your application and verify your college email within 48 hours.
              </p>
              <div className="pt-4">
                <Button variant="primary" onClick={() => navigate('/')}>
                  Back to Campus Learn
                </Button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Progress Bar Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-muted dark:text-muted-dark mb-2">
                  <span className="text-orange-400 font-bold">Step {currentStep} of 3</span>
                  <span>
                    {currentStep === 1
                      ? 'Basic Information'
                      : currentStep === 2
                      ? 'Your Skills & Category'
                      : 'Course Proposal Idea'}
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
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
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="teach-name" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          id="teach-name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Siddharth Verma"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="teach-email" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          College Email
                        </label>
                        <input
                          type="email"
                          required
                          id="teach-email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@college.edu or .ac.in"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="teach-college" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          College / University
                        </label>
                        <input
                          type="text"
                          required
                          id="teach-college"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="e.g. IIT Delhi, BITS Goa, COEP"
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="teach-year" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                          Academic Year
                        </label>
                        <select
                          id="teach-year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
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
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="teach-category" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Skill Category
                      </label>
                      <select
                        id="teach-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                      >
                        {safeCategories.map((cat) => (
                          <option key={cat?.id} value={cat?.id}>
                            {cat?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="teach-branch" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Specific Competencies / Tools (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        id="teach-branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="e.g. React, Next.js, DSA, Tailwind CSS"
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Course Idea */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="teach-skill-title" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Proposed Course Title
                      </label>
                      <input
                        type="text"
                        required
                        id="teach-skill-title"
                        name="skillTitle"
                        value={formData.skillTitle}
                        onChange={handleChange}
                        placeholder="e.g. Modern Full-Stack Web Dev for SIH Hackathon"
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="teach-course-idea" className="block text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark mb-1">
                        Brief Outline of Modules & Lessons
                      </label>
                      <textarea
                        required
                        rows={4}
                        id="teach-course-idea"
                        name="courseIdea"
                        value={formData.courseIdea}
                        onChange={handleChange}
                        placeholder="Explain 2-3 key takeaways and how this helps a college junior..."
                        className="w-full px-3.5 py-2.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md text-sm text-text dark:text-text-dark outline-none focus:border-orange-500"
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
