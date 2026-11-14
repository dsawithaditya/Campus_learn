/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 240 4% 12%))',
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 240 4% 12%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
          foreground: 'hsl(var(--popover-foreground, 240 4% 12%))',
        },
        primary: {
          DEFAULT: '#0859D4',
          foreground: '#FFFFFF',
          dark: '#1A59F9',
          soft: 'rgba(8, 89, 212, 0.10)',
          contrast: '#0859D4',
        },
        'primary-foreground': '#FFFFFF',
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 240 12% 96%))',
          foreground: 'hsl(var(--secondary-foreground, 240 4% 12%))',
        },
        muted: {
          DEFAULT: '#6E6E73',
          dark: '#6E6E73',
          foreground: '#6E6E73',
        },
        accent: {
          DEFAULT: '#0859D4',
          soft: 'rgba(8, 89, 212, 0.10)',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
          foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))',
        },
        border: {
          DEFAULT: '#E5E5E7',
          dark: '#E5E5E7',
        },
        input: '#E5E5E7',
        ring: '#0859D4',
        bg: {
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#F5F5F7',
          dark: '#F5F5F7',
        },
        text: {
          DEFAULT: '#1D1D1F',
          dark: '#1D1D1F',
        },
        category: {
          tech: '#0859D4',
          singing: '#EE46D3',
          music: '#6465ED',
          dance: '#EF5533',
          sports: '#1BC47D',
          art: '#EF5533',
          photography: '#00B5CE',
          gaming: '#E11D48',
        }
      },
      fontFamily: {
        display: ['"Chillax"', '"Geist"', 'sans-serif'],
        heading: ['"Geist"', '"Ranade"', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Zodiak"', 'Georgia', 'serif'],
        grail: ['"Zodiak"', '"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Ranade"', '"Geist"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 6s ease infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(29, 29, 31, 0.05)',
        lift: '0 14px 36px rgba(29, 29, 31, 0.09)',
        cta: '0 8px 24px rgba(8, 89, 212, 0.25)',
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
