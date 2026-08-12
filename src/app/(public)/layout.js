import { Nunito, Ubuntu } from "next/font/google";

import StoreProvider from "@/lib/redux/StoreProvider";

import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import BottomBar from "@/components/footer/BottomBar";

import AOSProvider from "@/app/AOSProvider";

import "aos/dist/aos.css";
import "@/app/globals.css";

const SITE_URL = "https://medcityoverseas.com";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-nunito-loaded",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ubuntu-loaded",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Study Abroad Consultants in Kerala | Medcity Overseas",
    template: "%s | Medcity Overseas",
  },

  description:
    "Medcity Overseas helps students study in Germany, the UK, Canada, Australia, Ireland, New Zealand and other destinations through expert counselling, university admissions, scholarship guidance, student visa assistance and language training.",

  applicationName: "Medcity Overseas",

  authors: [
    {
      name: "Medcity Overseas",
      url: SITE_URL,
    },
  ],

  creator: "Medcity Overseas",
  publisher: "Medcity Overseas",

  category: "education",

  referrer: "origin-when-cross-origin",

  /*
   * Do not define a canonical URL here.
   *
   * Canonical URLs should be defined inside each page so that every
   * destination, university and course gets its own canonical URL.
   */

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Medcity Overseas",

    /*
     * These act as global fallbacks.
     * Individual pages should override title, description, URL and image.
     */
    title: "Study Abroad Consultants in Kerala | Medcity Overseas",
    description:
      "Get expert guidance for overseas university admissions, scholarships, student visas, German language courses and Ausbildung programs.",
    images: [
      {
        url: "/og-images/default.webp",
        width: 1200,
        height: 630,
        alt: "Medcity Overseas study abroad consultants",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Kerala | Medcity Overseas",
    description:
      "Expert overseas education counselling, university admissions, scholarship guidance, visa assistance and language training.",
    images: ["/og-images/default.webp"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#c01f53",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      data-theme="mytheme"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${ubuntu.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-white font-nunito text-slate-900 antialiased">
        <StoreProvider>
          <AOSProvider />

          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[9999] rounded bg-white px-4 py-2 text-black shadow focus:not-sr-only"
          >
            Skip to main content
          </a>

          <Topbar />
          <Navbar />

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
          <BottomBar />
        </StoreProvider>
      </body>
    </html>
  );
}