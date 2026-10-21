const services = [
  "Personalised study abroad counselling",
  "Course & university selection",
  "University application & documentation support",
  "Scholarship & funding guidance",
  "Student visa guidance",
  "Pre-departure assistance",
];

const sharedIntroduction =
  (location) =>
    `Medcity Overseas ${location} provides personalised guidance to students planning to pursue higher education abroad. Our counsellors help students choose the right course and university based on their academic background, career goals, budget and preferred study destination. We also assist with university applications, documentation, scholarships and student visa guidance throughout the admission journey.`;

const branchInformation = [
  {
    slug: "medcity-thiruvalla-ksrtc",
    heading:
      "Study Abroad Consultants in Thiruvalla, Pathanamthitta",
    introduction:
      "Medcity Overseas Thiruvalla provides personalised guidance to students planning to pursue higher education abroad. Our counsellors help you choose the right course and university based on your academic background, career goals, budget and preferred study destination. We also provide support with university applications, documentation, scholarships and student visa guidance throughout the admission process.",
    coverage:
      "Students from Thiruvalla, across Pathanamthitta district, and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-kottayam",
    heading:
      "Study Abroad Consultants in Kottayam",
    introduction:
      sharedIntroduction("Kottayam"),
    coverage:
      "Students from Kottayam and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-kollam",
    heading:
      "Study Abroad Consultants in Kollam",
    introduction:
      sharedIntroduction("Kollam"),
    coverage:
      "Students from Kollam and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-kannur",
    heading:
      "Study Abroad Consultants in Kannur",
    introduction:
      sharedIntroduction("Kannur"),
    coverage:
      "Students from Kannur and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-kochi",
    heading:
      "Study Abroad Consultants in Kochi, Ernakulam",
    introduction:
      sharedIntroduction("Kochi"),
    coverage:
      "Students from Kochi, Ernakulam and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-trivandrum",
    heading:
      "Study Abroad Consultants in Trivandrum, Thiruvananthapuram",
    introduction:
      sharedIntroduction("Trivandrum"),
    coverage:
      "Students from Trivandrum, Thiruvananthapuram and nearby areas can visit our branch for one-to-one counselling and step-by-step support from course selection to pre-departure preparation.",
  },
  {
    slug: "medcity-kanjikuzhi",
    heading:
      "Study Abroad Consultants in Kanjikuzhi, Kottayam",
    introduction:
      sharedIntroduction("Kanjikuzhi"),
    coverage:
      "Students from Kanjikuzhi, Kottayam and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-thrissur",
    heading:
      "Study Abroad Consultants in Thrissur",
    introduction:
      sharedIntroduction("Thrissur"),
    coverage:
      "Students from Thrissur and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-pala",
    heading:
      "Study Abroad Consultants in Pala, Kottayam",
    introduction:
      sharedIntroduction("Pala"),
    coverage:
      "Students from Pala, Kottayam and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-mavelikkara",
    heading:
      "Study Abroad Consultants in Mavelikkara, Alappuzha",
    introduction:
      sharedIntroduction("Mavelikkara"),
    coverage:
      "Students from Mavelikkara, Alappuzha and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-mangalore",
    heading:
      "Study Abroad Consultants in Mangalore, Dakshina Kannada",
    introduction:
      sharedIntroduction("Mangalore"),
    coverage:
      "Students from Mangalore, Dakshina Kannada and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-thiruvalla-chandrima",
    heading:
      "Study Abroad Consultants in Thiruvalla, Pathanamthitta",
    introduction:
      sharedIntroduction("Thiruvalla"),
    coverage:
      "Students from Thiruvalla, Pathanamthitta and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-thodupuzha",
    heading:
      "Study Abroad Consultants in Thodupuzha, Idukki",
    introduction:
      sharedIntroduction("Thodupuzha"),
    coverage:
      "Students from Thodupuzha, Idukki and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-kattappana",
    heading:
      "Study Abroad Consultants in Kattappana, Idukki",
    introduction:
      sharedIntroduction("Kattappana"),
    coverage:
      "Students from Kattappana, Idukki and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-calicut",
    heading:
      "Study Abroad Consultants in Kozhikode (Calicut)",
    introduction:
      sharedIntroduction("Calicut"),
    coverage:
      "Students from Kozhikode and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-muvattupuzha",
    heading:
      "Study Abroad Consultants in Muvattupuzha, Ernakulam",
    introduction:
      sharedIntroduction("Muvattupuzha"),
    coverage:
      "Students from Muvattupuzha, Ernakulam and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-kothamangalam",
    heading:
      "Study Abroad Consultants in Kothamangalam, Ernakulam",
    introduction:
      sharedIntroduction("Kothamangalam"),
    coverage:
      "Students from Kothamangalam, Ernakulam and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
  {
    slug: "medcity-pala-2",
    heading:
      "Study Abroad Consultants in Pala, Kottayam",
    introduction:
      sharedIntroduction("Pala"),
    coverage:
      "Students from Pala, Kottayam and nearby areas can visit our branch for one-to-one counselling and step-by-step support, from course selection and university applications to pre-departure preparation.",
  },
].map((branch) => ({
  ...branch,
  services,
}));

function normalizeTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getBranchInfoForBlogTitle(title) {
  const normalizedTitle =
    normalizeTitle(title);

  if (!normalizedTitle) {
    return null;
  }

  return (
    branchInformation.find(
      ({ heading }) => {
        const normalizedHeading =
          normalizeTitle(heading);

        return (
          normalizedTitle ===
            normalizedHeading ||
          normalizedTitle.startsWith(
            `${normalizedHeading} `
          )
        );
      }
    ) || null
  );
}

export { branchInformation };
