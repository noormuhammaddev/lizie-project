/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black1: "#121212",
        black2: "#323232",
        black3: "#585858",
        black4: "#808080",
        white1: "#FFFFFF",
        white2: "#EAEAEA",
        border: "#E6E7ED",
        disabled: "#DDDDDD",
        bg: "#F2EBE3",
        bgBorder: "#DBD3C3",
        focus: "#FF8960",
        focusHover: "#E67B56",
        blue: "#2F4858",
        lightBlue: "#EAEDEE",
        footerBg: "#1A1A1A",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
