import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  // daisyUIがhtmlに付与するdata-themeに合わせてTailwindのdark:も切り替える
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    // OSの設定(prefers-color-scheme)に追従してlight/darkを切り替える。
    // 元のUIの配色(sky-400 / yellow-300 など)を保つため、テーマ色は明示的に指定する。
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#38bdf8", // sky-400: 計算する・適用などの主ボタン
          "primary-content": "#ffffff",
          secondary: "#ef4444", // red-500: 計算対象などの強調
          "secondary-content": "#ffffff",
          neutral: "#94a3b8", // slate-400: 生徒アイコンの名前帯
          "neutral-content": "#ffffff",
          info: "#dbeafe", // blue-100: ドロップ倍率の見出し
          "info-content": "#111827",
          warning: "#fde047", // yellow-300: 生徒を選択・確定ボタン
          "warning-content": "#111827",
          error: "#ef4444",
          "error-content": "#ffffff",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#38bdf8",
          "primary-content": "#0b1220",
          secondary: "#f87171",
          "secondary-content": "#0b1220",
          neutral: "#475569",
          "neutral-content": "#e2e8f0",
          info: "#1e3a5f", // 暗い背景でも眩しくない濃紺
          "info-content": "#dbeafe",
          warning: "#facc15",
          "warning-content": "#0b1220",
          error: "#f87171",
          "error-content": "#0b1220",
        },
      },
    ],
    darkTheme: "dark",
  },
};
export default config;
