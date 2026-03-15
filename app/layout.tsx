import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "License Picker — Which Open Source License Should I Use?",
  description:
    "Answer 5 quick questions and get the perfect open source license for your project. Compare MIT, Apache 2.0, GPL, and more. Free, instant, no signup.",
  keywords: [
    "open source license",
    "which license should I use",
    "MIT vs GPL",
    "Apache license",
    "software license picker",
    "open source license chooser",
    "license compatibility",
  ],
  openGraph: {
    title: "License Picker — Find the Right Open Source License",
    description: "5 questions. Instant recommendation. Compare MIT, GPL, Apache, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
