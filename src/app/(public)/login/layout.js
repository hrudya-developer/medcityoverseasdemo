/*
 * The sign-in page is a client page, so its search details live here.
 * Account pages are for signed-in students, not search results: they
 * keep a clear title but are left out of the index (links still count).
 */
export const metadata = {
    title: "Student Login",
    description:
        "Sign in to your Medcity Overseas student account with a one-time code to track course applications and your wishlist.",
    alternates: {
        canonical: "/login",
    },
    openGraph: {
        title: "Student Login | Medcity Overseas",
        url: "/login",
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
