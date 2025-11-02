export default {
  content: [
    './index.html',
    './script.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          hover: '#1e293b'
        },
        accent: {
          DEFAULT: '#6ee7b7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
};

