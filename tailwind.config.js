/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          soft: '#EEF2FF',
          contrast: '#818CF8',
        },
        accent: {
          DEFAULT: '#FF6B5B',
          soft: '#FFE9E6',
        },
        bg: {
          DEFAULT: '#FAFAF9',
          dark: '#0F172A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        text: {
          DEFAULT: '#1E293B',
          dark: '#F1F5F9',
        },
        muted: {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
        category: {
          tech: '#38BDF8',
          singing: '#F472B6',
          music: '#A78BFA',
          dance: '#C084FC',
          sports: '#34D399',
          art: '#FB923C',
          photography: '#2DD4BF',
          gaming: '#F87171',
        }
      },
      fontFamily: {
        display: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(30, 41, 59, 0.06)',
        lift: '0 12px 32px rgba(79, 70, 229, 0.16)',
        cta: '0 8px 24px rgba(255, 107, 91, 0.35)',
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '700ms',
      }
    },
  },
  plugins: [],
};

