// tailwind.config.js
export default {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF28C9",
          "primary-dark": "#C01994",
          dark: "#0B0314",
          "gradient-from": "#15051F",
          "gradient-to": "#FF28C9",
          light: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
