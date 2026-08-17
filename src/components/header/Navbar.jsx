"use client";

import {
    useCallback,
    useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import CounsellingModal from "../counselling/CounsellingModal";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
    const [
        mobileOpen,
        setMobileOpen,
    ] = useState(false);

    const [
        counsellingOpen,
        setCounsellingOpen,
    ] = useState(false);

    const closeMobileMenu =
        useCallback(() => {
            setMobileOpen(false);
        }, []);

    const openCounsellingPopup =
        useCallback(() => {
            setMobileOpen(false);
            setCounsellingOpen(true);
        }, []);

    const closeCounsellingPopup =
        useCallback(() => {
            setCounsellingOpen(false);
        }, []);

    return (
        <>
        
            <header className="sticky top-0 z-[60] bg-primary shadow-[0_5px_20px_rgba(99,26,51,0.16)]">
                <div className="relative mx-auto flex h-16 w-full max-w-[1600px] items-center px-4 sm:px-6 lg:h-[76px] lg:px-8">
                    <Link
                        href="/"
                        aria-label="Medcity Study Abroad home"
                        onClick={closeMobileMenu}
                        className="relative z-10 inline-flex shrink-0 items-center"
                    >
                        <Image
                            src="/logo.png"
                            alt="Medcity Study Abroad"
                            width={150}
                            height={50}
                            priority
                            className="h-9 w-auto object-contain sm:h-10 lg:h-12"
                        />
                    </Link>

                    <DesktopNavigation />

                    <NavbarActions
                        openCounsellingPopup={
                            openCounsellingPopup
                        }
                    />

                    <div className="ml-auto flex items-center lg:hidden">
                        <MobileMenuButton
                            mobileOpen={
                                mobileOpen
                            }
                            setMobileOpen={
                                setMobileOpen
                            }
                        />
                    </div>
                </div>
            </header>

            <MobileMenu
                open={mobileOpen}
                closeMenu={closeMobileMenu}
                openCounsellingPopup={
                    openCounsellingPopup
                }
            />

            <CounsellingModal
                open={counsellingOpen}
                onClose={
                    closeCounsellingPopup
                }
            />
        </>
    );
}