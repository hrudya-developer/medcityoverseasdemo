"use client";

import { memo, useCallback, useState } from "react";

import MobileAppLeftSection from "./MobileAppLeftSection";
import MobileAppRightSection from "./MobileAppRightSection";
import CounsellingModal from "@/components/counselling/CounsellingModal";

import "./mobileApp.css";

function MobileApp() {
    const [isCounsellingOpen, setIsCounsellingOpen] =
        useState(false);

    const openCounsellingModal = useCallback((event) => {
        event?.preventDefault();
        setIsCounsellingOpen(true);
    }, []);

    const closeCounsellingModal = useCallback(() => {
        setIsCounsellingOpen(false);
    }, []);

    return (
        <>
            <section
                id="mobile-app"
                aria-labelledby="mobile-app-heading"
                className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff9fc] via-white to-[#f4f8ff] px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12"
            >
                <MobileAppBackground />

                <div
                    className="relative mx-auto max-w-[1380px]"
                >
                    <div
                        className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-10 xl:gap-14"
                    >
                        <MobileAppLeftSection />

                        <MobileAppRightSection
                            onCounsellingClick={
                                openCounsellingModal
                            }
                        />
                    </div>
                </div>
            </section>

            <CounsellingModal
                open={isCounsellingOpen}
                onClose={closeCounsellingModal}
            />
        </>
    );
}

function MobileAppBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div
                className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/[0.08] blur-3xl"
            />

            <div
                className="absolute -bottom-40 right-0 h-[430px] w-[430px] rounded-full bg-secondary/[0.08] blur-3xl"
            />

            <div
                className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#c01f53_1px,transparent_1px)] [background-size:24px_24px]"
            />

            <div
                className="absolute -right-24 top-0 h-60 w-60 rounded-bl-[170px] bg-gradient-to-bl from-primary/10 to-transparent"
            />

            <div
                className="absolute bottom-0 right-0 h-48 w-96 opacity-25 [background-image:repeating-radial-gradient(ellipse_at_bottom_right,transparent_0,transparent_9px,rgba(4,102,175,0.22)_10px,transparent_11px)]"
            />
        </div>
    );
}

export default memo(MobileApp);