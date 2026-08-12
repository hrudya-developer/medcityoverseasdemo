"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CounsellingButton = () => {
    return (
        <Link
            href="/contact-us"
            aria-label="Contact Us"
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-logoYellow bg-logoYellow px-5 py-3.5 text-sm font-bold text-darkPrimary shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logoYellow focus-visible:ring-offset-2 focus-visible:ring-offset-darkPrimary"
        >
            Contact Us

            <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
        </Link>
    );
};

export default CounsellingButton;