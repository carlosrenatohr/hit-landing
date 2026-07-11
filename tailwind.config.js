/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand book §03 — Naranja HIT is the protagonist (10%), used for action/focus only.
        primary: {
          50: '#FFF3E6',
          100: '#FFDCB3',
          300: '#FFB870',
          400: '#FF9433',
          DEFAULT: '#FF7A00',
          500: '#FF7A00',
          600: '#E56E00',
          700: '#B35600',
          800: '#803E00',
          dark: '#E56E00'
        },
        // Base (70%): deep black. Navy is strategic support — surfaces/base, never a CTA.
        secondary: {
          DEFAULT: '#111111',
          light: '#2D2D2D'
        },
        navy: {
          DEFAULT: '#14213D',
          light: '#1E2E4F'
        },
        // Semantic status colors for the tracker journey (functional, not brand accents).
        accent: {
          yellow: { DEFAULT: '#FFD700', dark: '#E6C200' },
          blue: { DEFAULT: '#00A8E8', dark: '#0089BE' }
        },
        neutral: {
          text: '#4A4A4A',
          bg: '#F8F9FA'
        }
      },
      fontFamily: {
        // Brand book §04 — Poppins reads (body), Montserrat carries impact (headings/labels).
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};