import Topbar from "@/components/header/Topbar";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import BottomBar from "@/components/footer/BottomBar";
import AOSProvider from "@/app/AOSProvider";

import "aos/dist/aos.css";

const SITE_URL =
    "https://medcityoverseas.com";

export const metadata = {
    metadataBase:
        new URL(SITE_URL),

    title: {
        default:
            "Study Abroad Consultants in Kerala | Medcity Overseas",
        template:
            "%s | Medcity Overseas",
    },

    description:
        "Medcity Overseas is a study abroad consultancy in Kerala offering expert guidance for overseas university admissions, course selection, scholarships, student visas, language training and pre-departure support.",

    applicationName:
        "Medcity Overseas",

    authors: [
        {
            name:
                "Medcity Overseas",
            url:
                SITE_URL,
        },
    ],

    creator:
        "Medcity Overseas",

    publisher:
        "Medcity Overseas",

    category:
        "Education",

    referrer:
        "origin-when-cross-origin",

    openGraph: {
        type:
            "website",
        locale:
            "en_IN",
        url:
            SITE_URL,
        siteName:
            "Medcity Overseas",
        title:
            "Study Abroad Consultants in Kerala | Medcity Overseas",
        description:
            "Get expert guidance for overseas university admissions, course selection, scholarships, student visas, German language training and study abroad planning.",
        images: [
            {
                url:
                    "/og-images/default.webp",
                width:
                    1200,
                height:
                    630,
                alt:
                    "Medcity Overseas study abroad consultants in Kerala",
            },
        ],
    },

    twitter: {
        card:
            "summary_large_image",
        title:
            "Study Abroad Consultants in Kerala | Medcity Overseas",
        description:
            "Expert guidance for overseas education, university admissions, scholarships, student visas and language training.",
        images: [
            "/og-images/default.webp",
        ],
    },

    robots: {
        index:
            true,
        follow:
            true,
        googleBot: {
            index:
                true,
            follow:
                true,
            "max-image-preview":
                "large",
            "max-snippet":
                -1,
            "max-video-preview":
                -1,
        },
    },

    icons: {
        icon: [
            {
                url:
                    "/favicon.ico",
                sizes:
                    "any",
            },
            {
                url:
                    "/logo.png",
                type:
                    "image/png",
                sizes:
                    "192x192",
            },
            {
                url:
                    "/logo.png",
                type:
                    "image/png",
                sizes:
                    "512x512",
            },
        ],
        shortcut:
            "/favicon.ico",
        apple: [
            {
                url:
                    "/apple-touch-icon.png",
                sizes:
                    "180x180",
                type:
                    "image/png",
            },
        ],
    },

    manifest:
        "/site.webmanifest",

    verification: {
        google:
            process.env
                .NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },

    formatDetection: {
        email:
            false,
        address:
            false,
        telephone:
            false,
    },

    other: {
        "mobile-web-app-capable":
            "yes",
        "apple-mobile-web-app-capable":
            "yes",
        "apple-mobile-web-app-status-bar-style":
            "default",
    },
};

export const viewport = {
    width:
        "device-width",
    initialScale:
        1,
    maximumScale:
        5,
    viewportFit:
        "cover",
    themeColor:
        "#c01f53",
    colorScheme:
        "light",
};

export default function PublicLayout({
    children,
}) {
    return (
        <>
            <AOSProvider />

            <a
                href="#main-content"
                className="
                    sr-only
                    fixed
                    left-4
                    top-4
                    z-[9999]
                    rounded-lg
                    bg-white
                    px-4
                    py-2
                    font-semibold
                    text-slate-950
                    shadow-lg
                    focus:not-sr-only
                "
            >
                Skip to main content
            </a>

            <Topbar />
            <Navbar />

            <main
                id="main-content"
                className="flex-1"
            >
                {children}
            </main>

            <Footer />
            <BottomBar />
        </>
    );
}