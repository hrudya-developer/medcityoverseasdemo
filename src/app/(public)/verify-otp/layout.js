/*
 * Account pages are for signed-in students, not search results: they
 * keep a clear title but are left out of the index (links still count).
 */
export const metadata = {
    title: "Verify Your Phone Number",
    robots: { index: false, follow: true },
};

export default function AccountPageLayout({ children }) {
    return children;
}
