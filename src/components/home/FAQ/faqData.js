import {
  Building2,
  CircleDollarSign,
  CircleHelp,
  FileCheck2,
  GraduationCap,
  Headphones,
  MapPin,
  Plane,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   SITE CONSTANTS
========================================================= */

export const FAQ_SITE_URL =
  "https://medcityoverseas.com";

export const FAQ_PAGE_URL = FAQ_SITE_URL;

/* =========================================================
   HOMEPAGE FAQ DATA

   IMPORTANT:
   These questions/answers are used for BOTH:
   1. Visible homepage FAQ
   2. FAQPage structured data

   Keep them identical.
========================================================= */

export const faqItems = [
  {
    id: 1,
    category: "General",
    icon: CircleHelp,
    iconClass: "bg-primary text-white",

    question:
      "Why should I choose Medcity Overseas for studying abroad?",

    answer:
      "Medcity Overseas supports students throughout their study abroad journey with counselling, course and university selection, application assistance, documentation guidance, scholarship support, visa assistance and pre-departure guidance.",
  },

  {
    id: 2,
    category: "Destinations",
    icon: MapPin,
    iconClass: "bg-blue-600 text-white",

    question:
      "Which countries can I study in through Medcity Overseas?",

    answer:
      "Medcity Overseas helps students explore study opportunities in popular destinations including Germany, the UK, Canada, Australia, Ireland, New Zealand and other international study destinations.",
  },

  {
    id: 3,
    category: "Courses & Universities",
    icon: GraduationCap,
    iconClass: "bg-emerald-600 text-white",

    question:
      "How do I choose the right course to study abroad?",

    answer:
      "Our counselling team helps you explore suitable courses based on your academic qualifications, interests, career goals, preferred destination and budget.",
  },

  {
    id: 4,
    category: "Courses & Universities",
    icon: Building2,
    iconClass: "bg-violet-600 text-white",

    question:
      "Can Medcity Overseas help me choose the right university?",

    answer:
      "Yes. We help students shortlist suitable international universities based on their academic profile, preferred course, destination, budget and future goals.",
  },

  {
    id: 5,
    category: "Applications & Visa",
    icon: FileCheck2,
    iconClass: "bg-primary text-white",

    question:
      "Does Medcity Overseas help with university applications?",

    answer:
      "Yes. We guide students through the university application process, including application preparation, document requirements and submission support.",
  },

  {
    id: 6,
    category: "Applications & Visa",
    icon: ShieldCheck,
    iconClass: "bg-blue-600 text-white",

    question:
      "Does Medcity Overseas provide student visa assistance?",

    answer:
      "Yes. We provide guidance and support throughout the student visa application process. Final visa approval is determined by the relevant embassy, consulate or immigration authority.",
  },

  {
    id: 7,
    category: "Financial Support",
    icon: CircleDollarSign,
    iconClass: "bg-orange-500 text-white",

    question:
      "Can I get scholarship guidance for studying abroad?",

    answer:
      "Yes. Medcity Overseas helps students explore available scholarship opportunities. Eligibility depends on factors such as the university, course, destination and individual student profile.",
  },

  {
    id: 8,
    category: "Financial Support",
    icon: CircleDollarSign,
    iconClass: "bg-emerald-600 text-white",

    question:
      "Can Medcity Overseas help with education loans?",

    answer:
      "Yes. We provide education loan assistance information and help students understand the required documents and application process for financing their studies abroad.",
  },

  {
    id: 9,
    category: "Student Support",
    icon: Plane,
    iconClass: "bg-sky-600 text-white",

    question:
      "Does Medcity Overseas provide pre-departure support?",

    answer:
      "Yes. Our support continues after admission and visa processing with pre-departure guidance to help students prepare for their journey and studies abroad.",
  },

  {
    id: 10,
    category: "General",
    icon: Headphones,
    iconClass: "bg-primary text-white",

    question:
      "How can I start my study abroad journey with Medcity Overseas?",

    answer:
      "Start by contacting Medcity Overseas and sharing your academic background, preferred country, course interests, budget and study goals. Our counselling team can then guide you through the suitable next steps.",
  },
];

/* =========================================================
   FAQ STATS

   These are visual stats only.
   Make sure every number is factually verified.
========================================================= */

export const faqStats = [
  {
    icon: GraduationCap,
    value: "10K+",
    label: "Students Guided",
    iconClass:
      "from-primary to-pink-500",
  },

  {
    icon: Plane,
    value: "50+",
    label: "Countries",
    iconClass:
      "from-violet-500 to-violet-700",
  },

  {
    icon: Building2,
    value: "1000+",
    label: "Universities",
    iconClass:
      "from-sky-400 to-secondary",
  },

  {
    icon: Headphones,
    value: "24/7",
    label: "Expert Support",
    iconClass:
      "from-orange-400 to-orange-600",
  },
];

/* =========================================================
   FAQ STRUCTURED DATA

   Render this from the SERVER homepage page.jsx.
========================================================= */

export const faqSchema = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  "@id": `${FAQ_PAGE_URL}/#faq`,

  url: `${FAQ_PAGE_URL}/#faq`,

  inLanguage: "en-IN",

  mainEntity: faqItems.map((item) => ({
    "@type": "Question",

    "@id":
      `${FAQ_PAGE_URL}/#faq-question-${item.id}`,

    name: item.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: item.answer,
    },
  })),
};