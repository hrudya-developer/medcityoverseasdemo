import { getGermanProgramsList } from "@/lib/germanPrograms";
import GermanProgramsClient from "./GermanProgramsClient";
import WhyStudyGermany from "./components/WhyStudyGermany";
import StudyInGermanyHero from "./components/StudyInGermanyHero";
import StudyInGermanyFAQ from "./components/StudyInGermanyFAQ";



export const metadata = {
  title:
    "Study in Germany from Kerala | Ausbildung & Nursing | Medcity Overseas",

  description:
    "Explore study opportunities in Germany from Kerala, including university programs, Ausbildung, nursing, eligibility, costs, and application guidance.",

  keywords: [
    "study in Germany from Kerala",
    "study in Germany",
    "Germany education consultants in Kerala",
    "Ausbildung in Germany",
    "nursing Ausbildung in Germany",
    "nursing in Germany",
    "study abroad Germany",
    "study in Germany from Thiruvananthapuram",
    "study in Germany from Kollam",
    "study in Germany from Pathanamthitta",
    "study in Germany from Alappuzha",
    "study in Germany from Kottayam",
    "study in Germany from Idukki",
    "study in Germany from Ernakulam",
    "study in Germany from Kochi",
    "study in Germany from Thrissur",
    "study in Germany from Palakkad",
    "study in Germany from Malappuram",
    "study in Germany from Kozhikode",
    "study in Germany from Kannur",
  ],
};

export const revalidate = 3600;

export default async function GermanProgramsPage() {
  const { programs, imagePath } =
    await getGermanProgramsList(0);

  return (
    <main className="min-h-screen bg-slate-50">
      <section>
        <StudyInGermanyHero />
      </section>
      <section>
        <WhyStudyGermany />
        </section>

      <section
        aria-labelledby="german-programs-heading"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Explore Programs
          </p>

          <h2
            id="german-programs-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl"
          >
            Study and Career Opportunities in Germany
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Find the right pathway based on your education,
            qualifications, career goals, and interests.
          </p>
        </div>

        <div className="mt-10">
          {Array.isArray(programs) &&
          programs.length > 0 ? (
            <GermanProgramsClient
              programs={programs}
              imagePath={imagePath}
            />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-bold text-darkPrimary">
                German programs are currently unavailable
              </h3>

              <p className="mt-2 text-slate-600">
                Please check back later for available study
                and career opportunities in Germany.
              </p>
            </div>
          )}
        </div>
      </section>
      <section>
        <StudyInGermanyFAQ />
      </section>
    </main>
  );
}