import { Phone, CalendarDays } from "lucide-react";

export const CONTACT_PHONE = "+91 95620 08844";

export const CONTACT_ADDRESS =
  "Medcity International Academy · Civil Line Rd, Chembumukku, Vazhakkala, Ernakulam, Kochi, Kerala 682021";

export const contactActions = [
  {
    id: "call",
    title: "Call Us Now",
    description: "Speak directly with our admission experts.",
    buttonText: "Call +91 95620 08844",
    icon: Phone,
    theme: "pink",
    href: "tel:+919562008844",
  },
  {
    id: "consultation",
    title: "Book a Free Consultation",
    description: "Get personalised guidance from our counsellors.",
    buttonText: "Book a Free Consultation",
    icon: CalendarDays,
    theme: "green",
    href: "#registration-form",
  },
];