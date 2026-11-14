import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Star,
  Plus,
  Check,
  Share2,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { Tabs } from '../components/Tabs';
import { Rating } from '../components/Rating';
import { useAppStore } from '../store/useAppStore';
import mentorsData from '../data/mentors.json';
import coursesData from '../data/courses.json';

export default function MentorProfile() {
  const { id } = useParams();
  const safeMentors = Array.isArray(mentorsData) ? mentorsData : [];
  const safeCourses = Array.isArray(coursesData) ? coursesData : [];

  const mentor = safeMentors.find((m) => m?.id === id) || safeMentors[0] || {};

  const followedMentorIds =
    useAppStore((state) => state.followedMentorIds) || [];
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);
  const addToast = useAppStore((state) => state.addToast);

  const [activeTab, setActiveTab] = useState('courses');

  const isFollowed = followedMentorIds.includes(mentor?.id);
  const mentorCourses = safeCourses.filter((c) => c?.mentorId === mentor?.id);

  const handleShare = () => {
    const shareTitle = `${mentor?.name || 'Mentor'} on Campus Learn`;
    const shareText = `${mentor?.name} — ${mentor?.expertise || 'Senior Mentor'} on Campus Learn`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => addToast('Mentor profile link copied!', 'success'))
        .catch(() => addToast('Failed to copy link', 'error'));
    }
  };

  const tabs = [
    { id: 'courses', label: 'Cohorts', badge: mentorCourses.length },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Feedback' },
  ];

  const firstName = mentor?.name?.split(' ')[0] || 'Mentor';
  const restName = mentor?.name?.split(' ').slice(1).join(' ') || '';

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[560px] h-[260px] bg-[#0859D4]/[0.05] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-custom space-y-8">
        {/* Compact Back Link */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#6E6E73]">
          <Link
            to="/mentors"
            className="inline-flex items-center gap-1.5 text-[#424242] hover:text-[#0859D4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mentors</span>
          </Link>
          <span>/</span>
          <span className="text-[#1D1D1F] font-medium truncate">{mentor?.name}</span>
        </div>

        {/* Contained Minimalist Profile Hero Card */}
        <div className="relative rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 overflow-hidden shadow-[0_16px_44px_rgba(29,29,31,0.06)]">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#0859D4]/[0.06] blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
              {/* Crisp Framed Portrait */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                <div className="w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-b from-[#0859D4]/75 via-[#1A59F9]/30 to-black/10 shadow-[0_12px_28px_rgba(8,89,212,0.14)]">
                  <img
                    src={mentor?.avatar}
                    alt={mentor?.name || 'Mentor avatar'}
                    className="w-full h-full rounded-[14px] object-cover object-top bg-[#F5F5F7]"
                  />
                </div>
                <span
                  title="Available for 1:1 sessions"
                  className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
                />
              </div>

              {/* Identity, Bio & Stats */}
              <div className="space-y-3 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] font-semibold text-[#0859D4] bg-[#0859D4]/10 border border-[#0859D4]/20 px-2.5 py-0.5 rounded-full">
                    {mentor?.expertise || 'Senior Mentor'}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Verified Lead
                  </span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#1D1D1F] tracking-tight leading-tight">
                  {firstName}{' '}
                  {restName && (
                    <span className="font-editorial italic font-normal text-[#0859D4]">
                      {restName}
                    </span>
                  )}
                </h1>

                {mentor?.bio && (
                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-2xl">
                    {mentor.bio}
                  </p>
                )}

                {/* Metrics & Skill Pills */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-mono text-[#6E6E73]">
                  <span className="flex items-center gap-1.5 text-[#1D1D1F] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{mentor?.rating ?? 5}</span>
                    <span className="text-[#6E6E73] font-normal">
                      ({(mentor?.coursesCount || 1) * 140})
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>
                      {((mentor?.followers || 0) + (isFollowed ? 1 : 0)).toLocaleString()} followers
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>{mentorCourses.length} cohorts</span>
                  </span>
                </div>

                {Array.isArray(mentor?.skills) && mentor.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mentor.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[11px] text-[#424242] bg-[#F5F5F7] border border-black/[0.06] px-2.5 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
              <button
                type="button"
                onClick={() => mentor?.id && toggleFollowMentor(mentor.id)}
                className={`inline-flex items-center gap-1.5 text-xs sm:text-sm px-5 py-2.5 rounded-full font-heading font-semibold transition-all cursor-pointer ${
                  isFollowed ? 'btn-zephyr-secondary' : 'btn-zephyr-primary'
                }`}
              >
                {isFollowed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Follow</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share mentor profile"
                className="btn-zephyr-secondary text-xs sm:text-sm px-4 py-2.5 inline-flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          id="mentor-tabs"
        />

        {/* Tab 1: Cohorts */}
        {activeTab === 'courses' && (
          <div>
            {mentorCourses.length === 0 ? (
              <div className="rounded-2xl bg-[#F5F5F7] border border-black/[0.08] p-8 text-center text-sm text-[#6E6E73]">
                No published cohorts yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorCourses.map((c) => (
                  <CourseCard key={c?.id} course={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: About */}
        {activeTab === 'about' && (
          <div className="rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 space-y-6 max-w-3xl shadow-soft">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#1D1D1F] mb-2">
                Background
              </h3>
              <p className="text-sm text-[#424242] leading-relaxed">
                {mentor?.bio}
              </p>
            </div>

            {Array.isArray(mentor?.skills) && mentor.skills.length > 0 && (
              <div className="pt-5 border-t border-black/[0.08]">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] mb-3">
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs font-medium bg-[#0859D4]/10 border border-[#0859D4]/20 text-[#0859D4] px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Feedback */}
        {activeTab === 'reviews' && (
          <div className="rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 space-y-4 max-w-3xl shadow-soft">
            <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
              Student Feedback
            </h3>
            <div className="p-4 bg-[#F5F5F7] border border-black/[0.06] rounded-xl space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-semibold text-xs sm:text-sm text-[#1D1D1F]">
                  Pranav V. • 2nd Year
                </span>
                <Rating value={5} size="sm" showValue={false} />
              </div>
              <p className="text-xs sm:text-sm text-[#424242] leading-relaxed">
                &ldquo;Clear, practical sessions with zero fluff. Helped me ship my first project within a week.&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
