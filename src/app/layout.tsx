import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ブルアカ装備品計算ツール",
  description: "ブルアカで必要な装備品の必要数を計算します。",
  metadataBase: new URL("https://nu-lo.com"),
  alternates: {
    canonical: "/bluearchive_calc/",
  },
};

// OSの設定に応じてブラウザのUI(スクロールバー・フォーム部品など)の配色も切り替える
export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-base-100 text-base-content`}>{children}</body>
    </html>
  );
}
