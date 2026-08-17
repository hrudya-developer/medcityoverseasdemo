import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Play,
  ArrowRight,
} from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const API_URL =
  `${process.env.OVERSEAS_API_BASE_URL}/getHomeTileDetails`;

const API_KEY =
  process.env.OVERSEAS_API_KEY;

/* =========================================================
   FETCH GERMAN PROGRAM DETAILS
========================================================= */

async function getGermanCourseDetails(id) {
  if (!API_KEY) {
    console.error("OVERSEAS_API_KEY is missing");
    return null;
  }

  if (!process.env.OVERSEAS_API_BASE_URL) {
    console.error(
      "OVERSEAS_API_BASE_URL is missing"
    );
    return null;
  }

  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append("uid", "0");
  formData.append("id", String(id));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    console.log(
      "German program API status:",
      response.status
    );

    if (!response.ok) {
      console.error(
        "German program API failed:",
        response.status,
        text
      );

      return null;
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error(
        "Invalid JSON from German program API:",
        text
      );

      return null;
    }
  } catch (error) {
    console.error(
      "German program API error:",
      error
    );

    return null;
  }
}

/* =========================================================
   IMAGE HELPER
========================================================= */

function imageUrl(base, image) {
  if (!base || !image) return null;

  const cleanBase = base.endsWith("/")
    ? base
    : `${base}/`;

  const cleanImage = String(image).replace(/^\/+/, "");

  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://")
  ) {
    return cleanImage;
  }

  return `${cleanBase}${cleanImage}`;
}

/* =========================================================
   HERO
   No background image
========================================================= */
function Hero({ course, apiData }) {
  if (!course) return null;

  return (
    <section className="relative isolate overflow-hidden bg-darkPrimary text-white">
      {/* Main gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-darkPrimary via-[#151d42] to-[#c01f53]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Left glow */}
      <div className="absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      {/* Right glow */}
      <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />

      {/* Decorative circles */}
      <div className="absolute right-[8%] top-16 -z-10 h-48 w-48 rounded-full border border-white/10" />

      <div className="absolute right-[11%] top-24 -z-10 h-32 w-32 rounded-full border border-yellow-400/20" />

      <div className="absolute bottom-10 left-[8%] -z-10 h-32 w-32 rounded-full border border-white/10" />

      {/* Content */}
      <div className="mx-auto flex min-h-[560px] max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">

      

        {/* Program badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-5 py-2.5 text-sm font-bold text-yellow-300 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          Germany Program
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {course.name}
        </h1>

        {/* Subtitle */}
        {course.titleWhy && (
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-yellow-300 sm:text-xl">
            {course.titleWhy}
          </p>
        )}

        {/* Description */}
        {course.why && (
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            {course.why}
          </p>
        )}

        {/* Bottom decorative line */}
        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-10 bg-yellow-300/50" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-px w-10 bg-yellow-300/50" />
        </div>

      </div>
    </section>
  );
}
/* =========================================================
   BENEFITS
========================================================= */

