"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Sidebar from "./common-db-components/sidebar/Sidebar";
import Topbar from "./common-db-components/topbar/TopbarDB";

export default function StudentShell({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const pathname = usePathname();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#f4f6fa]
        text-slate-950
      "
    >
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            z-40

            bg-[#020617]/65

            backdrop-blur-[5px]

            md:hidden
          "
        />
      )}

      {/* Mobile menu */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          className="
            fixed
            left-4
            top-[18px]
            z-[70]

            grid
            h-11
            w-11
            place-items-center

            rounded-[15px]

            border
            border-white/20

            bg-gradient-to-br
            from-[#c01f53]
            via-[#941744]
            to-[#631A33]

            text-white

            shadow-[0_10px_30px_rgba(99,26,51,0.35)]

            transition-all
            duration-200

            hover:-translate-y-0.5

            active:scale-95

            md:hidden
          "
        >
          <Menu size={20} strokeWidth={2.4} />
        </button>
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        pathname={pathname}
      />

      <Topbar pathname={pathname} />

      <main
        className="
          min-h-screen

          px-4
          pb-8
          pt-24

          transition-[margin]
          duration-300

          sm:px-6

          md:ml-[88px]
          md:px-6
          md:pt-28

          xl:ml-[280px]
          xl:px-8
        "
      >
        {children}
      </main>
    </div>
  );
}