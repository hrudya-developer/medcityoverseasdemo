import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Medcity Study Abroad",
    template: "%s | Medcity Study Abroad",
  },
  description:
    "Explore international education, universities, courses, and study abroad opportunities with Medcity.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="mytheme"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Topbar />

        <Navbar />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}