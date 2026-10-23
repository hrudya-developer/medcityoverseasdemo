import "./globals.css";

import {
  Nunito,
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

/*
 * Ubuntu was loaded here too, but no page uses it, and every font
 * loaded in the root layout is preloaded on every route.
 */

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