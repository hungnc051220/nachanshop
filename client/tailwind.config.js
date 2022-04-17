module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
};
