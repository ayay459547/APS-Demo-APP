/**
 * @type {import('tailwindcss').Config}
 */
export default {
  // 這裡告訴 Tailwind 要掃描哪些檔案裡的 className
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // 對應我們系統的 AntD 藍色
      },
    },
  },
  plugins: [],
};
