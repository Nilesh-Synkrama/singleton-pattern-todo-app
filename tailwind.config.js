/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        light:
          "url('https://img.freepik.com/free-vector/white-elegant-texture-wallpaper-concept_23-2148432202.jpg?w=2000&t=st=1676472631~exp=1676473231~hmac=b84450085a8af330ac9459f3816950b746f96a622dc7d149104973659aab0783')",
      },
    },
    screens: {
      sm: "400px",

      md: "708px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
  },
  plugins: [],
};
