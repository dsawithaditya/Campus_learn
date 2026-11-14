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
  Users,
  Calendar,
  Settings,
  RotateCcw,
  Trash2,
  ArrowUpRight,
  GraduationCap,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ProgressRing } from '../components/ProgressRing';
import { CourseCard } from '../components/CourseCard';
import { Button } from '../components/Button';
import coursesData from '../data/courses.json';
import mentorsData from '../data/mentors.json';

export default function Dashboard() {
  const user = useAppStore((state) => state.user);
  const enrolledCourses = useAppStore((state) => state.enrolledCourses) || [];
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const followedMentorIds = useAppStore((state) => state.followedMentorIds) || [];
  const bookedSessions = useAppStore((state) => state.bookedSessions) || [];
  const mentorApplications = useAppStore((state) => state.mentorApplications) || [];

  const logout = useAppStore((state) => state.logout);
  const updateCourseProgress = useAppStore((state) => state.updateCourseProgress);
  const unenroll = useAppStore((state) => state.unenroll);
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);
  const cancelMentorSession = useAppStore((state) => state.cancelMentorSession);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const resetDemoWorkspace = useAppStore((state) => state.resetDemoWorkspace);
  const addToast = useAppStore((state) => state.addToast);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('learning');
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileCollege, setProfileCollege] = useState(user?.college || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setProfileName(user.name || '');
    setProfileCollege(user.college || '');
  }, [user, navigate]);

  if (!user) return null;

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  const enrolledDetails = enrolledCourses
    .map((item) => {
      const course = safeCourses.find((c) => c?.id === item?.courseId);
      return course
        ? {
            ...course,
            progress: item?.progress ?? 0,
            completedLessons: item?.completedLessons || [],
          }
        : null;
    })
    .filter(Boolean);

  const savedCourses = safeCourses.filter((c) => savedCourseIds.includes(c?.id));
  const followedMentors = safeMentors.filter((m) => followedMentorIds.includes(m?.id));

  const enrolledCatIds = enrolledDetails.map((c) => c?.categoryId);
  const recommendedCourses = safeCourses
    .filter((c) => !enrolledCourses.some((e) => e?.courseId === c?.id))
    .filter((c) => enrolledCatIds.includes(c?.categoryId) || (c?.rating || 0) >= 4.9)
    .slice(0, 3);

  const totalHoursLearned = enrolledDetails.reduce(
    (acc, curr) => acc + Math.round(((curr?.durationHours || 0) * (curr?.progress || 0)) / 100),
    0
  );

  const hasCreativeCourse = enrolledDetails.some((c) =>
    ['singing', 'music', 'dance', 'art', 'photography'].includes(c?.categoryId)
  );
  const allBadges = [
    { id: 'b1', name: 'Early Bird', desc: 'Joined Campus Learn verified network', unlocked: true },
    {
      id: 'b2',
      name: 'Tech Maven',
      desc: 'Enrolled in technical peer bootcamps',
      unlocked: enrolledDetails.some((c) => c?.categoryId === 'tech'),
    },
    {
      id: 'b3',
      name: 'Streak Master',
      desc: 'Maintained a 7-day peer learning streak',
      unlocked: (user?.streak || 0) >= 7,
    },
    {
      id: 'b4',
      name: 'Fest Hero',
      desc: 'Joined a music, singing, art, or dance cohort',
      unlocked: hasCreativeCourse,
    },
    {
      id: 'b5',
      name: 'Peer Mentor',
      desc: 'Submitted a peer mentor cohort proposal',
      unlocked: mentorApplications.length > 0,
    },
  ];
  const unlockedCount = allBadges.filter((b) => b.unlocked).length;

  const handleResume = (courseId, currentProgress) => {
    const next = Math.min(100, (currentProgress ?? 0) + 15);
    updateCourseProgress(courseId, () => next);
    addToast(
      next >= 100 ? 'Cohort finished! 100% completed!' : `Progress updated to ${next}%`,
      'success'
    );
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileName.trim() || !profileCollege.trim()) {
      addToast('Name and college cannot be empty', 'error');
      return;
    }
    updateProfile({ name: profileName, college: profileCollege });
  };

  const navTabs = [
    { id: 'learning', label: 'Courses', desktopLabel: 'Continue Learning', icon: LayoutDashboard, count: enrolledDetails.length },
    { id: 'saved', label: 'Saved', desktopLabel: 'Saved Courses', icon: Heart, count: savedCourses.length },
    { id: 'mentors', label: 'Mentors', desktopLabel: 'Followed Mentors', icon: Users, count: followedMentors.length },
    { id: 'sessions', label: '1:1 Slots', desktopLabel: '1:1 Sessions & Status', icon: Calendar, count: bookedSessions.length + mentorApplications.length },
    { id: 'badges', label: 'Badges', desktopLabel: 'Student Badges', icon: Award, count: `${unlockedCount}/5` },
    { id: 'settings', label: 'Settings', desktopLabel: 'Account Settings', icon: Settings, count: null },
  ];

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="container-custom">
        {/* Top Greeting Header */}
        <div className="glass-card p-5 sm:p-8 shadow-soft mb-6 sm:mb-8 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-[#0859D4] via-[#1A59F9] to-[#0859D4] shadow-[0_6px_18px_rgba(8,89,212,0.22)] shrink-0">
                <img
                  src={user?.avatar}
                  alt={user?.name || 'User'}
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      user?.isDemo
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {user?.isDemo ? 'Demo Workspace' : 'Campus Account'}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-xl sm:text-3xl text-[#1D1D1F] truncate">
                  Hey, {user?.name?.split(' ')?.[0] || 'Learner'}!
                </h1>
                <p className="text-xs sm:text-sm text-[#6E6E73] mt-0.5 truncate">
                  {user?.college} • {user?.email}
                </p>
              </div>
            </div>

            {/* Streak, Demo Reset & Logout */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-[#0859D4]/10 border border-[#0859D4]/20 text-[#0859D4] rounded-full shadow-sm">
                <Flame className="w-4 h-4 fill-[#0859D4] text-[#0859D4]" />
                <span className="font-heading font-bold text-xs sm:text-sm whitespace-nowrap">
                  {user?.streak || 1} Day Streak
                </span>
              </div>

              {user?.isDemo && (
                <button
                  type="button"
                  onClick={resetDemoWorkspace}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full bg-[#F5F5F7] hover:bg-[#EBEBF0] border border-black/[0.08] text-xs font-heading font-semibold text-[#1D1D1F] transition-colors cursor-pointer"
                  title="Restore sample courses and bookings"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#0859D4]" />
                  <span>Reset Demo</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-10 h-10 rounded-full text-[#6E6E73] hover:text-rose-600 hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* 3 Compact KPI Cards (labels visible on all screen sizes) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-6 pt-5 border-t border-black/[0.08]">
            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-[#0859D4] text-[11px] sm:text-xs font-semibold uppercase mb-1">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Courses</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {enrolledDetails.length}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-[11px] sm:text-xs font-semibold uppercase mb-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Hours</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {totalHoursLearned}h
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 text-[11px] sm:text-xs font-semibold uppercase mb-1">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Badges</span>
              </div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#1D1D1F]">
                {unlockedCount}
              </div>
            </div>
          </div>
        </div>

        {/* Inline Mobile / Tablet Section Switcher */}
        <div
          role="tablist"
          aria-label="Dashboard sections"
          className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-5"
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] px-3.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0859D4] text-white shadow-[0_4px_14px_rgba(8,89,212,0.28)]'
                    : 'bg-[#F5F5F7] text-[#424242] border border-black/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-[#6E6E73]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dashboard Body: Desktop Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full min-h-[46px] flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'btn-interactive text-white shadow-lg'
                      : 'text-[#424242] hover:bg-[#F5F5F7] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.desktopLabel}</span>
                  </div>
                  {tab.count !== null && (
                    <span className="font-mono text-xs">{tab.count}</span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Pane */}
          <div className="lg:col-span-9 space-y-10 min-w-0">
            {/* View 1: Continue Learning */}
            {activeTab === 'learning' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                    In-Progress Courses
                  </h2>
                  <Link
                    to="/explore"
                    className="text-xs font-heading font-semibold text-[#0859D4] hover:underline flex items-center gap-1"
                  >
                    <span>Browse Catalog</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {enrolledDetails.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm text-[#6E6E73] mb-4">
                      You haven&apos;t enrolled in any peer cohorts yet.
                    </p>
                    <Link to="/explore">
                      <Button variant="primary" size="sm">
                        Explore Cohorts
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledDetails.map((course, idx) => (
                      <div
                        key={course?.id || idx}
                        className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up"
                      >
                        <Link
                          to={`/course/${course?.slug}`}
                          className="flex items-start gap-4 group min-w-0 flex-1"
                        >
                          <img
                            src={course?.thumbnail}
                            alt={course?.title || ''}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-black/[0.08]"
                          />
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-[#0859D4] uppercase tracking-wide">
                              {course?.level}
                            </span>
                            <h3 className="font-heading font-bold text-base text-[#1D1D1F] group-hover:text-[#0859D4] transition-colors line-clamp-1">
                              {course?.title}
                            </h3>
                            <p className="text-xs text-[#6E6E73] mt-1">
                              {course?.lessonsCount} lessons • {course?.durationHours} hours
                            </p>
                          </div>
                        </Link>

                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/[0.08] shrink-0">
                          <ProgressRing
                            value={course?.progress}
                            size={50}
                            strokeWidth={5}
                            color="#0859D4"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={Play}
                            onClick={() => handleResume(course?.id, course?.progress)}
                          >
                            {(course?.progress ?? 0) >= 100 ? 'Completed' : '+15% Step'}
                          </Button>
                          <button
                            type="button"
                            onClick={() => course?.id && unenroll(course.id)}
                            aria-label={`Leave ${course?.title}`}
                            className="w-10 h-10 rounded-full text-[#6E6E73] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {recommendedCourses.length > 0 && (
                  <div className="pt-8 border-t border-black/[0.08]">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#0859D4]" />
                      <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
                        Recommended for You
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {recommendedCourses.map((c) => (
                        <CourseCard key={c?.id} course={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View 2: Saved Courses */}
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
                    {savedCourses.map((c) => (
                      <CourseCard key={c?.id} course={c} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 3: Followed Mentors */}
            {activeTab === 'mentors' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                    Followed Senior Mentors ({followedMentors.length})
                  </h2>
                  <Link
                    to="/mentors"
                    className="text-xs font-heading font-semibold text-[#0859D4] hover:underline flex items-center gap-1"
                  >
                    <span>Directory</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {followedMentors.length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm text-[#6E6E73] mb-4">
                      Follow mentors to stay notified when they open new office hours and cohorts.
                    </p>
                    <Link to="/mentors">
                      <Button variant="secondary" size="sm">
                        Discover Mentors
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {followedMentors.map((m) => (
                      <div
                        key={m.id}
                        className="glass-card p-4 sm:p-5 flex items-start justify-between gap-3"
                      >
                        <Link to={`/mentor/${m.id}`} className="flex items-start gap-3.5 min-w-0 group">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-12 h-12 rounded-xl object-cover border border-black/[0.08] shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="font-heading font-bold text-sm sm:text-base text-[#1D1D1F] group-hover:text-[#0859D4] truncate">
                              {m.name}
                            </h3>
                            <p className="font-mono text-[11px] text-[#0859D4] truncate">
                              {m.expertise}
                            </p>
                            {m.college && (
                              <p className="font-mono text-[10px] text-[#6E6E73] flex items-center gap-1 mt-1">
                                <GraduationCap className="w-3 h-3" />
                                {m.college}
                              </p>
                            )}
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleFollowMentor(m.id)}
                          className="min-h-[38px] px-3 py-1 rounded-full bg-[#F5F5F7] hover:bg-rose-50 hover:text-rose-600 border border-black/10 text-xs font-heading font-semibold text-[#424242] transition-colors cursor-pointer shrink-0"
                        >
                          Unfollow
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 4: 1:1 Sessions & Mentor Applications */}
            {activeTab === 'sessions' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                      Upcoming 1:1 Office Hours ({bookedSessions.length})
                    </h2>
                    <Link
                      to="/mentors"
                      className="text-xs font-heading font-semibold text-[#0859D4] hover:underline flex items-center gap-1"
                    >
                      <span>Book Another Slot</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {bookedSessions.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <p className="text-sm text-[#6E6E73] mb-4">
                        No 1:1 sessions booked yet. Pick any mentor profile to reserve an office-hour slot.
                      </p>
                      <Link to="/mentors">
                        <Button variant="secondary" size="sm">
                          Browse Mentors
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookedSessions.map((ses) => (
                        <div
                          key={ses.id}
                          className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[11px] font-semibold text-[#0859D4] bg-[#0859D4]/10 border border-[#0859D4]/20 px-2.5 py-0.5 rounded-full">
                                {ses.slot}
                              </span>
                              <Link
                                to={`/mentor/${ses.mentorId}`}
                                className="text-xs font-heading font-bold text-[#1D1D1F] hover:text-[#0859D4]"
                              >
                                with {ses.mentorName}
                              </Link>
                            </div>
                            <h3 className="font-heading font-semibold text-sm sm:text-base text-[#1D1D1F]">
                              {ses.topic}
                            </h3>
                            {ses.note && (
                              <p className="text-xs text-[#6E6E73] line-clamp-2">{ses.note}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => cancelMentorSession(ses.id)}
                            className="min-h-[40px] px-4 py-2 rounded-full bg-[#F5F5F7] hover:bg-rose-50 hover:text-rose-600 border border-black/10 text-xs font-heading font-semibold text-[#424242] transition-colors cursor-pointer self-start sm:self-center shrink-0"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {mentorApplications.length > 0 && (
                  <div className="pt-6 border-t border-black/[0.08] space-y-4">
                    <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
                      Mentor Cohort Proposals ({mentorApplications.length})
                    </h3>
                    <div className="space-y-3">
                      {mentorApplications.map((app) => (
                        <div key={app.id} className="glass-card p-4 sm:p-5 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-heading font-bold text-sm sm:text-base text-[#1D1D1F]">
                              {app.skillTitle || 'Mentor Proposal'}
                            </h4>
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              {app.status || 'Under Campus Review'}
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6E73]">
                            {app.college} • {app.category} • {app.branch}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View 5: Badges */}
            {activeTab === 'badges' && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                  Campus Achievements & Badges
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`glass-card p-5 flex items-start gap-4 transition-all ${
                        badge.unlocked ? 'border-[#0859D4]/30 shadow-soft' : 'opacity-55'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          badge.unlocked
                            ? 'bg-[#0859D4]/10 text-[#0859D4] border border-[#0859D4]/20'
                            : 'bg-[#F5F5F7] text-[#6E6E73]'
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
                          <h4 className="font-heading font-bold text-base text-[#1D1D1F]">
                            {badge.name}
                          </h4>
                          {badge.unlocked && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6E6E73] mt-1">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 6: Account Settings */}
            {activeTab === 'settings' && (
              <div className="glass-card p-6 sm:p-8 max-w-xl space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-[#1D1D1F]">
                    Account Settings
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                    Update how your name and college appear on peer reviews and cohort rosters.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-1.5"
                    >
                      Display Name
                    </label>
                    <input
                      id="profile-name"
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#F5F5F7] border border-black/[0.08] rounded-xl text-sm text-[#1D1D1F] outline-none focus:bg-white focus:border-[#0859D4]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-college"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-1.5"
                    >
                      College / University
                    </label>
                    <input
                      id="profile-college"
                      type="text"
                      required
                      value={profileCollege}
                      onChange={(e) => setProfileCollege(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#F5F5F7] border border-black/[0.08] rounded-xl text-sm text-[#1D1D1F] outline-none focus:bg-white focus:border-[#0859D4]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#6E6E73] mb-1">
                      Verified Email
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-[#1D1D1F] bg-[#F5F5F7] px-3.5 py-2.5 rounded-xl border border-black/[0.06]">
                      {user?.email}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Save Profile
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
