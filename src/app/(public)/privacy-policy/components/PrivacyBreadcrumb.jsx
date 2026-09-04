import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";

export default function PrivacyBreadcrumb() {
    return (
        <div
            className="
                border-b
                border-slate-100
                bg-white
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    max-w-[1240px]
                    items-center
                    gap-1.5
                    px-5
                    py-4
                    text-xs
                    font-medium
                    text-slate-500

                    sm:px-8
                "
            >
                <Link
                    href="/"
                    className="
                        transition-colors
                        hover:text-primary
                    "
                >
                    Home
                </Link>

                <ChevronRight
                    size={13}
                    aria-hidden="true"
                />

                <span className="text-slate-700">
                    Privacy Policy
                </span>
            </div>
        </div>
    );
}