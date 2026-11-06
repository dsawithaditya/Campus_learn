import { create } from 'zustand';

// Safe localStorage helper with robust error handling
const getStoredValue = (key, fallback) => {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return parsed ?? fallback;
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

// Initial theme detection: Default to light mode matching the Skillcamp design
const getInitialTheme = () => {
  const saved = getStoredValue('campus_theme', null);
  if (saved === 'dark' || saved === 'light') return saved;
  return 'light'; // Default to clean, modern, vibrant light mode
};

export const useAppStore = create((set, get) => ({
  theme: getInitialTheme(),
  savedCourseIds: getStoredValue('campus_saved_courses', ['c1', 'c4']) || [],
  enrolledCourses: getStoredValue('campus_enrolled_courses', [
    { courseId: 'c1', progress: 65, lastAccessed: '2025-02-14' },
    { courseId: 'c3', progress: 30, lastAccessed: '2025-02-12' },
    { courseId: 'c7', progress: 85, lastAccessed: '2025-02-10' },
  ]) || [],
  user: getStoredValue('campus_user', {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitb.ac.in',
    college: 'IIT Bombay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streak: 8,
    badges: ['Early Bird', 'Tech Maven', 'Streak Master'],
  }),
  followedMentorIds: getStoredValue('campus_followed_mentors', ['m1', 'm3']) || [],
  searchQuery: '',
  toasts: [],

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      setStoredValue('campus_theme', nextTheme);
      if (typeof document !== 'undefined') {
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      }
      return { theme: nextTheme };
    });
  },

  setTheme: (theme) => {
    setStoredValue('campus_theme', theme);
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
    set({ theme });
  },

  toggleSave: (id) => {
    let wasSaved = false;
    set((state) => {
      const currentList = Array.isArray(state.savedCourseIds) ? state.savedCourseIds : [];
      wasSaved = currentList.includes(id);
      const updated = wasSaved
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];
      setStoredValue('campus_saved_courses', updated);
      return { savedCourseIds: updated };
    });

    get().addToast(
      wasSaved ? 'Removed course from saved list' : 'Saved course to your library!',
      'info'
    );
  },

  enroll: (courseId) => {
    let alreadyEnrolled = false;
    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      const exists = currentList.some((e) => e?.courseId === courseId);
      if (exists) {
        alreadyEnrolled = true;
        return state;
      }
      const updated = [
        ...currentList,
        { courseId, progress: 0, lastAccessed: new Date().toISOString() },
      ];
      setStoredValue('campus_enrolled_courses', updated);
      return { enrolledCourses: updated };
    });

    if (alreadyEnrolled) {
      get().addToast('You are already enrolled in this course', 'info');
    } else {
      get().addToast('Successfully enrolled in course!', 'success');
    }
  },

  updateCourseProgress: (courseId, progressOrFn) => {
    set((state) => {
      const currentList = Array.isArray(state.enrolledCourses) ? state.enrolledCourses : [];
      const updated = currentList.map((c) => {
        if (c?.courseId === courseId) {
          const currentProgress = c.progress ?? 0;
          const nextVal =
            typeof progressOrFn === 'function' ? progressOrFn(currentProgress) : progressOrFn;
          return { ...c, progress: Math.min(100, Math.max(0, nextVal)) };
        }
        return c;
      });
      setStoredValue('campus_enrolled_courses', updated);
      return { enrolledCourses: updated };
    });
  },

  login: (userData) => {
    const user = {
      name: userData?.name || 'Student Learner',
      email: userData?.email || 'student@college.edu',
      college: userData?.college || 'Indian Institute of Technology',
      avatar:
        userData?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
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
    let wasFollowed = false;
    set((state) => {
      const currentList = Array.isArray(state.followedMentorIds) ? state.followedMentorIds : [];
      wasFollowed = currentList.includes(mentorId);
      const updated = wasFollowed
        ? currentList.filter((id) => id !== mentorId)
        : [...currentList, mentorId];
      setStoredValue('campus_followed_mentors', updated);
      return { followedMentorIds: updated };
    });

    get().addToast(wasFollowed ? 'Unfollowed mentor' : 'Following mentor!', 'success');
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
