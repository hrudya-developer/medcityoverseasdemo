"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    usePathname,
} from "next/navigation";

import {
    Menu,
} from "lucide-react";

import Sidebar from "./common-db-components/sidebar/Sidebar";
import Topbar from "./common-db-components/topbar/TopbarDB";


export default function StudentShell({
    children,
}) {
    const pathname =
        usePathname();

    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false);

    const [
        counts,
        setCounts,
    ] = useState({
        applications: 0,
        wishlist: 0,
    });


    function openSidebar() {
        setSidebarOpen(true);
    }


    function closeSidebar() {
        setSidebarOpen(false);
    }


    const loadSidebarCounts =
        useCallback(
            async () => {
                try {
                    const [
                        applicationsResponse,
                        wishlistResponse,
                    ] =
                        await Promise.all([
                            fetch(
                                "/api/dashboard/student/my-applications",
                                {
                                    method:
                                        "POST",
                                    credentials:
                                        "include",
                                    cache:
                                        "no-store",
                                }
                            ),

                            fetch(
                                "/api/dashboard/student/my-wishlist/get",
                                {
                                    method:
                                        "POST",
                                    credentials:
                                        "include",
                                    cache:
                                        "no-store",
                                }
                            ),
                        ]);


                    const [
                        applicationsResult,
                        wishlistResult,
                    ] =
                        await Promise.all([
                            applicationsResponse
                                .json()
                                .catch(
                                    () =>
                                        null
                                ),

                            wishlistResponse
                                .json()
                                .catch(
                                    () =>
                                        null
                                ),
                        ]);


                    console.log(
                        "SIDEBAR APPLICATION COUNT RESPONSE:",
                        applicationsResult
                    );

                    console.log(
                        "SIDEBAR WISHLIST COUNT RESPONSE:",
                        wishlistResult
                    );


                    const applicationCount =
                        applicationsResponse.ok &&
                        applicationsResult?.status ===
                            true
                            ? Number(
                                  applicationsResult?.count ??
                                      applicationsResult?.data?.length ??
                                      0
                              )
                            : 0;


                    const wishlistCount =
                        wishlistResponse.ok &&
                        wishlistResult?.status ===
                            true
                            ? Number(
                                  wishlistResult?.count ??
                                      wishlistResult?.data?.length ??
                                      0
                              )
                            : 0;


                    setCounts({
                        applications:
                            applicationCount,

                        wishlist:
                            wishlistCount,
                    });

                } catch (error) {
                    console.error(
                        "SIDEBAR COUNT ERROR:",
                        error
                    );
                }
            },
            []
        );


    useEffect(() => {
        loadSidebarCounts();
    }, [loadSidebarCounts]);


    /*
     * Refresh counts after applying.
     */
    useEffect(() => {
        const handleApplicationUpdated =
            () => {
                loadSidebarCounts();
            };

        window.addEventListener(
            "studentApplicationUpdated",
            handleApplicationUpdated
        );

        return () => {
            window.removeEventListener(
                "studentApplicationUpdated",
                handleApplicationUpdated
            );
        };
    }, [loadSidebarCounts]);


    /*
     * Refresh counts when wishlist changes.
     */
    useEffect(() => {
        const handleWishlistUpdated =
            () => {
                loadSidebarCounts();
            };

        window.addEventListener(
            "studentWishlistUpdated",
            handleWishlistUpdated
        );

        return () => {
            window.removeEventListener(
                "studentWishlistUpdated",
                handleWishlistUpdated
            );
        };
    }, [loadSidebarCounts]);


    return (
        <div className="min-h-screen bg-[#f4f6fa] text-slate-950">

            {sidebarOpen ? (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={
                        closeSidebar
                    }
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-[#020617]/65
                        backdrop-blur-[5px]
                        md:hidden
                    "
                />
            ) : null}


            {!sidebarOpen ? (
                <button
                    type="button"
                    onClick={
                        openSidebar
                    }
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
                        hover:shadow-[0_14px_34px_rgba(99,26,51,0.45)]
                        active:scale-95
                        md:hidden
                    "
                >
                    <Menu
                        size={20}
                        strokeWidth={
                            2.4
                        }
                    />
                </button>
            ) : null}


            <Sidebar
                open={
                    sidebarOpen
                }

                onClose={
                    closeSidebar
                }

                pathname={
                    pathname
                }

                counts={
                    counts
                }
            />


            <Topbar
                pathname={
                    pathname
                }
            />


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