import GermanProgramCard from "./components/GermanProgramCard";
import { getGermanProgramsList } from "@/lib/germanPrograms";

export const metadata = {
  title: "German Programs",
  description: "Explore study, training, and career programs in Germany.",
};

export const revalidate = 3600;

export default async function GermanProgramsPage() {
  const { programs, imagePath } = await getGermanProgramsList(6);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#111943] via-[#251849] to-[#8d1749] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
            Study in Germany
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Explore German Programs
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/75 sm:text-lg">
            Select a program to view its benefits, eligibility, roadmap,
            stipend, and related opportunities.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {programs.length ? (
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <GermanProgramCard
                key={program.id}
                item={program}
                imagePath={imagePath}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
            No German programs are currently available.
          </div>
        )}
      </section>
    </main>
  );
}