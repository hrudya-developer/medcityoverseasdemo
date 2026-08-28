import "./globals.css";

import {
  Nunito,
  Ubuntu,
} from "next/font/google";

import StoreProvider from "@/lib/redux/StoreProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  style: [
    "normal",
    "italic",
  ],
  display: "swap",
  variable:
    "--font-nunito-loaded",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "700",
  ],
  style: [
    "normal",
    "italic",
  ],
  display: "swap",
  variable:
    "--font-ubuntu-loaded",
});

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en-IN"
      data-theme="mytheme"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`
        ${nunito.variable}
        ${ubuntu.variable}
        h-full
        scroll-smooth
      `}
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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}