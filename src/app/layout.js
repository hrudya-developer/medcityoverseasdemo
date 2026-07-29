import { Nunito, Ubuntu } from "next/font/google";
import StoreProvider from "@/lib/redux/StoreProvider";
import "./globals.css";

import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import BottomBar from "@/components/footer/BottomBar";


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-nunito-loaded",
  preload: true,
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ubuntu-loaded",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://medcityoverseas.com"),

  title: {
    default:
      "Study Abroad Consultants in Kerala | Medcity Overseas & Medcity Study Abroad",
    template: "%s | Medcity Overseas",
  },

  description:
    "Medcity Overseas (Medcity Study Abroad) is one of Kerala's leading overseas education consultants, helping students study in Germany, the UK, Canada, Australia, Ireland, New Zealand and other top destinations. Get expert counselling, university admissions, student visa assistance, scholarships, immigration support and language training.",

  applicationName: "Medcity Overseas",

  authors: [
    {
      name: "Medcity Overseas",
    },
  ],

  creator: "Medcity Overseas",
  publisher: "Medcity Overseas",

  keywords: [
    "Medcity Overseas",
    "Medcity Study Abroad",
    "Study Abroad Consultants Kerala",
    "Overseas Education Kerala",
    "Study Abroad",
    "Study in Germany",
    "Study in UK",
    "Study in Canada",
    "Study in Australia",
    "Study in Ireland",
    "Study in New Zealand",
    "German Language Course",
    "Ausbildung",
    "Student Visa Assistance",
    "University Admissions",
    "Scholarships",
    "Immigration Services",
    "Language Training",
    "International Education",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Study Abroad Consultants in Kerala | Medcity Overseas",

    description:
      "Study in Germany, UK, Canada, Australia and more with expert counselling, admissions, scholarships, visa assistance and language training from Medcity Overseas.",

    url: "/",
    siteName: "Medcity Overseas",

    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/og-images/contact.webp",
        width: 1200,
        height: 630,
        alt: "Contact Medcity Study Abroad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Study Abroad Consultants in Kerala | Medcity Overseas",

    description:
      "Explore international universities, admissions, scholarships and visa guidance with Medcity Overseas.",

    images: ["/images/og/home-og.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c01f53",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="mytheme"
      className={`
        ${nunito.variable}
        ${ubuntu.variable}
        h-full
        scroll-smooth data-scroll-behavior="smooth"
      `}
      suppressHydrationWarning
    >
      <body
        className="
          flex
          min-h-full
          flex-col
          bg-white
          font-nunito
          text-slate-900
          antialiased
        "
      >
        <Topbar />

        <Navbar />

        <main id="main-content" className="flex-1">
          <StoreProvider>
            {children}
          </StoreProvider>
        </main>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}