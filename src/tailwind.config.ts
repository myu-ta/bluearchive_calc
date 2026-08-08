import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  // 注意: OS設定追従(prefers-color-scheme)で運用しているためdata-themeは付与されない。
  // よってTailwindの dark: バリアントは使えない。テーマ差はdaisyUIのbase-*か、
  // styles.cssのsurface-*クラス(prefers-color-schemeで切り替え)で表現すること。
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
          // daisyUI標準のdarkはbase-200/300がbase-100より「暗く」なるため、
          // カードや入力欄が背景に沈んで見えなくなる。
          // 手前の面ほど明るくなるよう、base-200/300を明るい方向に定義し直す。
          "base-100": "#1d232a", // ページ背景(最も奥)
          "base-200": "#252c35", // カードなど1段手前の面
          "base-300": "#39424d", // 入力欄など、さらに手前・強調したい面
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
