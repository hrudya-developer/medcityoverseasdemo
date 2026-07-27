"use client";

import Link from "next/link";
import {
    Headset,
    UserRound,
} from "lucide-react";

const NavbarActions = ({
    openCounsellingPopup,
}) => {
    return (
        <div
            className="
        hidden
        items-center
        gap-3
        lg:flex
      "
        >
            <button
                type="button"
                onClick={openCounsellingPopup}
                className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-white
          px-4
          py-3
          text-sm
          font-semibold
          text-slate-900
          shadow
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:cursor-pointer
          hover:shadow-md
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-primary
        "
            >
                <Headset
                    size={18}
                    aria-hidden="true"
                />

                <span>Get Free Counselling</span>
            </button>

            <Link
                href="/login-via-otp"
                className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-white
          hover:text-primary
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-primary
        "
            >
                <UserRound
                    size={18}
                    aria-hidden="true"
                />

                <span>Student Login</span>
            </Link>
        </div>
    );
};

export default NavbarActions;