import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import tailwindClipPath from "tailwind-clip-path";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./widget/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      clipPath: {
        close: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        "slide-top-down": "polygon(0 0, 100% 0, 100% 100%, 0% 100%);",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px)",
          },
        },
        tada: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatUp: {
          "0%": {
            transform: "translate(-0%, 0) scale(1)",
            opacity: "0.3",
          },
          "50%": { opacity: "1" },
          "100%": {
            transform: "translate(-20%, -100%) scale(1.2)",
            opacity: "0",
          },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 1s infinite",
        float: "float 3s ease-in-out infinite",
        shake: "shake 0.6s ease-in-out 1s 3",
        rotate: "rotate 2s linear infinite",
      },
      colors: {
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        accent: "rgba(var(--accent))",
        text: "rgba(var(--text))",
        grey: {
          DEFAULT: "rgba(var(--grey))",
          100: "rgba(var(--grey-100))",
        },
        error: "rgba(var(--error))",
        warning: "rgba(var(--warning))",
        success: "rgba(var(--success))",
        info: "rgba(var(--info))",
        dark: "rgba(var(--dark))",
        light: "rgba(var(--light))",
      },
      translate: ["group-hover", "hover"] as unknown as ResolvableTo<KeyValuePair<string, string>>,
    },
  },
  plugins: [tailwindClipPath],
};
