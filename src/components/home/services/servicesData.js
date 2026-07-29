import {
    FileText,
    GraduationCap,
    Plane,
    Search,
} from "lucide-react";

export const services = [
    {
        id: "find-universities",
        number: "01",
        title: "Find Universities",
        description:
            "Discover top-ranked universities and leading educational institutions across the world's most popular study abroad destinations.",
        icon: Search,
        theme: {
            background:
                "from-blue-50 via-white to-cyan-50",
            iconBackground:
                "from-secondary to-cyan-500",
            iconShadow:
                "shadow-[0_14px_35px_rgba(4,102,175,0.28)]",
            accent: "bg-secondary",
            glow: "bg-secondary/15",
            text: "text-secondary",
            border: "group-hover:border-secondary/35",
        },
    },
    {
        id: "study-abroad-scholarships",
        number: "02",
        title: "Scholarships",
        description:
            "Explore scholarships, grants, and financial aid opportunities available for students planning to study abroad.",
        icon: GraduationCap,
        theme: {
            background:
                "from-rose-50 via-white to-pink-50",
            iconBackground:
                "from-primary to-[#e75585]",
            iconShadow:
                "shadow-[0_14px_35px_rgba(192,31,83,0.28)]",
            accent: "bg-primary",
            glow: "bg-primary/15",
            text: "text-primary",
            border: "group-hover:border-primary/35",
        },
    },
    {
        id: "student-visa-guidance",
        number: "03",
        title: "Visa Guidance",
        description:
            "Get expert student visa guidance and documentation support to complete your overseas education application with confidence.",
        icon: FileText,
        theme: {
            background:
                "from-violet-50 via-white to-purple-50",
            iconBackground:
                "from-violet-600 to-purple-500",
            iconShadow:
                "shadow-[0_14px_35px_rgba(124,58,237,0.25)]",
            accent: "bg-violet-600",
            glow: "bg-violet-500/15",
            text: "text-violet-600",
            border: "group-hover:border-violet-500/35",
        },
    },
    {
        id: "pre-departure-support",
        number: "04",
        title: "Pre-Departure",
        description:
            "Prepare for your study abroad journey with expert support for accommodation, travel arrangements, and student life abroad.",
        icon: Plane,
        theme: {
            background:
                "from-amber-50 via-white to-orange-50",
            iconBackground:
                "from-orange-500 to-amber-400",
            iconShadow:
                "shadow-[0_14px_35px_rgba(249,115,22,0.25)]",
            accent: "bg-orange-500",
            glow: "bg-orange-500/15",
            text: "text-orange-600",
            border: "group-hover:border-orange-500/35",
        },
    },
];