import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
