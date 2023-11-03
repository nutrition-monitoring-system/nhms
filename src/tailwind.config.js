/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        primarylight: "var(--color-primary-light)",
        // Add more color definitions as needed
      },
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
        modak: ["Open Sans", "sans-serif"],
      },
      screens: {
        sm: "640px", // Small screens, like smartphones
        md: "768px", // Medium screens, like tablets
        lg: "1024px", // Large screens, like laptops
        xl: "1280px", // Extra-large screens, like desktops
        // Add more screen sizes as needed
      },
    },
  },
  plugins: [],
};
