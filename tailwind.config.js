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
        background: 'hsl(var(--background, 0 0% 4%))',
        foreground: 'hsl(var(--foreground, 240 5% 96%))',
        card: {
          DEFAULT: 'hsl(var(--card, 240 10% 7%))',
          foreground: 'hsl(var(--card-foreground, 240 5% 96%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 240 10% 7%))',
          foreground: 'hsl(var(--popover-foreground, 240 5% 96%))',
        },
        primary: {
          DEFAULT: '#FF6B00',
          foreground: '#FFFFFF',
          dark: '#E05300',
          soft: 'rgba(255, 107, 0, 0.15)',
          contrast: '#FFA057',
        },
        'primary-foreground': '#FFFFFF',
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 240 4% 16%))',
          foreground: 'hsl(var(--secondary-foreground, 0 0% 98%))',
        },
        muted: {
          DEFAULT: '#A1A1AA',
          dark: '#71717A',
          foreground: 'hsl(var(--muted-foreground, 240 5% 65%))',
        },
        accent: {
          DEFAULT: '#FF6B00',
          soft: 'rgba(255, 107, 0, 0.15)',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
          foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          dark: 'rgba(255, 255, 255, 0.08)',
        },
        input: 'hsl(var(--input, 240 4% 18%))',
        ring: 'hsl(var(--ring, 24 100% 50%))',
        bg: {
          DEFAULT: '#0A0A0A',
          dark: '#0A0A0A',
        },
        surface: {
          DEFAULT: '#141416',
          dark: '#141416',
        },
        text: {
          DEFAULT: '#F4F4F5',
          dark: '#F4F4F5',
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

