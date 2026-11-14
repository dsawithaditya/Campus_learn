import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Play,
  CheckCircle2,
  Check,
  Clock,
  BookOpen,
  Award,
  Share2,
  Heart,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  Star,
  LogOut,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Rating } from '../components/Rating';
import { Tabs } from '../components/Tabs';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Modal } from '../components/Modal';
import { CourseCard } from '../components/CourseCard';
import { useAppStore } from '../store/useAppStore';
import coursesData from '../data/courses.json';
import categoriesData from '../data/categories.json';
import mentorsData from '../data/mentors.json';
import reviewsData from '../data/reviews.json';

function formatCourseDate(raw) {
  if (!raw) return 'Spring 2026';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useAppStore((state) => state.user);
  const enrolledCourses = useAppStore((state) => state.enrolledCourses) || [];
  const enroll = useAppStore((state) => state.enroll);
  const unenroll = useAppStore((state) => state.unenroll);
  const toggleLessonComplete = useAppStore((state) => state.toggleLessonComplete);
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const toggleSave = useAppStore((state) => state.toggleSave);
  const courseReviewsMap = useAppStore((state) => state.courseReviews) || {};
  const addCourseReview = useAppStore((state) => state.addCourseReview);
  const addToast = useAppStore((state) => state.addToast);

  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [previewLessonIdx, setPreviewLessonIdx] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  const course = safeCourses.find((c) => c?.slug === slug) || safeCourses[0];
  const category = safeCategories.find((c) => c?.id === course?.categoryId);
  const mentor = safeMentors.find((m) => m?.id === course?.mentorId);

  const enrollmentEntry = enrolledCourses.find((e) => e?.courseId === course?.id);
  const isEnrolled = Boolean(enrollmentEntry);
  const completedLessons = Array.isArray(enrollmentEntry?.completedLessons)
    ? enrollmentEntry.completedLessons
    : [];
  const isSaved = savedCourseIds.includes(course?.id);

  const totalSyllabusLessons = useMemo(() => {
    const count = (course?.syllabus || []).reduce(
      (acc, mod) => acc + (mod?.lessons?.length || 0),
      0
    );
    return count || course?.lessonsCount || 6;
  }, [course]);

  const sampleLessons = useMemo(() => {
    const firstMod = course?.syllabus?.[0]?.lessons || [];
    if (firstMod.length > 0) return firstMod.slice(0, 3);
    return [
      { title: 'Introduction & Cohort Roadmap', duration: '05:20' },
      { title: 'Core Mental Models & Setup', duration: '12:45' },
      { title: 'Hands-on Guided Walkthrough', duration: '18:10' },
    ];
  }, [course]);

  const displayedReviews = useMemo(() => {
    const custom = courseReviewsMap[course?.id] || [];
    const domainSeed = reviewsData?.[course?.categoryId] || reviewsData?.tech || [];
    return [...custom, ...domainSeed];
  }, [courseReviewsMap, course?.id, course?.categoryId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in with your college account to leave a review', 'info');
      navigate('/login');
      return;
    }
    if (reviewText.trim().length < 10) {
      addToast('Please write at least 10 characters for your peer review', 'error');
      return;
    }
    addCourseReview(course.id, {
      rating: reviewRating,
      comment: reviewText.trim(),
    });
    setReviewText('');
    setReviewRating(5);
  };

  const handleEnroll = () => {
    if (!user) {
      addToast('Please login with your college email to enroll', 'info');
      navigate('/login');
      return;
    }

    if (isEnrolled) {
      navigate('/dashboard');
    } else if (course?.id) {
      enroll(course.id);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: course?.title,
        text: `Check out this peer course: ${course?.title} on Campus Learn!`,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => addToast('Course link copied to clipboard!', 'success'))
        .catch(() => addToast('Failed to copy link', 'error'));
    }
  };

  const relatedCourses = safeCourses
    .filter((c) => c?.id !== course?.id && (c?.categoryId === course?.categoryId || c?.mentorId === course?.mentorId))
    .slice(0, 4);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'syllabus', label: 'Syllabus', badge: course?.syllabus?.length || 3 },
    { id: 'reviews', label: 'Reviews', badge: (course?.reviewsCount ?? 0) + (courseReviewsMap[course?.id]?.length || 0) },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-16 min-h-screen">
      {/* Top Header / Breadcrumb */}
      <div className="bg-[#F5F5F7] border-b border-black/[0.08] py-8">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6E6E73] mb-4">
            <Link to="/" className="hover:text-[#0859D4] transition-colors whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black/25 shrink-0" />
            <Link to="/explore" className="hover:text-[#0859D4] transition-colors whitespace-nowrap">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-black/25 shrink-0" />
            {category && (
              <>
                <Link
                  to={`/explore?category=${category?.id}`}
                  className="hover:text-[#0859D4] transition-colors whitespace-nowrap"
                >
                  {category?.name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-black/25 shrink-0" />
              </>
            )}
            <span className="text-[#1D1D1F] font-medium truncate max-w-[220px] sm:max-w-xs">
              {course?.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Title & Metadata Left Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <span
                    style={{ backgroundColor: `${category?.color || '#0859D4'}18`, color: category?.color || '#0859D4' }}
                    className="text-xs font-semibold px-3 py-1 rounded-full border border-black/[0.08]"
                  >
                    {category?.name}
                  </span>
                )}
                <span className="text-xs font-semibold bg-white text-[#424242] border border-black/[0.08] px-2.5 py-1 rounded-full">
                  {course?.level}
                </span>
                <span className="text-xs text-[#6E6E73] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0859D4]" /> Updated {formatCourseDate(course?.createdAt)}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1D1D1F] leading-tight">
                {course?.title}
              </h1>

              <p className="text-[#424242] text-sm sm:text-base leading-relaxed">
                {course?.shortDescription}
              </p>

              {/* Stats & Mentor Info */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs sm:text-sm">
                <Rating value={course?.rating ?? 5} count={course?.reviewsCount} size="md" />

                <div className="flex items-center gap-1.5 text-[#6E6E73]">
                  <Users className="w-4 h-4 text-[#0859D4]" strokeWidth={2} />
                  <span>{(course?.studentsCount || 0).toLocaleString()} students enrolled</span>
                </div>

                {mentor && (
                  <Link
                    to={`/mentor/${mentor?.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] hover:border-[#0859D4]/40 hover:text-[#0859D4] transition-all shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-[#0859D4] to-black/15 shrink-0">
                      <img
                        src={mentor?.avatar}
                        alt={mentor?.name || 'Mentor'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-[#1D1D1F] text-xs">
                      {mentor?.name}
                    </span>
                    {mentor?.college && (
                      <span className="font-mono text-[10px] text-[#6E6E73] hidden sm:inline">
                        • {mentor.college}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Video Preview Block */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#F5F5F7] shadow-[0_18px_48px_rgba(29,29,31,0.12)] border border-black/[0.08] group">
              <img
                src={course?.thumbnail}
                alt={course?.title || 'Preview'}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Play sample lesson"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0859D4] text-white flex items-center justify-center shadow-2xl hover:bg-[#1A59F9] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-8 h-8 ml-1 fill-white" strokeWidth={0} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-white/95 text-[#1D1D1F] backdrop-blur-md px-2.5 py-1 rounded-md border border-black/10 font-medium shadow-sm">
                  Sample Lesson Preview
                </span>
                <span className="bg-gradient-to-r from-[#0859D4] to-[#1A59F9] px-2.5 py-0.5 rounded-md font-bold shadow-sm">
                  Free Access
                </span>
              </div>
            </div>

            {/* Mobile Quick-Enroll Strip (keeps primary CTA visible immediately on phones) */}
            <div className="lg:hidden glass-card p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-heading font-extrabold text-[#0859D4]">
                    {course?.price || 'Free'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    100% Free
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#6E6E73] mt-0.5">
                  {course?.lessonsCount} lessons • {course?.durationHours}h
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => course?.id && toggleSave(course.id)}
                  aria-label={isSaved ? 'Remove bookmark' : 'Save course'}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#0859D4]/10 border-[#0859D4]/30 text-[#0859D4]'
                      : 'bg-[#F5F5F7] border-black/10 text-[#424242]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#0859D4]' : ''}`} />
                </button>
                <Button
                  variant={isEnrolled ? 'secondary' : 'primary'}
                  size="sm"
                  className="min-h-[44px] px-4"
                  onClick={handleEnroll}
                >
                  {isEnrolled ? 'Dashboard →' : 'Enroll Free'}
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} id="course-details" />

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What you'll learn checklist */}
                <div className="glass-card p-6 sm:p-8">
                  <h3 className="font-heading font-bold text-lg text-[#1D1D1F] mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0859D4]" />
                    <span>What you'll master in this course</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {course?.learnPoints?.map((point, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#424242]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course In-Depth Description */}
                <div className="glass-card p-6 sm:p-8 space-y-4">
                  <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
                    About this peer learning course
                  </h3>
                  <p className="text-sm sm:text-base text-[#424242] leading-relaxed">
                    {course?.description}
                  </p>
                  <div className="pt-4 border-t border-black/[0.08] flex flex-wrap gap-2">
                    {course?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-[#F5F5F7] text-[#424242] px-2.5 py-1 rounded-full border border-black/[0.06]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Syllabus */}
            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E6E73] mb-2">
                  <span>{course?.syllabus?.length || 3} Modules • {course?.lessonsCount} Lessons</span>
                  <span className="font-mono">
                    {isEnrolled
                      ? `${enrollmentEntry?.progress ?? 0}% completed (${completedLessons.length}/${totalSyllabusLessons})`
                      : `Total: ${course?.durationHours} Hours`}
                  </span>
                </div>
                <Accordion>
                  {course?.syllabus?.map((module, mIdx) => (
                    <AccordionItem
                      key={mIdx}
                      title={module?.title}
                      defaultOpen={mIdx === 0}
                    >
                      <ul className="space-y-2">
                        {module?.lessons?.map((lesson, lIdx) => {
                          const lessonKey = `${mIdx}-${lIdx}`;
                          const isDone = completedLessons.includes(lessonKey);
                          return (
                            <li
                              key={lIdx}
                              className="flex items-center justify-between gap-3 py-1.5 border-b border-black/[0.06] last:border-none"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (!user) {
                                    addToast('Login with your campus account to track lesson progress', 'info');
                                    navigate('/login');
                                    return;
                                  }
                                  toggleLessonComplete(course.id, lessonKey, totalSyllabusLessons);
                                }}
                                className="flex items-center gap-2.5 text-left min-h-[36px] flex-1 cursor-pointer group"
                              >
                                <span
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                                    isDone
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'bg-white border-black/15 text-transparent group-hover:border-[#0859D4]'
                                  }`}
                                >
                                  <Check className="w-3 h-3" strokeWidth={2.5} />
                                </span>
                                <span
                                  className={`text-xs sm:text-sm font-medium transition-colors ${
                                    isDone ? 'text-[#6E6E73] line-through' : 'text-[#1D1D1F] group-hover:text-[#0859D4]'
                                  }`}
                                >
                                  {lesson?.title}
                                </span>
                              </button>
                              <span className="text-xs text-[#6E6E73] font-mono shrink-0">
                                {lesson?.duration}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="glass-card p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/[0.08]">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-heading font-extrabold text-[#1D1D1F]">
                      {(course?.rating ?? 5).toFixed(1)}
                    </div>
                    <div>
                      <Rating value={course?.rating ?? 5} size="md" showValue={false} />
                      <p className="text-xs text-[#6E6E73] mt-1">
                        Based on {(course?.reviewsCount ?? 0) + (courseReviewsMap[course?.id]?.length || 0)} verified student ratings
                      </p>
                    </div>
                  </div>
                </div>

                {/* Write a Peer Review Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.08] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#1D1D1F]">
                      Share your cohort experience
                    </span>
                    <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setReviewRating(starVal)}
                          aria-label={`Rate ${starVal} stars`}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              starVal <= reviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-black/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="What project or campus goal did this course help you with?"
                    className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-black/10 text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] focus:outline-none focus:border-[#0859D4] focus:bg-white transition-colors resize-none"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" variant="secondary" size="sm">
                      Post Review
                    </Button>
                  </div>
                </form>

                {/* Domain-Specific Review Items */}
                <div className="space-y-4">
                  {displayedReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-semibold text-xs text-[#1D1D1F]">
                            {rev.author}
                          </span>
                          <span className="text-[11px] font-mono text-[#6E6E73] ml-2">
                            {rev.college} • {rev.date}
                          </span>
                        </div>
                        <Rating value={rev.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-xs sm:text-sm text-[#424242] leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Action Card (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="glass-card p-6 shadow-[0_18px_48px_rgba(29,29,31,0.08)] space-y-5">
              {/* Thumbnail */}
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#F5F5F7]">
                <img
                  src={course?.thumbnail}
                  alt={course?.title || 'Course'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price & Free Tag */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-heading font-extrabold text-[#0859D4]">
                    {course?.price || 'Free'}
                  </span>
                  <span className="text-xs text-[#6E6E73] ml-2">
                    Students-Only Peer Grant
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  100% Free
                </span>
              </div>

              {/* Enroll / Leave Actions */}
              <Button
                variant={isEnrolled ? 'secondary' : 'primary'}
                fullWidth
                size="lg"
                onClick={handleEnroll}
              >
                {isEnrolled ? 'Go to Dashboard →' : 'Enroll in Course'}
              </Button>

              {isEnrolled && (
                <button
                  type="button"
                  onClick={() => course?.id && unenroll(course.id)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-[#6E6E73] hover:text-rose-600 transition-colors py-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Leave this cohort</span>
                </button>
              )}

              {/* Secondary Actions: Save & Share */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => course?.id && toggleSave(course.id)}
                  icon={Heart}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShare}
                  icon={Share2}
                >
                  Share
                </Button>
              </div>

              {/* Course Facts List */}
              <div className="pt-4 border-t border-black/[0.08] space-y-3 text-xs text-[#424242]">
                <div className="flex items-center justify-between">
                  <span className="text-[#6E6E73] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>Duration</span>
                  </span>
                  <span className="font-semibold text-[#1D1D1F]">{course?.durationHours} hours on-demand</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6E6E73] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>Lessons</span>
                  </span>
                  <span className="font-semibold text-[#1D1D1F]">{course?.lessonsCount} lessons</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6E6E73] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>Certificate</span>
                  </span>
                  <span className="font-semibold text-[#1D1D1F]">Peer-Verified Badge</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6E6E73] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>Access</span>
                  </span>
                  <span className="font-semibold text-[#1D1D1F]">Lifetime Campus Access</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Courses Row */}
        {relatedCourses.length > 0 && (
          <div className="mt-20 pt-12 border-t border-black/[0.08]">
            <h3 className="font-heading font-bold text-2xl text-[#1D1D1F] mb-6">
              Students also checked out
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCourses?.map((c) => (
                <CourseCard key={c?.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Sample Lesson Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={`${course?.title || 'Course'} — Sample Preview`}
      >
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1D1D1F] flex flex-col items-center justify-center text-white relative border border-black/10 p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#0859D4] flex items-center justify-center shadow-2xl">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
            <p className="mt-4 text-sm sm:text-base font-heading font-bold text-white">
              Lesson {previewLessonIdx + 1}: {sampleLessons[previewLessonIdx]?.title}
            </p>
            <p className="mt-1 text-xs font-mono text-white/65">
              Duration {sampleLessons[previewLessonIdx]?.duration || '05:20'} • Peer Recorded Walkthrough
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E6E73] block">
              Switch preview lesson
            </span>
            <div className="space-y-1.5">
              {sampleLessons.map((les, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewLessonIdx(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm border transition-colors cursor-pointer ${
                    previewLessonIdx === idx
                      ? 'bg-[#0859D4]/10 border-[#0859D4]/30 text-[#0859D4] font-semibold'
                      : 'bg-[#F5F5F7] border-black/[0.06] text-[#1D1D1F] hover:bg-[#EBEBF0]'
                  }`}
                >
                  <span className="truncate pr-3">
                    {idx + 1}. {les.title}
                  </span>
                  <span className="font-mono text-xs text-[#6E6E73] shrink-0">
                    {les.duration}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
