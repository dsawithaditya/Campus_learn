import { create } from 'zustand';

// Safe localStorage helper
const getStoredValue = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

// Initial theme detection
const getInitialTheme = () => {
  const saved = getStoredValue('campus_theme', null);
  if (saved === 'dark' || saved === 'light') return saved;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const useAppStore = create((set, get) => ({
  theme: getInitialTheme(),
  savedCourseIds: getStoredValue('campus_saved_courses', ['c1', 'c4']),
  enrolledCourses: getStoredValue('campus_enrolled_courses', [
    { courseId: 'c1', progress: 65, lastAccessed: '2025-02-14' },
    { courseId: 'c3', progress: 30, lastAccessed: '2025-02-12' },
    { courseId: 'c7', progress: 85, lastAccessed: '2025-02-10' },
  ]),
  user: getStoredValue('campus_user', {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitb.ac.in',
    college: 'IIT Bombay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streak: 8,
    badges: ['Early Bird', 'Tech Maven', 'Streak Master'],
  }),
  followedMentorIds: getStoredValue('campus_followed_mentors', ['m1', 'm3']),
  searchQuery: '',
  toasts: [],

  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    setStoredValue('campus_theme', nextTheme);
    set({ theme: nextTheme });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setTheme: (theme) => {
    setStoredValue('campus_theme', theme);
    set({ theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleSave: (id) => {
    const saved = get().savedCourseIds;
    const isSaved = saved.includes(id);
    const updated = isSaved ? saved.filter((item) => item !== id) : [...saved, id];
    setStoredValue('campus_saved_courses', updated);
    set({ savedCourseIds: updated });
    get().addToast(
      isSaved ? 'Removed course from saved list' : 'Saved course to your library!',
      'info'
    );
  },

  enroll: (courseId) => {
    const enrolled = get().enrolledCourses;
    const exists = enrolled.some((e) => e.courseId === courseId);
    if (!exists) {
      const updated = [...enrolled, { courseId, progress: 0, lastAccessed: new Date().toISOString() }];
      setStoredValue('campus_enrolled_courses', updated);
      set({ enrolledCourses: updated });
      get().addToast('Successfully enrolled in course!', 'success');
    } else {
      get().addToast('You are already enrolled in this course', 'info');
    }
  },

  updateCourseProgress: (courseId, progress) => {
    const enrolled = get().enrolledCourses.map((c) =>
      c.courseId === courseId ? { ...c, progress: Math.min(100, Math.max(0, progress)) } : c
    );
    setStoredValue('campus_enrolled_courses', enrolled);
    set({ enrolledCourses: enrolled });
  },

  login: (userData) => {
    const user = {
      name: userData.name || 'Student Learner',
      email: userData.email,
      college: userData.college || 'Indian Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      streak: 5,
      badges: ['New Explorer', 'Campus Learner'],
    };
    setStoredValue('campus_user', user);
    set({ user });
    get().addToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
  },

  logout: () => {
    setStoredValue('campus_user', null);
    set({ user: null });
    get().addToast('Logged out successfully', 'info');
  },

  toggleFollowMentor: (mentorId) => {
    const followed = get().followedMentorIds;
    const isFollowed = followed.includes(mentorId);
    const updated = isFollowed ? followed.filter((id) => id !== mentorId) : [...followed, mentorId];
    setStoredValue('campus_followed_mentors', updated);
    set({ followedMentorIds: updated });
    get().addToast(isFollowed ? 'Unfollowed mentor' : 'Following mentor!', 'success');
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  addToast: (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

