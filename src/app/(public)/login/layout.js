/*
 * The sign-in page is a client page, so its search details live here.
 * Account pages are for signed-in students, not search results: they
 * keep a clear title but are left out of the index (links still count).
 */
import { DEFAULT_OG_IMAGE } from "@/lib/pageSeo";

export const metadata = {
    title: "Student Login",
    description:
        "Sign in to your Medcity Overseas student account with a one-time code to track course applications and your wishlist.",
    alternates: {
        canonical: "/login",
    },
    // openGraph replaces the layout's whole object, so the site name,
    // description and share image are set again here.
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "Medcity Overseas",
        title: "Student Login | Medcity Overseas",
        description:
            "Sign in to your Medcity Overseas student account with a one-time code to track course applications and your wishlist.",
        url: "/login",
        images: [DEFAULT_OG_IMAGE],
    },
    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
};

export default function LoginLayout({ children }) {
    return children;
}
