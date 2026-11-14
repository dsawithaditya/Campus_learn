import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Flame,
  BookOpen,
  Clock,
  Award,
  Heart,
  Play,
  Lock,
  Sparkles,
  LogOut,
  LayoutDashboard,
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
  const enrolledCourses = useAppStore((state) => state.enrolledCourses) || [];
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const logout = useAppStore((state) => state.logout);
  const updateCourseProgress = useAppStore((state) => state.updateCourseProgress);
  const addToast = useAppStore((state) => state.addToast);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('learning');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];

  const enrolledDetails = enrolledCourses
    ?.map((item) => {
      const course = safeCourses.find((c) => c?.id === item?.courseId);
      return course ? { ...course, progress: item?.progress ?? 0 } : null;
    })
    ?.filter(Boolean) || [];

  const savedCourses = safeCourses.filter((c) => savedCourseIds?.includes(c?.id)) || [];

  const enrolledCatIds = enrolledDetails.map((c) => c?.categoryId);
  const recommendedCourses = safeCourses
    .filter((c) => !enrolledCourses.some((e) => e?.courseId === c?.id))
    .filter((c) => enrolledCatIds.includes(c?.categoryId) || (c?.rating || 0) >= 4.9)
    .slice(0, 3);

  const totalHoursLearned = enrolledDetails.reduce(
    (acc, curr) => acc + Math.round(((curr?.durationHours || 0) * (curr?.progress || 0)) / 100),
    0
  );

  const handleResume = (courseId, currentProgress) => {
    const next = Math.min(100, (currentProgress ?? 0) + 15);
    updateCourseProgress(courseId, () => next);
    addToast(
      next >= 100 ? 'Module finished! 100% completed!' : `Progress updated to ${next}%`,
      'success'
    );
  };

  return (
    <div className="pt-24 pb-20 md:pb-16 min-h-screen">
      <div className="container-custom">
        {/* Top Greeting Header */}
        <div className="glass-card p-6 sm:p-8 shadow-soft mb-8 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-[#0859D4] via-[#1A59F9] to-[#0859D4] shadow-[0_6px_18px_rgba(8,89,212,0.22)] shrink-0">
                <img
                  src={user?.avatar}
                  alt={user?.name || 'User'}
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1D1D1F]">
                  Hey, {user?.name?.split(' ')?.[0] || 'Learner'}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-[#6E6E73] mt-0.5">
                  {user?.college} • Campus Learner
                </p>
              </div>
            </div>

            {/* Streak & Quick stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0859D4]/10 border border-[#0859D4]/20 text-[#0859D4] rounded-full shadow-sm">
                <Flame className="w-5 h-5 fill-[#0859D4] text-[#0859D4] animate-pulse" />
                <span className="font-heading font-bold text-sm">
                  {user?.streak || 7} Day Streak!
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-full text-[#6E6E73] hover:text-rose-600 hover:bg-black/5 transition-colors active:scale-95"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* 3 Small Stat Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-black/[0.08]">
            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-[#0859D4] text-xs font-semibold uppercase mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enrolled</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {enrolledDetails.length}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-xs font-semibold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hours</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {totalHoursLearned}h
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 text-xs font-semibold uppercase mb-1">
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Badges</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {allBadges?.filter((b) => b?.unlocked)?.length}
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'learning'
                  ? 'btn-interactive text-white shadow-lg'
                  : 'text-[#424242] hover:bg-[#F5F5F7] border border-transparent'
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'saved'
                  ? 'btn-interactive text-white shadow-lg'
                  : 'text-[#424242] hover:bg-[#F5F5F7] border border-transparent'
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'badges'
                  ? 'btn-interactive text-white shadow-lg'
                  : 'text-[#424242] hover:bg-[#F5F5F7] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Student Badges</span>
              </div>
              <span className="text-xs">
                {allBadges?.filter((b) => b?.unlocked)?.length}/5
              </span>
            </button>
          </aside>

          {/* Main Area */}
          <main className="lg:col-span-9 space-y-10">
            {/* View: Continue Learning */}
            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                  In Progress Courses
                </h2>

                {enrolledDetails.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm text-[#6E6E73] mb-4">
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
                    {enrolledDetails?.map((course, idx) => (
                      <div
                        key={course?.id || idx}
                        className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={course?.thumbnail}
                            alt=""
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-black/[0.08]"
                          />
                          <div>
                            <span className="text-[11px] font-bold text-[#0859D4] uppercase tracking-wide">
                              {course?.level}
                            </span>
                            <h3 className="font-heading font-bold text-base text-[#1D1D1F] line-clamp-1">
                              {course?.title}
                            </h3>
                            <p className="text-xs text-[#6E6E73] mt-1">
                              {course?.lessonsCount} lessons • {course?.durationHours} hours
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/[0.08]">
                          <ProgressRing
                            value={course?.progress}
                            size={52}
                            strokeWidth={5}
                            color="#0859D4"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={Play}
                            onClick={() => handleResume(course?.id, course?.progress)}
                          >
                            {(course?.progress ?? 0) >= 100 ? 'Review' : 'Resume'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommended For You Section */}
                {recommendedCourses.length > 0 && (
                  <div className="pt-8 border-t border-black/[0.08]">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#0859D4]" />
                      <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
                        Recommended for You
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {recommendedCourses?.map((c) => (
                        <CourseCard key={c?.id} course={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View: Saved Courses */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                  Saved For Later ({savedCourses.length})
                </h2>
                {savedCourses.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm text-[#6E6E73] mb-4">
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
                    {savedCourses?.map((c) => (
                      <CourseCard key={c?.id} course={c} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View: Badges */}
            {activeTab === 'badges' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                  Campus Achievements & Badges
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allBadges?.map((badge) => (
                    <div
                      key={badge?.id}
                      className={`glass-card p-5 flex items-start gap-4 transition-all ${
                        badge?.unlocked
                          ? 'border-[#0859D4]/30 shadow-soft'
                          : 'opacity-50'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          badge?.unlocked
                            ? 'bg-[#0859D4]/10 text-[#0859D4] border border-[#0859D4]/20'
                            : 'bg-[#F5F5F7] text-[#6E6E73]'
                        }`}
                      >
                        {badge?.unlocked ? (
                          <Award className="w-6 h-6" strokeWidth={2} />
                        ) : (
                          <Lock className="w-5 h-5" strokeWidth={2} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-base text-[#1D1D1F]">
                            {badge?.name}
                          </h4>
                          {badge?.unlocked && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6E6E73] mt-1">
                          {badge?.desc}
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

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/[0.08] py-2.5 px-6 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('learning')}
          className={`flex flex-col items-center gap-1 py-1 text-xs font-semibold ${
            activeTab === 'learning'
              ? 'text-[#0859D4]'
              : 'text-[#6E6E73]'
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
              ? 'text-[#0859D4]'
              : 'text-[#6E6E73]'
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
              ? 'text-[#0859D4]'
              : 'text-[#6E6E73]'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Badges</span>
        </button>
      </div>
    </div>
  );
}
