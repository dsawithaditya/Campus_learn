import { create } from 'zustand';

const getStoredValue = (key, fallback) => {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    const parsed = JSON.parse(item);
    return parsed === undefined ? fallback : parsed;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setStoredValue = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

export const DEMO_EMAIL = 'aarav.sharma@iitb.ac.in';

export const DEMO_USER = {
  name: 'Aarav Sharma',
  email: DEMO_EMAIL,
  college: 'IIT Bombay',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  streak: 8,
  isDemo: true,
  badges: ['Early Bird', 'Tech Maven', 'Streak Master'],
  weeklyMinutes: [35, 50, 40, 65, 30, 80, 55],
};

export const DEMO_ENROLLED_COURSES = [
  {
    courseId: 'c1',
    progress: 65,
    lastAccessed: '2026-11-12',
    completedLessons: ['m0-l0', 'm0-l1', 'm0-l2', 'm1-l0'],
  },
  {
    courseId: 'c3',
    progress: 30,
    lastAccessed: '2026-11-10',
    completedLessons: ['m0-l0', 'm0-l1'],
  },
  {
    courseId: 'c7',
    progress: 85,
    lastAccessed: '2026-11-08',
    completedLessons: ['m0-l0', 'm0-l1', 'm0-l2', 'm1-l0', 'm1-l1'],
  },
];

export const DEMO_SAVED_COURSES = ['c1', 'c4', 'c6'];
export const DEMO_FOLLOWED_MENTORS = ['m1', 'm3', 'm6'];
export const DEMO_BOOKED_SESSIONS = [
  {
    id: 'ses-demo-1',
    mentorId: 'm1',
    mentorName: 'Rohan Deshmukh',
    topic: 'Supabase RLS Architecture Review',
    slot: 'Thu, 6:30 PM IST',
    note: 'Reviewing row-level security policies for hostel marketplace project.',
    createdAt: '2026-11-11T14:20:00.000Z',
    isDemo: true,
  },
];

const USER_ACCOUNTS_KEY = 'campus_registered_accounts';

function getRegisteredAccounts() {
  return getStoredValue(USER_ACCOUNTS_KEY, {}) || {};
}

function saveRegisteredAccountState(email, patch) {
  if (!email || email.toLowerCase() === DEMO_EMAIL) return;
  const accounts = getRegisteredAccounts();
  const key = email.toLowerCase();
  const existing = accounts[key] || {};
  accounts[key] = { ...existing, ...patch };
  setStoredValue(USER_ACCOUNTS_KEY, accounts);
}

const initialUser = getStoredValue('campus_user', DEMO_USER);
const initialEnrolled = getStoredValue('campus_enrolled_courses', DEMO_ENROLLED_COURSES) || [];
const initialSaved = getStoredValue('campus_saved_courses', DEMO_SAVED_COURSES) || [];
const initialFollowed = getStoredValue('campus_followed_mentors', DEMO_FOLLOWED_MENTORS) || [];
const initialSessions = getStoredValue('campus_booked_sessions', DEMO_BOOKED_SESSIONS) || [];
const initialReviews = getStoredValue('campus_course_reviews', {}) || {};
const initialApps = getStoredValue('campus_mentor_applications', []) || [];
const initialWaitlist = getStoredValue('campus_waitlist_emails', []) || [];

export const useAppStore = create((set, get) => ({
  savedCourseIds: initialSaved,
  enrolledCourses: initialEnrolled,
  user: initialUser,
  followedMentorIds: initialFollowed,
  bookedSessions: initialSessions,
  courseReviews: initialReviews,
  mentorApplications: initialApps,
  waitlistEmails: initialWaitlist,
  searchQuery: '',
  isSearchModalOpen: false,
  toasts: [],

  setSearchModalOpen: (isOpen) => set({ isSearchModalOpen: Boolean(isOpen) }),

  toggleSave: (id) => {
    let wasSaved = false;
    let nextSaved = [];
    set((state) => {
      const currentList = Array.isArray(state.savedCourseIds) ? state.savedCourseIds : [];
      wasSaved = currentList.includes(id);
      nextSaved = wasSaved
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];
      setStoredValue('campus_saved_courses', nextSaved);
      return { savedCourseIds: nextSaved };
    });

    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { savedCourseIds: nextSaved });
    }

    get().addToast(
      wasSaved ? 'Removed course from saved list' : 'Saved cohort to your library',
      'info'
    );
  },

  enroll: (courseId) => {
    let alreadyEnrolled = false;
    let nextEnrolled = [];
    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      const exists = currentList.some((e) => e?.courseId === courseId);
      if (exists) {
        alreadyEnrolled = true;
        return state;
      }
      nextEnrolled = [
        ...currentList,
        {
          courseId,
          progress: 0,
          lastAccessed: new Date().toISOString().slice(0, 10),
          completedLessons: [],
        },
      ];
      setStoredValue('campus_enrolled_courses', nextEnrolled);
      return { enrolledCourses: nextEnrolled };
    });

    if (alreadyEnrolled) {
      get().addToast('You are already enrolled in this cohort', 'info');
    } else {
      const currentUser = get().user;
      if (currentUser && !currentUser.isDemo) {
        saveRegisteredAccountState(currentUser.email, { enrolledCourses: nextEnrolled });
      }
      get().addToast('Enrolled in cohort! Open Dashboard to track progress.', 'success');
    }
  },

  unenroll: (courseId) => {
    let nextEnrolled = [];
    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      nextEnrolled = currentList.filter((e) => e?.courseId !== courseId);
      setStoredValue('campus_enrolled_courses', nextEnrolled);
      return { enrolledCourses: nextEnrolled };
    });
    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { enrolledCourses: nextEnrolled });
    }
    get().addToast('Left cohort from your dashboard', 'info');
  },

  updateCourseProgress: (courseId, progressOrFn) => {
    let nextEnrolled = [];
    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      nextEnrolled = currentList.map((c) => {
        if (c?.courseId === courseId) {
          const currentProgress = c.progress ?? 0;
          const nextVal =
            typeof progressOrFn === 'function' ? progressOrFn(currentProgress) : progressOrFn;
          return {
            ...c,
            progress: Math.min(100, Math.max(0, nextVal)),
            lastAccessed: new Date().toISOString().slice(0, 10),
          };
        }
        return c;
      });
      setStoredValue('campus_enrolled_courses', nextEnrolled);
      return { enrolledCourses: nextEnrolled };
    });
    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { enrolledCourses: nextEnrolled });
    }
  },

  toggleLessonComplete: (courseId, lessonKey, totalLessons = 6) => {
    let nextEnrolled = [];
    let isNowDone = false;
    let nextProgress = 0;

    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      const exists = currentList.some((e) => e?.courseId === courseId);
      const baseList = exists
        ? currentList
        : [
            ...currentList,
            {
              courseId,
              progress: 0,
              lastAccessed: new Date().toISOString().slice(0, 10),
              completedLessons: [],
            },
          ];

      nextEnrolled = baseList.map((c) => {
        if (c?.courseId !== courseId) return c;
        const done = Array.isArray(c.completedLessons) ? c.completedLessons : [];
        const has = done.includes(lessonKey);
        const updatedDone = has ? done.filter((k) => k !== lessonKey) : [...done, lessonKey];
        isNowDone = !has;
        const denom = Math.max(1, totalLessons);
        nextProgress = Math.min(100, Math.round((updatedDone.length / denom) * 100));
        return {
          ...c,
          completedLessons: updatedDone,
          progress: nextProgress,
          lastAccessed: new Date().toISOString().slice(0, 10),
        };
      });

      setStoredValue('campus_enrolled_courses', nextEnrolled);
      return { enrolledCourses: nextEnrolled };
    });

    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { enrolledCourses: nextEnrolled });
    }

    get().addToast(
      isNowDone
        ? nextProgress >= 100
          ? 'All lessons completed — 100% finished!'
          : `Lesson completed (${nextProgress}% done)`
        : 'Lesson marked incomplete',
      isNowDone ? 'success' : 'info'
    );
  },

  login: (userData) => {
    const cleanEmail = (userData?.email || '').trim().toLowerCase();
    const isDemo = !cleanEmail || cleanEmail === DEMO_EMAIL;

    if (isDemo) {
      const demoProfile = {
        ...DEMO_USER,
        name: userData?.name || DEMO_USER.name,
        email: DEMO_EMAIL,
      };
      setStoredValue('campus_user', demoProfile);
      setStoredValue('campus_enrolled_courses', DEMO_ENROLLED_COURSES);
      setStoredValue('campus_saved_courses', DEMO_SAVED_COURSES);
      setStoredValue('campus_followed_mentors', DEMO_FOLLOWED_MENTORS);
      setStoredValue('campus_booked_sessions', DEMO_BOOKED_SESSIONS);
      set({
        user: demoProfile,
        enrolledCourses: DEMO_ENROLLED_COURSES,
        savedCourseIds: DEMO_SAVED_COURSES,
        followedMentorIds: DEMO_FOLLOWED_MENTORS,
        bookedSessions: DEMO_BOOKED_SESSIONS,
      });
      get().addToast(`Signed into Demo Student Workspace (${demoProfile.name.split(' ')[0]})`, 'success');
      return;
    }

    // Real/personal student session kept strictly separated from Demo seed data
    const accounts = getRegisteredAccounts();
    const savedAccount = accounts[cleanEmail] || null;
    const rawName = (userData?.name || cleanEmail.split('@')[0] || 'Student Learner')
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (ch) => ch.toUpperCase());

    const user = savedAccount?.user || {
      name: rawName,
      email: cleanEmail,
      college: userData?.college || (cleanEmail.endsWith('.ac.in') ? 'Indian Institute of Technology' : 'University College'),
      avatar:
        userData?.avatar ||
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=80',
      streak: 1,
      isDemo: false,
      badges: ['Early Bird'],
      weeklyMinutes: [20, 0, 0, 0, 0, 0, 0],
    };

    const enrolledCourses = savedAccount?.enrolledCourses || [];
    const savedCourseIds = savedAccount?.savedCourseIds || [];
    const followedMentorIds = savedAccount?.followedMentorIds || [];
    const bookedSessions = savedAccount?.bookedSessions || [];

    saveRegisteredAccountState(cleanEmail, {
      user,
      enrolledCourses,
      savedCourseIds,
      followedMentorIds,
      bookedSessions,
    });

    setStoredValue('campus_user', user);
    setStoredValue('campus_enrolled_courses', enrolledCourses);
    setStoredValue('campus_saved_courses', savedCourseIds);
    setStoredValue('campus_followed_mentors', followedMentorIds);
    setStoredValue('campus_booked_sessions', bookedSessions);

    set({
      user,
      enrolledCourses,
      savedCourseIds,
      followedMentorIds,
      bookedSessions,
    });
    get().addToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
  },

  updateProfile: (patch) => {
    const current = get().user;
    if (!current) return;
    const updated = {
      ...current,
      name: (patch?.name || current.name).trim(),
      college: (patch?.college || current.college).trim(),
    };
    setStoredValue('campus_user', updated);
    if (!updated.isDemo) {
      saveRegisteredAccountState(updated.email, { user: updated });
    }
    set({ user: updated });
    get().addToast('Profile details updated', 'success');
  },

  resetDemoWorkspace: () => {
    setStoredValue('campus_user', DEMO_USER);
    setStoredValue('campus_enrolled_courses', DEMO_ENROLLED_COURSES);
    setStoredValue('campus_saved_courses', DEMO_SAVED_COURSES);
    setStoredValue('campus_followed_mentors', DEMO_FOLLOWED_MENTORS);
    setStoredValue('campus_booked_sessions', DEMO_BOOKED_SESSIONS);
    setStoredValue('campus_course_reviews', {});
    set({
      user: DEMO_USER,
      enrolledCourses: DEMO_ENROLLED_COURSES,
      savedCourseIds: DEMO_SAVED_COURSES,
      followedMentorIds: DEMO_FOLLOWED_MENTORS,
      bookedSessions: DEMO_BOOKED_SESSIONS,
      courseReviews: {},
    });
    get().addToast('Demo workspace restored to sample data', 'info');
  },

  logout: () => {
    setStoredValue('campus_user', null);
    set({ user: null });
    get().addToast('Logged out successfully', 'info');
  },

  toggleFollowMentor: (mentorId) => {
    let wasFollowed = false;
    let nextFollowed = [];
    set((state) => {
      const currentList = Array.isArray(state.followedMentorIds) ? state.followedMentorIds : [];
      wasFollowed = currentList.includes(mentorId);
      nextFollowed = wasFollowed
        ? currentList.filter((id) => id !== mentorId)
        : [...currentList, mentorId];
      setStoredValue('campus_followed_mentors', nextFollowed);
      return { followedMentorIds: nextFollowed };
    });

    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { followedMentorIds: nextFollowed });
    }

    get().addToast(wasFollowed ? 'Unfollowed mentor' : 'Following mentor!', 'success');
  },

  bookMentorSession: (sessionInput) => {
    const newSession = {
      id: `ses-${Date.now()}`,
      mentorId: sessionInput.mentorId,
      mentorName: sessionInput.mentorName,
      topic: sessionInput.topic,
      slot: sessionInput.slot,
      note: sessionInput.note || '',
      createdAt: new Date().toISOString(),
      isDemo: Boolean(get().user?.isDemo),
    };
    let nextSessions = [];
    set((state) => {
      const current = Array.isArray(state.bookedSessions) ? state.bookedSessions : [];
      nextSessions = [newSession, ...current];
      setStoredValue('campus_booked_sessions', nextSessions);
      return { bookedSessions: nextSessions };
    });

    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { bookedSessions: nextSessions });
    }
    get().addToast(`1:1 session booked with ${sessionInput.mentorName} (${sessionInput.slot})`, 'success');
    return newSession;
  },

  cancelMentorSession: (sessionId) => {
    let nextSessions = [];
    set((state) => {
      const current = Array.isArray(state.bookedSessions) ? state.bookedSessions : [];
      nextSessions = current.filter((s) => s?.id !== sessionId);
      setStoredValue('campus_booked_sessions', nextSessions);
      return { bookedSessions: nextSessions };
    });
    const currentUser = get().user;
    if (currentUser && !currentUser.isDemo) {
      saveRegisteredAccountState(currentUser.email, { bookedSessions: nextSessions });
    }
    get().addToast('1:1 session cancelled', 'info');
  },

  addCourseReview: (courseId, reviewInput) => {
    const currentUser = get().user;
    const entry = {
      id: `rev-${Date.now()}`,
      author: reviewInput.author || currentUser?.name || 'Verified Student',
      college: reviewInput.college || currentUser?.college || 'Campus Network',
      rating: Math.min(5, Math.max(1, Number(reviewInput.rating) || 5)),
      comment: (reviewInput.comment || '').trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    set((state) => {
      const existing = state.courseReviews?.[courseId] || [];
      const updatedMap = {
        ...state.courseReviews,
        [courseId]: [entry, ...existing],
      };
      setStoredValue('campus_course_reviews', updatedMap);
      return { courseReviews: updatedMap };
    });
    get().addToast('Review published! Thanks for sharing peer feedback.', 'success');
  },

  submitMentorApplication: (appData) => {
    const entry = {
      id: `app-${Date.now()}`,
      ...appData,
      status: 'Under Review',
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    set((state) => {
      const updated = [entry, ...(Array.isArray(state.mentorApplications) ? state.mentorApplications : [])];
      setStoredValue('campus_mentor_applications', updated);
      return { mentorApplications: updated };
    });
    get().addToast('Mentor application submitted! Track status in Dashboard.', 'success');
    return entry;
  },

  joinWaitlist: (email) => {
    const clean = (email || '').trim().toLowerCase();
    if (!clean) return false;
    const existing = get().waitlistEmails || [];
    if (existing.includes(clean)) {
      get().addToast('This college email is already on the waitlist.', 'info');
      return true;
    }
    const updated = [...existing, clean];
    setStoredValue('campus_waitlist_emails', updated);
    set({ waitlistEmails: updated });
    get().addToast('Added to campus cohort notifications!', 'success');
    return true;
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  addToast: (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    set((state) => ({ toasts: [...state.toasts.slice(-2), { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3200);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
