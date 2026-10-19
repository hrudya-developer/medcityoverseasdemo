
import {
  BookOpen,
  Hospital,
  ChartNoAxesCombined,
  Brain,
  UsersRound,
} from "lucide-react";

export const mscRouteContent = {
  badge: "The MSc Route",

  title: "MSc Mental Health",
  highlightedTitle: "Nursing & Leadership",

  description:
    "A 1-year pre-registration MSc combining academic theory, clinical placements and leadership training for UK nursing registration.",
};

export const mscTimeline = [
  {
    id: 1,
    number: "01",
    duration: "6 Months",
    title: "Theoretical Foundation",
    description:
      "Academic training in mental health nursing principles and leadership.",
    icon: BookOpen,
    theme: "pink",
  },
  {
    id: 2,
    number: "02",
    duration: "6 Months",
    title: "Clinical Practice",
    description:
      "Supervised placements in real healthcare settings.",
    icon: Hospital,
    theme: "blue",
  },
];

export const mscBenefits = [
  {
    id: 1,
    title: "Advanced Expertise",
    description:
      "An MSc opens doors to advanced clinical roles, research and academia within UK healthcare.",
    icon: ChartNoAxesCombined,
    theme: "yellow",
  },
  {
    id: 2,
    title: "Mental Health Focus",
    description:
      "In-depth knowledge and practical skills for complex patient needs and holistic care.",
    icon: Brain,
    theme: "pink",
  },
  {
    id: 3,
    title: "Leadership for Impact",
    description:
      "Leadership and management competencies to drive change in mental health services.",
    icon: UsersRound,
    theme: "purple",
  },
];
