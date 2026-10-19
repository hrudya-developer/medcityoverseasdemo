
import {
  Wallet,
  FileText,
  CalendarDays,
  GraduationCap,
  House,
  Plane,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export const tuitionDetails = {
  title: "Total Programme Tuition",
  description:
    "Total programme cost (covered in the payment plan)",
  amount: "£18,500",
};

export const paymentInstallments = [
  {
    id: 1,
    number: "01",
    label: "First Payment",
    amount: "£3,000",
    description:
      "Non-refundable. Due within 14 days of receiving your university offer letter.",
    icon: Wallet,
    theme: "pink",
  },
  {
    id: 2,
    number: "02",
    label: "Second Payment",
    amount: "£9,950",
    description:
      "Payable after receiving your CAS.",
    icon: FileText,
    theme: "blue",
  },
  {
    id: 3,
    number: "03",
    label: "Final Payment",
    amount: "£5,550",
    description:
      "Four convenient instalments, completing by January 2027.",
    icon: CalendarDays,
    theme: "yellow",
  },
];

export const financialRequirements = [
  {
    id: 1,
    title: "Tuition Fee",
    icon: GraduationCap,
    items: [
      {
        description:
          "Total programme cost (covered in the payment plan)",
        amount: "£18,500",
      },
    ],
  },
  {
    id: 2,
    title: "Show Money",
    icon: House,
    items: [
      {
        description: "Outside London",
        amount: "£10,827",
      },
      {
        description: "Inside London",
        amount: "£14,130",
      },
    ],
  },
  {
    id: 3,
    title: "Visa Application",
    icon: BookOpen,
    items: [
      {
        description:
          "Student visa processing (approx.)",
        amount: "₹60,000",
      },
    ],
  },
  {
    id: 4,
    title: "Health Insurance (IHS)",
    icon: ShieldCheck,
    items: [
      {
        description:
          "Immigration Health Surcharge",
        amount: "₹1,30,000 to ₹1,40,000",
      },
    ],
  },
  {
    id: 5,
    title: "Flight Tickets",
    icon: Plane,
    items: [
      {
        description:
          "Varies by season and airline",
        amount: "Variable",
      },
    ],
  },
];
