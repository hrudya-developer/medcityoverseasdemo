import {
  FileText,
  MessageCircle,
  UsersRound,
  UserRound,
  Mail,
  GraduationCap,
  MapPin,
  Phone,
} from "lucide-react";

export const registrationBenefits = [
  {
    id: 1,
    title: "Get the Brochure",
    description: "Access the full programme details",
    icon: FileText,
  },
  {
    id: 2,
    title: "Expert Guidance",
    description: "Talk to our admission counsellors",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Start Your UK Journey",
    description: "Take a step towards your future",
    icon: UsersRound,
  },
];

export const registrationFields = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    icon: UserRound,
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "whatsapp",
    label: "Whatsapp No.",
    placeholder: "Enter your WhatsApp number",
    icon: Phone,
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "qualification",
    label: "Qualification",
    placeholder: "Your highest qualification",
    icon: GraduationCap,
    type: "text",
    autoComplete: "off",
    required: true,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    icon: MapPin,
    type: "text",
    autoComplete: "address-level2",
    required: true,
    fullWidth: true,
  },
];