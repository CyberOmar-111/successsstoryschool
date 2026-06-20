/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./portal.html",
    "./teacher.html",
    "./admin.html",
    "./src/site/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          navy: "#12324a",
          teal: "#0f766e",
          amber: "#d59a2b",
          soft: "#f4f8f7",
          ink: "#1e293b",
          muted: "#526474",
          line: "#d8e3e0",
        },
      },
      fontFamily: {
        heading: ['"Fraunces"', "Georgia", '"Times New Roman"', "serif"],
        body: ['"Inter"', '"Segoe UI"', '"Aptos"', "Arial", "sans-serif"],
      },
      borderRadius: {
        school: "8px",
      },
      boxShadow: {
        school: "0 18px 42px rgba(18, 50, 74, 0.13)",
      },
    },
  },
};
