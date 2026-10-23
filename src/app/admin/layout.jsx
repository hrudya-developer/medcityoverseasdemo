export const metadata = {
    title: "Website admin | Medcity Study Abroad",
    robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
