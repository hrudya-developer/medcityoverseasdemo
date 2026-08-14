import {
    EarthLock,
    FileText,
    GraduationCap,
    Heart,
    Home,
    MessageSquareQuote,
    User,
} from "lucide-react";

export const sidebarItems = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard/students",
    },
    {
        icon: User,
        label: "My Profile",
        href: "/dashboard/students/profile",
    },
    {
        icon: GraduationCap,
        label: "Find a Course",
        href: "/dashboard/students/courses",
    },
    {
        icon: FileText,
        label: "My Applications",
        href: "/dashboard/students/my-applications",
        countKey: "applications",
    },
    {
        icon: Heart,
        label: "My Wishlist",
        href: "/dashboard/students/my-wishlist",
        countKey: "wishlist",
    },
    {
        icon: MessageSquareQuote,
        label: "Feedback",
        href: "/dashboard/students/feedback",
    },
    {
        icon: EarthLock,
        label: "Privacy Policy",
        href: "/dashboard/students/privacy-policy",
    },
];

export function isSidebarItemActive(pathname, href) {
    if (!href || href === "#") {
        return false;
    }

    if (href === "/dashboard/students") {
        return pathname === href;
    }

    return (
        pathname === href ||
        pathname.startsWith(`${href}/`)
    );
}