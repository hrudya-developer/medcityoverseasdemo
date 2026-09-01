"use client";

import {
    Bell,
    Search,
} from "lucide-react";

import {
    useSelector,
} from "react-redux";

function getPageTitle(
    pathname
) {
    if (
        pathname?.startsWith(
            "/dashboard/students/profile"
        )
    ) {
        return "My Profile";
    }

    if (
        pathname?.startsWith(
            "/dashboard/students/courses"
        )
    ) {
        return "Find a Course";
    }

    return "Dashboard";
}

export default function TopbarDB({
    pathname,
}) {
    const pageTitle =
        getPageTitle(
            pathname
        );

    return (
        <header
            className="
                fixed
                left-0
                right-0
                top-0
                z-[999]

                h-20

                border-b
                border-slate-200/65

                bg-white/75

                shadow-[0_8px_32px_rgba(15,23,42,0.055)]

                backdrop-blur-2xl

                transition-[left]
                duration-300

                md:left-[88px]

                xl:left-[280px]
            "
        >
            <div
                className="
                    flex
                    h-full

                    items-center
                    justify-between

                    gap-3

                    px-4
                    pl-20

                    sm:px-6
                    sm:pl-20

                    md:px-5
                    md:pl-5

                    xl:px-8
                "
            >
                <TopbarTitle
                    title={
                        pageTitle
                    }
                />

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* <TopbarSearch /> */}

                    {/* <NotificationButton /> */}

                    <ProfileButton />
                </div>
            </div>
        </header>
    );
}

function TopbarTitle({
    title,
}) {
    return (
        <div className="min-w-0">
            <p
                className="
                    truncate

                    text-[9px]

                    font-bold

                    uppercase

                    tracking-[0.18em]

                    text-slate-400

                    sm:text-[11px]
                "
            >
                Student Portal
            </p>

            <h2
                className="
                    mt-0.5

                    truncate

                    text-base

                    font-black

                    tracking-[-0.02em]

                    text-slate-950

                    sm:text-xl
                "
            >
                {title}
            </h2>
        </div>
    );
}

// function TopbarSearch() {
//     return (
//         <div
//             className="
//                 hidden

//                 h-11

//                 w-[210px]

//                 items-center

//                 gap-2.5

//                 rounded-[15px]

//                 border
//                 border-slate-200/80

//                 bg-slate-50/85

//                 px-3.5

//                 transition-all

//                 focus-within:border-[#c01f53]/35

//                 focus-within:bg-white

//                 focus-within:shadow-[0_0_0_4px_rgba(192,31,83,0.07)]

//                 lg:flex

//                 xl:w-[250px]
//             "
//         >
//             <Search
//                 size={16}
//                 className="shrink-0 text-slate-400"
//             />

//             <input
//                 type="text"
//                 placeholder="Search anything..."
//                 className="
//                     min-w-0

//                     flex-1

//                     bg-transparent

//                     text-sm

//                     text-slate-700

//                     outline-none

//                     placeholder:text-slate-400
//                 "
//             />
//         </div>
//     );
// }

// function NotificationButton() {
//     return (
//         <button
//             type="button"
//             aria-label="Notifications"
//             className="
//                 relative

//                 grid

//                 h-10
//                 w-10

//                 place-items-center

//                 rounded-[14px]

//                 border
//                 border-slate-200/80

//                 bg-white/90

//                 text-slate-600

//                 shadow-sm

//                 transition-all

//                 hover:-translate-y-0.5

//                 hover:border-[#c01f53]/25

//                 hover:text-[#c01f53]

//                 hover:shadow-md

//                 sm:h-11
//                 sm:w-11
//             "
//         >
//             <Bell size={17} />

//             <span
//                 className="
//                     absolute

//                     right-[8px]
//                     top-[8px]

//                     h-2
//                     w-2

//                     rounded-full

//                     border
//                     border-white

//                     bg-[#c01f53]
//                 "
//             />
//         </button>
//     );
// }

function ProfileButton() {
    const {
        email,
        isLoggedIn,
        hydrated,
    } = useSelector(
        (state) =>
            state.auth
    );

    const displayEmail =
        !hydrated
            ? "Loading..."
            : email || "Student";

    const initial =
        email
            ? email
                  .charAt(0)
                  .toUpperCase()
            : "S";

    return (
        <button
            type="button"
            className="
                group

                flex
                items-center
                gap-2.5

                rounded-[15px]

                border
                border-slate-200/80

                bg-white/90

                p-1

                shadow-sm

                transition-all

                hover:-translate-y-0.5

                hover:border-[#c01f53]/20

                hover:shadow-md

                sm:pr-3
            "
        >
            <div
                className="
                    grid

                    h-10
                    w-10

                    place-items-center

                    rounded-[12px]

                    bg-gradient-to-br

                    from-[#dc3069]
                    via-[#a91e4c]
                    to-[#631A33]

                    text-xs

                    font-black

                    text-white

                    shadow-[0_6px_16px_rgba(192,31,83,0.30)]
                "
            >
                {initial}
            </div>

            <div className="hidden min-w-0 text-left sm:block">
                <p
                    className="
                        max-w-[190px]

                        truncate

                        text-xs

                        font-bold

                        text-slate-900
                    "
                    title={
                        email ||
                        "Student"
                    }
                >
                    {
                        displayEmail
                    }
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                        className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${
                                isLoggedIn
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                            }
                        `}
                    />

                    <p className="text-[9px] font-medium text-slate-400">
                        {isLoggedIn
                            ? "Student"
                            : "Guest"}
                    </p>
                </div>
            </div>
        </button>
    );
}