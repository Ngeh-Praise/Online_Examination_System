/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your unified system colors based on your design blueprints
        primary: {
          DEFAULT: '#3b82f6', // Main Action Blue (Buttons, active states)
          hover: '#2563eb',   // Darker blue for button hover effects
        },
        secondary: {
          DEFAULT: '#0f172a', // Deep Slate/Navy (Main headers, branding text)
          text: '#475569',    // Muted Slate (Paragraphs, unselected tabs)
        },
        tertiary: {
          DEFAULT: '#f0fdf4', // Soft Green Alert background (e.g., "All Systems Operational")
          blue: '#eff6ff',    // Soft Blue backdrop (Active sidebar backgrounds)
          gray: '#f8fafc',    // Main Page Canvas background (Soft off-white)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

