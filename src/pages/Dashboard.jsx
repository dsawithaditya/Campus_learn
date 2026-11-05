import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  BookOpen,
  Clock,
  Award,
  Heart,
  Compass,
  Play,
  Lock,
  Sparkles,
  LogOut,
  LayoutDashboard,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ProgressRing } from '../components/ProgressRing';
import { CourseCard } from '../components/CourseCard';
import { Button } from '../components/Button';
import coursesData from '../data/courses.json';

const allBadges = [
  { id: 'b1', name: 'Early Bird', desc: 'Joined Campus Learn during launch week', unlocked: true },
  { id: 'b2', name: 'Tech Maven', desc: 'Enrolled in 2+ coding peer bootcamps', unlocked: true },
  { id: 'b3', name: 'Streak Master', desc: 'Maintained a 7-day study streak', unlocked: true },
  { id: 'b4', name: 'Fest Hero', desc: 'Completed a music, dance or art workshop', unlocked: false },
  { id: 'b5', name: 'Peer Mentor', desc: 'Published your first peer course outline', unlocked: false },
];

export default function Dashboard() {
  const user = useAppStore((state) => state.user);
  const enrolledCourses = useAppStore((state) => state.enrolledCourses);
  const savedCourseIds = useAppStore((state) => state.savedCourseIds);
  const logout = useAppStore((state) => state.logout);
  const updateCourseProgress = useAppStore((state) => state.updateCourseProgress);
  const addToast = useAppStore((state) => state.addToast);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('learning'); // 'learning' | 'saved' | 'badges'

  // Redirect to login if user not in store
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Enrolled courses details
  const enrolledDetails = enrolledCourses
    .map((item) => {
      const course = coursesData.find((c) => c.id === item.courseId);
      return course ? { ...course, progress: item.progress } : null;
    })
    .filter(Boolean);

  // Saved courses details
  const savedCourses = coursesData.filter((c) => savedCourseIds.includes(c.id));

  // Recommended courses based on enrolled courses categories
  const enrolledCatIds = enrolledDetails.map((c) => c.categoryId);
  const recommendedCourses = coursesData
    .filter((c) => !enrolledCourses.some((e) => e.courseId === c.id))
    .filter((c) => enrolledCatIds.includes(c.categoryId) || c.rating >= 4.9)
    .slice(0, 3);

  const totalHoursLearned = enrolledDetails.reduce(
    (acc, curr) => acc + Math.round((curr.durationHours * curr.progress) / 100),
    0
  );

  const handleResume = (courseId, currentProgress) => {
    const next = Math.min(100, currentProgress + 15);
    updateCourseProgress(courseId, next);
    addToast(
      next >= 100 ? 'Module finished! 100% completed!' : `Progress updated to ${next}%`,
      'success'
    );
  };

  return (
    <div className="pt-24 pb-20 md:pb-16 min-h-screen">
      <div className="container-custom">
        {/* Top Greeting Header */}
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg p-6 sm:p-8 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-sm"
              />
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text dark:text-text-dark">
                  Hey, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-muted dark:text-muted-dark mt-0.5">
                  {user.college} • Campus Learner
                </p>
              </div>
            </div>

            {/* Streak & Quick stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-pill">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
                <span className="font-heading font-bold text-sm">
                  {user.streak || 7} Day Streak!
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-full text-muted hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* 3 Small Stat Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-border/60 dark:border-border-dark/60">
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/40 rounded-md text-center">
              <div className="flex items-center justify-center gap-1.5 text-primary text-xs font-semibold uppercase mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enrolled</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-text dark:text-text-dark">
                {enrolledDetails.length}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/40 rounded-md text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-500 text-xs font-semibold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hours</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-text dark:text-text-dark">
                {totalHoursLearned}h
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/40 rounded-md text-center">
              <div className="flex items-center justify-center gap-1.5 text-accent text-xs font-semibold uppercase mb-1">
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Badges</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-text dark:text-text-dark">
                {allBadges.filter((b) => b.unlocked).length}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Body: Desktop Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-2">
            <button
              type="button"
              onClick={() => setActiveTab('learning')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'learning'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Continue Learning</span>
              </div>
              <span className="text-xs">{enrolledDetails.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'saved'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>Saved Courses</span>
              </div>
              <span className="text-xs">{savedCourses.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('badges')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'badges'
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-text dark:text-text-dark hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Student Badges</span>
              </div>
              <span className="text-xs">{allBadges.filter((b) => b.unlocked).length}/5</span>
            </button>
          </aside>

          {/* Main Area */}
          <main className="lg:col-span-9 space-y-10">
            {/* View: Continue Learning */}
            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-text dark:text-text-dark">
                  In Progress Courses
                </h2>

                {enrolledDetails.length === 0 ? (
                  <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-8 text-center">
                    <p className="text-sm text-muted dark:text-muted-dark mb-4">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Link to="/explore">
                      <Button variant="primary" size="sm">
                        Explore Courses
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledDetails.map((course) => (
                      <div
                        key={course.id}
                        className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft hover:shadow-lift transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover shrink-0"
                          />
                          <div>
                            <span className="text-[11px] font-semibold text-primary uppercase">
                              {course.level}
                            </span>
                            <h3 className="font-heading font-semibold text-base text-text dark:text-text-dark line-clamp-1">
                              {course.title}
                            </h3>
                            <p className="text-xs text-muted dark:text-muted-dark mt-1">
                              {course.lessonsCount} lessons • {course.durationHours} hours
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/40">
                          <ProgressRing value={course.progress} size={52} strokeWidth={5} />
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={Play}
                            onClick={() => handleResume(course.id, course.progress)}
                          >
                            {course.progress >= 100 ? 'Review' : 'Resume'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommended For You Section */}
                {recommendedCourses.length > 0 && (
                  <div className="pt-8 border-t border-border/80 dark:border-border-dark/80">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <h3 className="font-heading font-bold text-lg text-text dark:text-text-dark">
                        Recommended for You
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {recommendedCourses.map((c) => (
                        <CourseCard key={c.id} course={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View: Saved Courses */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-text dark:text-text-dark">
                  Saved For Later ({savedCourses.length})
                </h2>
                {savedCourses.length === 0 ? (
                  <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-md p-8 text-center">
                    <p className="text-sm text-muted dark:text-muted-dark mb-4">
                      No courses saved yet. Click the heart icon on any course card to bookmark it.
                    </p>
                    <Link to="/explore">
                      <Button variant="secondary" size="sm">
                        Find Courses
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedCourses.map((c) => (
                      <CourseCard key={c.id} course={c} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View: Badges */}
            {activeTab === 'badges' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-text dark:text-text-dark">
                  Campus Achievements & Badges
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-5 rounded-md border flex items-start gap-4 transition-all ${
                        badge.unlocked
                          ? 'bg-surface dark:bg-surface-dark border-primary/30 shadow-soft'
                          : 'bg-slate-50/50 dark:bg-slate-900/20 border-border dark:border-border-dark opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                          badge.unlocked
                            ? 'bg-primary-soft text-primary dark:bg-primary-soft/15 dark:text-primary-contrast'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {badge.unlocked ? (
                          <Award className="w-6 h-6" strokeWidth={2} />
                        ) : (
                          <Lock className="w-5 h-5" strokeWidth={2} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-base text-text dark:text-text-dark">
                            {badge.name}
                          </h4>
                          {badge.unlocked && (
                            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted dark:text-muted-dark mt-1">
                          {badge.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar (fixed on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-border dark:border-border-dark py-2 px-6 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('learning')}
          className={`flex flex-col items-center gap-1 py-1 text-xs font-semibold ${
            activeTab === 'learning'
              ? 'text-primary dark:text-primary-contrast'
              : 'text-muted dark:text-muted-dark'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Courses</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center gap-1 py-1 text-xs font-semibold ${
            activeTab === 'saved'
              ? 'text-primary dark:text-primary-contrast'
              : 'text-muted dark:text-muted-dark'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('badges')}
          className={`flex flex-col items-center gap-1 py-1 text-xs font-semibold ${
            activeTab === 'badges'
              ? 'text-primary dark:text-primary-contrast'
              : 'text-muted dark:text-muted-dark'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Badges</span>
        </button>
      </div>
    </div>
  );
}

