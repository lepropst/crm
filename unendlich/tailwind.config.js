const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "#000",
          },
        },
      }),
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        primarydark: "#0a4842",
        primarynormal: "#5eead4",
        primarylight: "#ccfbf1",
        backgroundprimary: "#f0fdfa",
        gray: colors.slate,
        green: colors.green,
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
