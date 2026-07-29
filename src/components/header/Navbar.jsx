"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import DesktopNavigation from "./DesktopNavigation";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
// import CounsellingModal from "./CounsellingModal";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [showCounselling, setShowCounselling] =
    //     useState(false);

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    // const openCounsellingPopup = () => {
    //     closeMobileMenu();
    //     setShowCounselling(true);
    // };

    // const closeCounsellingPopup = () => {
    //     setShowCounselling(false);
    // };

    return (
        <>
            <header className="sticky top-0 z-50 bg-primary">
                <div className="relative mx-auto flex h-16 max-w-9xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">
                    <Link
                        href="/"
                        aria-label="Medcity Study Abroad home"
                        onClick={closeMobileMenu}
                        className="shrink-0"
                    >
                        <Image
                            src="/logo.png"
                            alt="Medcity Study Abroad"
                            width={150}
                            height={50}
                            preload
                            sizes="(max-width: 640px) 108px, (max-width: 1024px) 120px, 150px"
                            className="h-9 w-auto object-contain sm:h-10 lg:h-12"
                        />
                    </Link>

                    <DesktopNavigation />

                    {/* <NavbarActions
                        openCounsellingPopup={
                            openCounsellingPopup
                        }
                    /> */}

                    <div className="relative lg:hidden">
                        <MobileMenuButton
                            mobileOpen={mobileOpen}
                            setMobileOpen={setMobileOpen}
                        />

                        {/* <MobileMenu
                            open={mobileOpen}
                            closeMenu={closeMobileMenu}
                            openCounsellingPopup={
                                openCounsellingPopup
                            }
                        /> */}
                    </div>
                </div>
            </header>

            {/* <CounsellingModal
                open={showCounselling}
                close={closeCounsellingPopup}
            /> */}
        </>
    );
};

export default memo(Navbar);