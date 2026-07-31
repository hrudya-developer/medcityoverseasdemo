import {
    BadgeDollarSign,
    GraduationCap,
    HeartPulse,
    House,
    Landmark,
    MessageCircle,
    Smartphone,
    Ticket,
} from "lucide-react";

export const essentialServices = [
    {
        id: "01",
        title: "Education Loan",
        description:
            "Easy access to finances so you don’t delay your study abroad dreams.",
        Icon: GraduationCap,
    },
    {
        id: "02",
        title: "Accommodation",
        description:
            "Choose from student apartments, shared housing, or comfortable homestays.",
        Icon: House,
    },
    {
        id: "03",
        title: "Banking",
        description:
            "Get assistance opening a student bank account before or after you arrive.",
        Icon: Landmark,
    },
    {
        id: "04",
        title: "Health Cover",
        description:
            "Find suitable health coverage for security and peace of mind abroad.",
        Icon: HeartPulse,
    },
    {
        id: "05",
        title: "Money Transfer",
        description:
            "Make safe and convenient international payments to institutions and service providers.",
        Icon: BadgeDollarSign,
    },
    {
        id: "06",
        title: "SIM Cards",
        description:
            "Stay connected from the moment you arrive with convenient student SIM options.",
        Icon: Smartphone,
    },
    {
        id: "07",
        title: "Flight Ticketing",
        description:
            "Book flights with convenient routes and reliable travel assistance.",
        Icon: Ticket,
    },
    {
        id: "08",
        title: "Connect With Us",
        description:
            "",
        Icon: MessageCircle,
        variant: "contact",
    },
];