function Benefits({ benefits, iconPath }) {
  if (!benefits?.length) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Benefits
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Why Choose This Program?
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => {
            const icon = imageUrl(iconPath, item.icon);

            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 p-3 transition group-hover:bg-primary">
                    {icon ? (
                      <img
                        src={icon}
                        alt={item.text}
                        className="h-full w-full object-contain transition group-hover:brightness-0 group-hover:invert"
                      />
                    ) : (
                      <Check className="text-primary group-hover:text-white" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-primary">
                      0{index + 1}
                    </span>

                    <h3 className="mt-1 font-bold leading-7 text-slate-900">
                      {item.text}
                    </h3>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STIPEND
========================================================= */

function Stipend({ title, stipend }) {
  if (!stipend?.length) return null;

  return (
    <section className="relative overflow-hidden bg-darkPrimary">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
            Financial Support
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {stipend.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-md"
            >
              <p className="text-xl font-black text-white">
                {item.text}
              </p>

              {item.icon && (
                <div className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-2 text-sm font-black text-slate-900">
                  {item.icon}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* =========================================================
   ELIGIBILITY
========================================================= */

function Eligibility({ eligibility }) {
  if (!eligibility?.length) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Eligibility
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Who Can Apply?
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-500">
              Check the requirements provided for this program before
              starting your application.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {eligibility.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-md"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={16} />
                </div>

                <div>
                  <span className="text-xs font-bold text-primary">
                    Requirement {index + 1}
                  </span>

                  <p className="mt-1 font-semibold leading-7 text-slate-700">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ROADMAP
========================================================= */

function Roadmap({ roadmap, apiData }) {
  if (!Array.isArray(roadmap) || roadmap.length === 0) {
    return null;
  }

  const iconPath = apiData?.icons_image_path;

  const activeRoadmap = [...roadmap]
    .filter((item) => String(item.status) === "1")
    .sort(
      (a, b) =>
        Number(a.id || 0) - Number(b.id || 0)
    );

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Roadmap
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Your Journey
          </h2>
        </div>

        <div className="relative">

          {/* Connecting line - desktop */}
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-primary/20 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {activeRoadmap.map((item, index) => {

              const iconImage = imageUrl(
                iconPath,
                item.icon
              );

              const countImage = imageUrl(
                iconPath,
                item.count
              );

              return (
                <div
                  key={item.id}
                  className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
                >

                  {/* TOP */}
                  <div className="relative z-10 mb-6 flex items-center justify-between">

                    {/* ICON */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 p-3">
                      {iconImage ? (
                        <img
                          src={iconImage}
                          alt={item.text || "Step icon"}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <GraduationCap
                          size={28}
                          className="text-primary"
                        />
                      )}
                    </div>

                    {/* COUNT */}
                    {countImage ? (
                      <img
                        src={countImage}
                        alt=""
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                        {index + 1}
                      </span>
                    )}

                  </div>

                  {/* STEP */}
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                    Step {index + 1}
                  </p>

                  {/* TITLE */}
                  <h3 className="mt-3 text-xl font-black leading-7 text-slate-900">
                    {item.text}
                  </h3>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WORK SECTORS
========================================================= */

function WorkSectors({
  title,
  streams,
  iconPath,
  enabled,
}) {
  if (
    !streams?.length ||
    String(enabled) !== "true"
  ) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        {title && (
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Career Areas
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              {title}
            </h2>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streams.map((item) => {

            const icon = imageUrl(
              iconPath,
              item.icon
            );

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                {icon && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src={icon}
                      alt={item.name || ""}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <p className="font-bold text-slate-800">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   DETAILS
========================================================= */

function Details({ details }) {
  if (!details?.length) return null;

  const sorted = [...details]
    .filter(
      (item) =>
        String(item.status) !== "0"
    )
    .sort(
      (a, b) =>
        Number(a.order || 0) -
        Number(b.order || 0)
    );

  const groups = [];

  let currentGroup = null;

  sorted.forEach((item) => {

    if (item.type === "heading") {

      currentGroup = {
        ...item,
        bullets: [],
      };

      groups.push(currentGroup);

    } else if (
      item.type === "bullet" &&
      currentGroup
    ) {

      currentGroup.bullets.push(item);

    }
  });

  if (!groups.length) return null;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Details
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Program Information
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <h3 className="text-xl font-black text-slate-900">
                {group.text}
              </h3>

              {group.bullets.length > 0 && (
                <div className="mt-5 space-y-3">
                  {group.bullets.map(
                    (bullet) => (
                      <div
                        key={bullet.id}
                        className="flex items-start gap-3"
                      >
                        <Check
                          size={18}
                          className="mt-1 shrink-0 text-primary"
                        />

                        <p className="leading-7 text-slate-600">
                          {bullet.text}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   VIDEOS
========================================================= */

function Videos({
  videos,
  thumbnailPath,
}) {
  if (!videos?.length) return null;

  return (
    <section className="bg-darkPrimary">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
            Videos
          </p>

          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Learn More
          </h2>
        </div>

        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {videos.map((video) => {

            const thumbnail =
              imageUrl(
                thumbnailPath,
                video.thumbnail
              );

            return (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl bg-white"
              >

                <div className="relative overflow-hidden">

                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={video.title || ""}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
                      <Play
                        size={24}
                        className="ml-1 text-slate-900"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                </div>

                <div className="p-6">
                  <h3 className="font-bold leading-7 text-slate-900">
                    {video.title}
                  </h3>
                </div>

              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   RELATED PROGRAMS
========================================================= */

function RelatedPrograms({ apiData }) {
  const relatedPrograms = [
    {
      id: apiData.related1_id,
      name: apiData.related1_name,
      image: apiData.related1_image,
    },
    {
      id: apiData.related2_id,
      name: apiData.related2_name,
      image: apiData.related2_image,
    },
    {
      id: apiData.related3_id,
      name: apiData.related3_name,
      image: apiData.related3_image,
    },
  ].filter(
    (item) =>
      item.id &&
      item.name &&
      item.image
  );

  if (!relatedPrograms.length) {
    return null;
  }

  /*
    Related program images are received from the API.
    Use the API-provided main image path.
  */
  const imagePath =
    apiData.slider_image_path;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-9xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Explore More
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Related Programs
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {relatedPrograms.map(
            (program) => {

              const image =
                imageUrl(
                  imagePath,
                  program.image
                );

              return (
                <Link
                  key={program.id}
                  href={`/german-programs/${program.id}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="h-56 overflow-hidden bg-slate-100">

                    {image && (
                      <img
                        src={image}
                        alt={program.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}

                  </div>

                  <div className="flex items-center justify-between p-6">

                    <h3 className="text-lg font-black text-slate-900">
                      {program.name}
                    </h3>

                    <ArrowRight
                      size={20}
                      className="text-primary transition-transform group-hover:translate-x-1"
                    />

                  </div>

                </Link>
              );
            }
          )}
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function GermanProgramPage({
  params,
}) {
  const { programId } = await params;

  const apiData =
    await getGermanCourseDetails(
      programId
    );

  if (!apiData) {
    notFound();
  }

  /*
    API returns:
    data: [...]
  */

  const course =
    Array.isArray(apiData.data)
      ? apiData.data[0]
      : null;

  if (!course) {
    console.error(
      "No German program returned for:",
      programId
    );

    notFound();
  }

  return (
    <main className="bg-slate-50">

      {/* HERO */}
      <Hero course={course} />

      {/* BENEFITS */}
      <Benefits
        benefits={apiData.benefit}
        iconPath={
          apiData.icons_image_path
        }
      />

      {/* STIPEND */}
      <Stipend
        title={apiData.stipendtitle}
        stipend={apiData.stipend}
      />

      {/* ELIGIBILITY */}
      <Eligibility
        eligibility={
          apiData.eligibility
        }
      />

      {/* ROADMAP */}
      <Roadmap
        roadmap={apiData.roadmap}
        apiData={apiData}
      />

      {/* WORK SECTORS */}
      <WorkSectors
        title={apiData.streamtitle}
        streams={apiData.streams}
        iconPath={
          apiData.icons_image_path
        }
        enabled={
          apiData.streamstatus
        }
      />

      {/* DETAILS */}
      <Details
        details={apiData.details}
      />

      {/* VIDEOS */}
      <Videos
        videos={apiData.youtube}
        thumbnailPath={
          apiData.thumb_image_path
        }
      />

      {/* RELATED PROGRAMS */}
      <RelatedPrograms
        apiData={apiData}
      />

    </main>
  );
}