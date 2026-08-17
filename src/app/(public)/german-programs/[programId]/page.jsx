import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { getGermanProgramDetails } from "@/lib/germanPrograms";

export const revalidate = 3600;

function getName(program) {
  return (
    program?.name ||
    program?.title ||
    program?.program_name ||
    "German Program"
  );
}

function getDescription(program) {
  return (
    program?.why ||
    program?.description ||
    program?.content ||
    "Explore this German study program and its opportunities."
  );
}

export async function generateMetadata({ params }) {
  const { programId } = await params;

  try {
    const data = await getGermanProgramDetails(programId);
    if (!data?.mainData) return {};

    const name = getName(data.mainData);

    return {
      title: `${name} | German Programs`,
      description: getDescription(data.mainData).slice(0, 155),
    };
  } catch {
    return {
      title: "German Program",
    };
  }
}

export default async function GermanProgramDetailsPage({ params }) {
  const { programId } = await params;

  let data;

  try {
    data = await getGermanProgramDetails(programId);
  } catch (error) {
    console.error("Unable to render German program:", error);
    throw error;
  }

  if (!data?.mainData) notFound();

  const {
    mainData,
    benefits,
    stipend,
    eligibility,
    roadmap,
    streams,
    details,
    relatedPrograms,
  } = data;

  const name = getName(mainData);
  const description = getDescription(mainData);
  const heroImage = mainData.imageUrl || mainData.iconUrl;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative isolate overflow-hidden bg-[#111943] text-white">
        {heroImage ? (
          <img
            src={heroImage}
            alt={`${name} German program`}
            width="1600"
            height="900"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
          />
        ) : null}

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080b25] via-[#111943]/95 to-[#5b1842]/75" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <Link
            href="/german-programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/75 transition hover:text-white"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            All German Programs
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-400">
              Study in Germany
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {name}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <InfoSection
          title="Program details"
          items={details}
        />

        <InfoSection
          title="Benefits"
          items={benefits}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <InfoSection
            title="Eligibility"
            items={eligibility}
          />

          <InfoSection
            title="Stipend and support"
            items={stipend}
          />
        </div>

        <InfoSection
          title="Available streams"
          items={streams}
        />

        {roadmap.length ? (
          <section>
            <h2 className="text-3xl font-black text-slate-950">
              Your roadmap
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roadmap.map((step, index) => (
                <article
                  key={step?.id ?? `${step?.title}-${index}`}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <span className="text-sm font-black text-primary">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-slate-900">
                    {step?.title || step?.name || `Step ${index + 1}`}
                  </h3>
                  {step?.description || step?.content ? (
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {step.description || step.content}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {relatedPrograms.length ? (
          <section>
            <h2 className="text-3xl font-black text-slate-950">
              Related programs
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPrograms.map((program) => (
                <Link
                  key={program.id}
                  href={`/german-programs/${program.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 font-bold text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {program.name || "German Program"}
                  <ArrowRight
                    size={18}
                    className="text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function InfoSection({ title, items }) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-black text-slate-950">
        {title}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item?.id ?? `${title}-${index}`}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            {item?.iconUrl ? (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-pink-50">
                <img
                  src={item.iconUrl}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                  className="h-full w-full object-contain p-2"
                />
              </div>
            ) : (
              <CheckCircle2
                className="mt-0.5 shrink-0 text-primary"
                size={22}
                aria-hidden="true"
              />
            )}

            <div>
              <h3 className="font-black text-slate-900">
                {item?.title || item?.name || "Program information"}
              </h3>

              {item?.description || item?.content || item?.text ? (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description || item.content || item.text}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}