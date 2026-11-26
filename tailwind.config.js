/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06100C', // Background Utama Deep Dark Forest
          900: '#0B241A', // Emerald radial glow
          800: '#0D1B16', // Slate Emerald Card Background
          700: '#13271F', // Card surface lighter
          600: '#1E382E', // Subtle Card Border
          500: '#2A5243',
        },
        emerald: {
          accent: '#10B981',
          accentHover: '#059669',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'emerald-glow': '0 0 35px -5px rgba(16, 185, 129, 0.25)',
        'emerald-sm': '0 0 15px -3px rgba(16, 185, 129, 0.3)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 20%, rgba(11, 36, 26, 0.8) 0%, rgba(6, 16, 12, 1) 75%)',
        'radial-hero': 'radial-gradient(ellipse at 70% 30%, rgba(16, 185, 129, 0.18) 0%, rgba(11, 36, 26, 0.4) 40%, rgba(6, 16, 12, 0) 70%)',
      }
    },
  },
  plugins: [],
}
