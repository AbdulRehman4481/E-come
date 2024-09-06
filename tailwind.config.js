const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "5px 5px 30px 8px #e66465",
      },

      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(194,106,245,1) 0%, rgba(84,240,255,1) 100%)",
          "shipping-banner":"url(/assets/Images/h3_b1.jpg)",
          "login-banner":"url(/assets/Images/loginBanner.jpg)"
      },
      fontFamily: {
        greyQe: ["Grey_Qo", "cursive"],
        manrope: ["Manrope", "sans-serif"],
        montez: ["Montez", "cursive"],
      },
      colors: {
        primary: "#1CA8CB",
        primary_light: "#E9F6F9",
        secondary: "#113D48",
        text_gray: "#666666",
      },
    },
  },
  plugins: [nextui()],
  experimental: {
    granularChunks: false,
  },
};
