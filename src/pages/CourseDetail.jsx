import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Share2,
  Heart,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
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

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useAppStore((state) => state.user);
  const enrolledCourses = useAppStore((state) => state.enrolledCourses) || [];
  const enroll = useAppStore((state) => state.enroll);
  const savedCourseIds = useAppStore((state) => state.savedCourseIds) || [];
  const toggleSave = useAppStore((state) => state.toggleSave);
  const addToast = useAppStore((state) => state.addToast);

  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const safeCourses = Array.isArray(coursesData) ? coursesData : [];
  const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];

  const course = safeCourses.find((c) => c?.slug === slug) || safeCourses[0];
  const category = safeCategories.find((c) => c?.id === course?.categoryId);
  const mentor = safeMentors.find((m) => m?.id === course?.mentorId);

  const isEnrolled = enrolledCourses.some((e) => e?.courseId === course?.id);
  const isSaved = savedCourseIds.includes(course?.id);

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
    { id: 'reviews', label: 'Reviews', badge: course?.reviewsCount ?? 0 },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Top Header / Breadcrumb */}
      <div className="bg-zinc-950/70 border-b border-white/5 py-8">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link to="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link to="/explore" className="hover:text-orange-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            {category && (
              <>
                <Link
                  to={`/explore?category=${category?.id}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  {category?.name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              </>
            )}
            <span className="text-zinc-200 font-medium truncate max-w-[200px]">
              {course?.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Title & Metadata Left Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <span
                    style={{ backgroundColor: `${category?.color || '#f97316'}22`, color: category?.color || '#f97316' }}
                    className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10"
                  >
                    {category?.name}
                  </span>
                )}
                <span className="text-xs font-semibold bg-zinc-800 text-zinc-300 border border-white/10 px-2.5 py-1 rounded-full">
                  {course?.level}
                </span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" /> Updated Jan 2025
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-zinc-100 leading-tight">
                {course?.title}
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {course?.shortDescription}
              </p>

              {/* Stats & Mentor Info */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm">
                <Rating value={course?.rating ?? 5} count={course?.reviewsCount} size="md" />

                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Users className="w-4 h-4 text-orange-400" strokeWidth={2} />
                  <span>{(course?.studentsCount || 0).toLocaleString()} students enrolled</span>
                </div>

                {mentor && (
                  <Link
                    to={`/mentor/${mentor?.id}`}
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-[#FF6B00] to-white/20 shrink-0">
                      <img
                        src={mentor?.avatar}
                        alt={mentor?.name || 'Mentor'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-zinc-200 underline decoration-dotted">
                      {mentor?.name} • {mentor?.expertise || 'Domain Lead'}
                    </span>
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
          <div className="lg:col-span-8 space-y-8">
            {/* Video Preview Block */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl border border-white/10 group">
              <img
                src={course?.thumbnail}
                alt={course?.title || 'Preview'}
                className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Play sample lesson"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                >
                  <Play className="w-8 h-8 ml-1 fill-white" strokeWidth={0} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  Course Preview (5:20 min)
                </span>
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 rounded-md font-bold shadow-sm">
                  Free Access
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} id="course-details" />

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What you'll learn checklist */}
                <div className="glass-card p-6 sm:p-8">
                  <h3 className="font-heading font-bold text-lg text-zinc-100 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <span>What you'll master in this course</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {course?.learnPoints?.map((point, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course In-Depth Description */}
                <div className="glass-card p-6 sm:p-8 space-y-4">
                  <h3 className="font-heading font-bold text-lg text-zinc-100">
                    About this peer learning course
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {course?.description}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {course?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full border border-white/5"
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
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>{course?.syllabus?.length || 3} Modules • {course?.lessonsCount} Lessons</span>
                  <span>Total: {course?.durationHours} Hours</span>
                </div>
                <Accordion>
                  {course?.syllabus?.map((module, mIdx) => (
                    <AccordionItem
                      key={mIdx}
                      title={module?.title}
                      defaultOpen={mIdx === 0}
                    >
                      <ul className="space-y-2.5">
                        {module?.lessons?.map((lesson, lIdx) => (
                          <li
                            key={lIdx}
                            className="flex items-center justify-between py-1 border-b border-white/5 last:border-none"
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3.5 h-3.5 text-orange-400" strokeWidth={2} />
                              <span className="text-xs sm:text-sm font-medium text-zinc-200">{lesson?.title}</span>
                            </div>
                            <span className="text-xs text-zinc-500 font-mono">
                              {lesson?.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="glass-card p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                  <div className="text-4xl font-heading font-extrabold text-zinc-100">
                    {(course?.rating ?? 5).toFixed(1)}
                  </div>
                  <div>
                    <Rating value={course?.rating ?? 5} size="md" />
                    <p className="text-xs text-zinc-500 mt-1">
                      Based on {course?.reviewsCount} verified student ratings
                    </p>
                  </div>
                </div>

                {/* Review items */}
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/60 border border-white/5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-zinc-200">
                        Siddharth Verma (IIT Roorkee)
                      </span>
                      <Rating value={5} size="sm" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      "Extremely concise and straight to the point. No 20-minute theoretical rants, just straight hands-on code and campus tactics."
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900/60 border border-white/5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-zinc-200">
                        Anjali Menon (NIT Calicut)
                      </span>
                      <Rating value={5} size="sm" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      "I followed this before our annual cultural auditions and it gave me the exact foundation I needed. Highly recommend to juniors!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Action Card (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="glass-card p-6 shadow-2xl space-y-5">
              {/* Thumbnail */}
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-800">
                <img
                  src={course?.thumbnail}
                  alt={course?.title || 'Course'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price & Free Tag */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-heading font-extrabold text-orange-400">
                    {course?.price || 'Free'}
                  </span>
                  <span className="text-xs text-zinc-500 ml-2">
                    Students-Only Peer Grant
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  100% Free
                </span>
              </div>

              {/* Enroll Button */}
              <Button
                variant={isEnrolled ? 'secondary' : 'primary'}
                fullWidth
                size="lg"
                onClick={handleEnroll}
              >
                {isEnrolled ? 'Go to Dashboard →' : 'Enroll in Course'}
              </Button>

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
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>Duration</span>
                  </span>
                  <span className="font-semibold text-zinc-200">{course?.durationHours} hours on-demand</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>Lessons</span>
                  </span>
                  <span className="font-semibold text-zinc-200">{course?.lessonsCount} lessons</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-orange-400" />
                    <span>Certificate</span>
                  </span>
                  <span className="font-semibold text-zinc-200">Peer-Verified Badge</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Access</span>
                  </span>
                  <span className="font-semibold text-zinc-200">Lifetime Campus Access</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Courses Row */}
        {relatedCourses.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="font-heading font-bold text-2xl text-zinc-100 mb-6">
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

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={course?.title || 'Preview'}
      >
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 flex flex-col items-center justify-center text-white relative border border-white/10">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-300">
            Playing Lesson 1: Introduction & Architecture
          </p>
        </div>
      </Modal>
    </div>
  );
}
