"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Globe2,
  GraduationCap,
  Headphones,
  Search,
} from "lucide-react";

export default function CoursesHero() {
  const router = useRouter();
  const countrySelectRef = useRef(null);

  const [filters, setFilters] = useState({
    country: "",
    university: "",
    course: "",
  });

  const updateFilter = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleExploreCourses = () => {
    document.getElementById("course-search")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      countrySelectRef.current?.focus();
    }, 500);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();

    router.push(
      query
        ? `/courses/search?${query}`
        : "/courses/search"
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#fcfdff]">
      <HeroBackground />

      {/* Main hero */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 md:px-8 lg:min-h-[650px] gap-12 sm:gap-12 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pb-36 lg:pt-16 xl:gap-16 xl:px-20 2xl:min-h-[700px]">
        {/* Mobile image */}
        <div className="order-1 flex justify-center lg:order-2">
          <HeroImage />
        </div>

        {/* Text content */}
        <div className="mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
            Discover your future
          </p>

          <h1 className="text-[2.25rem] font-black leading-[1.08] tracking-tight text-slate-950 min-[400px]:text-[2.5rem] sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] xl:text-6xl">
            Find the Right Course.

            <span className="mt-1.5 block text-primary sm:mt-2">
              Build Your Future.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7 md:text-lg lg:mx-0">
            Search from top universities and courses across the world and
            take the first step toward your global career.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 min-[440px]:flex-row sm:mt-8 lg:justify-start">
            <button
              type="button"
              onClick={handleExploreCourses}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-[440px]:w-auto sm:px-7"
            >
              Explore Courses
            </button>

            <button
              type="button"
              onClick={() => router.push("/contact-us")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white/65 px-6 text-sm font-bold text-primary backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-[440px]:w-auto sm:px-7"
            >
              <Headphones
                size={18}
                aria-hidden="true"
              />

              Talk to an Expert
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

function HeroImage() {
  return (
    <div className="relative aspect-square w-[min(82vw,360px)] sm:w-[min(70vw,440px)] md:w-[min(62vw,500px)] lg:w-full lg:max-w-[530px] xl:max-w-[570px]">
      {/* Outer colored glow */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-gradient-to-br from-pink-300/35 via-purple-300/25 to-blue-300/40 blur-2xl sm:blur-3xl"
      />

      {/* Decorative outer rings */}
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-full border border-primary/10 sm:-inset-3"
      />

      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-full border border-blue-300/10 sm:-inset-6"
      />

      {/* Main image */}
      <div className="relative h-full w-full overflow-hidden rounded-full border-[4px] border-white bg-white shadow-[0_24px_65px_rgba(75,85,150,0.2)] sm:border-[6px]">
        <Image
          src="/assets/student-study-abroad.webp"
          alt="Student exploring international study opportunities"
          fill
          priority
          sizes="
            (max-width: 440px) 82vw,
            (max-width: 640px) 70vw,
            (max-width: 1024px) 62vw,
            45vw
          "
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

function HeroBackground() {
  return (
    <>
      {/* Base gradient and ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background: `
            radial-gradient(
              circle at 2% 82%,
              rgba(244, 114, 182, 0.16),
              transparent 29%
            ),
            radial-gradient(
              circle at 98% 6%,
              rgba(96, 165, 250, 0.20),
              transparent 34%
            ),
            radial-gradient(
              circle at 58% 55%,
              rgba(255, 255, 255, 0.96),
              transparent 46%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #fdfdff 48%,
              #f3f8ff 100%
            )
          `,
        }}
      />

      {/* Responsive grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-40 sm:opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(148, 163, 184, 0.13) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.13) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "clamp(32px, 4vw, 48px) clamp(32px, 4vw, 48px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        }}
      />

      {/* Decorative vector lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1600 820"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient
            id="courses-pink-line"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              stopColor="#ec4899"
              stopOpacity="0.22"
            />

            <stop
              offset="1"
              stopColor="#ec4899"
              stopOpacity="0.025"
            />
          </linearGradient>

          <linearGradient
            id="courses-blue-line"
            x1="1"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              stopColor="#3b82f6"
              stopOpacity="0.2"
            />

            <stop
              offset="1"
              stopColor="#6366f1"
              stopOpacity="0.025"
            />
          </linearGradient>
        </defs>

        {/* Top-left rings */}
        <circle
          cx="-15"
          cy="20"
          r="175"
          stroke="url(#courses-pink-line)"
        />

        <circle
          cx="-15"
          cy="20"
          r="235"
          stroke="url(#courses-pink-line)"
          strokeDasharray="10 14"
        />

        <circle
          cx="-15"
          cy="20"
          r="295"
          stroke="url(#courses-pink-line)"
          opacity="0.55"
        />

        {/* Bottom-left rings */}
        <circle
          cx="70"
          cy="850"
          r="230"
          stroke="url(#courses-blue-line)"
        />

        <circle
          cx="70"
          cy="850"
          r="280"
          stroke="url(#courses-blue-line)"
          opacity="0.75"
        />

        <circle
          cx="70"
          cy="850"
          r="335"
          stroke="url(#courses-pink-line)"
          opacity="0.6"
        />

        {/* Top-right globe contours */}
        <circle
          cx="1570"
          cy="-20"
          r="230"
          stroke="url(#courses-blue-line)"
        />

        <circle
          cx="1570"
          cy="-20"
          r="285"
          stroke="url(#courses-blue-line)"
          opacity="0.75"
        />

        <circle
          cx="1570"
          cy="-20"
          r="340"
          stroke="url(#courses-blue-line)"
          opacity="0.5"
        />

        <path
          d="M1275 -30C1325 100 1435 172 1615 188"
          stroke="url(#courses-blue-line)"
        />

        <path
          d="M1370 -30C1395 95 1475 150 1610 147"
          stroke="url(#courses-blue-line)"
        />

        <path
          d="M1460 -20C1460 82 1515 125 1610 117"
          stroke="url(#courses-blue-line)"
        />

        {/* Travel route */}
        <path
          d="M1250 515C1355 442 1490 455 1620 570"
          stroke="#7c3aed"
          strokeOpacity="0.13"
          strokeWidth="1.6"
          strokeDasharray="9 12"
        />

        {/* Bottom-right rings */}
        <circle
          cx="1580"
          cy="810"
          r="130"
          stroke="url(#courses-blue-line)"
        />

        <circle
          cx="1580"
          cy="810"
          r="168"
          stroke="url(#courses-blue-line)"
        />

        <circle
          cx="1580"
          cy="810"
          r="208"
          stroke="url(#courses-pink-line)"
        />

        {/* Accent shapes */}
        <g opacity="0.3">
          <path
            d="M310 112l6 6-6 6-6-6 6-6z"
            fill="#ec4899"
          />

          <path
            d="M760 94l5 5-5 5-5-5 5-5z"
            fill="#3b82f6"
          />

          <path
            d="M1365 610l6 6-6 6-6-6 6-6z"
            fill="#ec4899"
          />

          <path
            d="M1190 350l5 5-5 5-5-5 5-5z"
            fill="#3b82f6"
          />

          <circle
            cx="92"
            cy="390"
            r="11"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />

          <circle
            cx="1510"
            cy="280"
            r="6"
            stroke="#ec4899"
            strokeWidth="1.5"
          />
        </g>

        {/* Open-book decoration */}
        <g
          transform="translate(125 268)"
          stroke="#6366f1"
          strokeOpacity="0.15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 8c12-6 23-5 33 2v31c-10-7-21-8-33-2V8Z" />
          <path d="M66 8c-12-6-23-5-33 2v31c10-7 21-8 33-2V8Z" />
          <path d="M33 10v31" />
        </g>

        {/* Graduation-cap decoration */}
        <g
          transform="translate(400 76)"
          stroke="#3b82f6"
          strokeOpacity="0.14"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 10 24 0l24 10-24 10L0 10Z" />
          <path d="M10 15v13c8 6 20 6 28 0V15" />
          <path d="M48 10v18" />
        </g>
      </svg>

      {/* Readability layer behind copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] -z-[5] h-[38%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-3xl lg:left-[28%] lg:top-[45%] lg:h-[55%] lg:w-[46%]"
      />
    </>
  );
}

function FilterSelect({
  selectRef,
  icon: Icon,
  label,
  name,
  value,
  placeholder,
  options,
  onChange,
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
        <Icon
          size={17}
          className="shrink-0 text-primary"
          aria-hidden="true"
        />

        {label}
      </span>

      <select
        ref={selectRef}
        name={name}
        value={value}
        onChange={onChange}
        className="min-h-[52px] w-full min-w-0 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}