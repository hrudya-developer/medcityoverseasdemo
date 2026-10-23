// The sign-in page is a client page, so its search details live here.
// It is kept out of search results but its links are still followed.
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
