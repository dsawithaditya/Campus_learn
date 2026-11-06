import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Star,
  Plus,
  Check,
  Share2,
  GraduationCap,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/Button';
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

  const followedMentorIds = useAppStore((state) => state.followedMentorIds) || [];
  const toggleFollowMentor = useAppStore((state) => state.toggleFollowMentor);
  const addToast = useAppStore((state) => state.addToast);

  const [activeTab, setActiveTab] = useState('courses');

  const isFollowed = followedMentorIds.includes(mentor?.id);
  const mentorCourses = safeCourses.filter((c) => c?.mentorId === mentor?.id);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${mentor?.name || 'Mentor'} on Campus Learn`,
        text: `Check out senior mentor ${mentor?.name} (${mentor?.college}) on Campus Learn!`,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => addToast('Mentor profile link copied!', 'success'))
        .catch(() => addToast('Failed to copy link', 'error'));
    }
  };

  const tabs = [
    { id: 'courses', label: 'Peer Courses', badge: mentorCourses.length },
    { id: 'about', label: 'About & Journey' },
    { id: 'reviews', label: 'Student Feedback' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen relative overflow-hidden">
      {/* Decorative ambient radial background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Mentor Header Profile Card */}
      <div className="glass-card border-b border-border/80 dark:border-border-dark/80 py-10 shadow-soft">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-[3px] bg-gradient-to-tr from-[#FF6B00] via-amber-400 to-[#FF6B00] shadow-[0_0_30px_rgba(255,107,0,0.35)] shrink-0">
                  <img
                    src={mentor?.avatar}
                    alt={mentor?.name || 'Mentor avatar'}
                    className="w-full h-full rounded-[22px] object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-zinc-950 rounded-full shadow-md" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-text dark:text-text-dark">
                    {mentor?.name}
                  </h1>
                  <span className="text-xs bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-pill font-semibold">
                    Campus Lead
                  </span>
                </div>

                <p className="text-sm font-semibold text-orange-400 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>{mentor?.college}</span>
                </p>

                <p className="text-xs sm:text-sm text-muted dark:text-muted-dark">
                  {mentor?.branch} • {mentor?.year}
                </p>

                {/* Follower & Rating counts */}
                <div className="flex items-center gap-5 pt-2 text-xs text-muted dark:text-muted-dark">
                  <span className="flex items-center gap-1 font-semibold text-text dark:text-text-dark">
                    <Users className="w-4 h-4 text-orange-500" />
                    {((mentor?.followers || 0) + (isFollowed ? 1 : 0)).toLocaleString()} followers
                  </span>
                  <Rating value={mentor?.rating || 5} count={(mentor?.coursesCount || 1) * 140} size="sm" />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant={isFollowed ? 'secondary' : 'primary'}
                size="md"
                onClick={() => mentor?.id && toggleFollowMentor(mentor.id)}
                icon={isFollowed ? Check : Plus}
              >
                {isFollowed ? 'Following' : 'Follow Mentor'}
              </Button>
              <Button variant="secondary" size="md" icon={Share2} onClick={handleShare}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="container-custom mt-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} id="mentor-tabs" className="mb-8" />

        {/* Tab 1: Courses */}
        {activeTab === 'courses' && (
          <div>
            {mentorCourses.length === 0 ? (
              <p className="text-sm text-muted dark:text-muted-dark">No published courses yet.</p>
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
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 max-w-3xl shadow-soft">
            <div>
              <h3 className="font-heading font-bold text-lg text-text dark:text-text-dark mb-2">
                Mentor Biography
              </h3>
              <p className="text-sm sm:text-base text-muted dark:text-muted-dark leading-relaxed">
                {mentor?.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 dark:border-border-dark/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted dark:text-muted-dark mb-3">
                Core Competencies & Club Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {mentor?.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 max-w-3xl shadow-soft">
            <h3 className="font-heading font-bold text-lg text-text dark:text-text-dark">
              Student Endorsements
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-text dark:text-text-dark">
                    Pranav V. (2nd year B.Tech)
                  </span>
                  <Rating value={5} size="sm" />
                </div>
                <p className="text-xs text-muted dark:text-muted-dark leading-relaxed">
                  "One of the clearest explanations I have received in my collegiate career. Truly understands what juniors struggle with."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
