import {
  Suspense,
} from "react";

import SearchSection from "@/components/home/searchSection/SearchSection";

import CoursesHero from "./components/CoursesHero";
import CourseFinder from "./components/CourseFinder";

export const metadata = {
  title:
    "Explore Courses | Medcity Study Abroad",

  description:
    "Discover courses from leading universities and begin your study-abroad journey.",
};

function SearchSectionFallback() {
  return (
    <section className="min-h-[180px] bg-white" />
  );
}

function CourseFinderFallback() {
  return (
    <section className="mx-auto min-h-[500px] max-w-7xl px-5 py-10 lg:px-12">
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded-lg bg-slate-200" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-[500px] rounded-3xl bg-slate-100" />

          <div className="space-y-5">
            <div className="h-56 rounded-3xl bg-slate-100" />

            <div className="h-56 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CoursesHero />

      <Suspense
        fallback={
          <SearchSectionFallback />
        }
      >
        <SearchSection />
      </Suspense>

      <Suspense
        fallback={
          <CourseFinderFallback />
        }
      >
        <CourseFinder />
      </Suspense>
    </main>
  );
}