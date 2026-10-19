import {
  GraduationCap,
  BriefcaseBusiness,
  FileBadge,
  BookOpen,
} from "lucide-react";

export const eligibilityData = [
  {
    id: 1,
    number: "01",
    title: "Academic Qualification",
    description:
      "BSc / PBSc / MSc in Nursing with minimum 55% marks.",
    icon: GraduationCap,
    theme: "pink",
  },
  {
    id: 2,
    number: "02",
    title: "Experience",
    description:
      "No prior nursing experience needed. Fresh graduates welcome.",
    icon: BriefcaseBusiness,
    theme: "blue",
  },
  {
    id: 3,
    number: "03",
    title: "English (With OET)",
    description:
      "Valid OET score for application and visa processing.",
    icon: FileBadge,
    theme: "purple",
  },
  {
    id: 4,
    number: "04",
    title: "English (Without OET)",
    description:
      "Min. 75% in English subjects; complete OET/IELTS before visa application.",
    icon: BookOpen,
    theme: "yellow",
  },
];