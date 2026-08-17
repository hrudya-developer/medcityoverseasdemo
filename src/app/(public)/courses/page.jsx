import SearchSection from "@/components/home/searchSection/SearchSection";
import CoursesHero from "./components/CoursesHero";
import PopularCoursesPage from "../popular-courses/page";

export const metadata = {
  title: "Explore Courses | Medcity Study Abroad",
  description:
    "Discover courses from leading universities and begin your study-abroad journey.",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CoursesHero />

      <SearchSection />
      <PopularCoursesPage />

    
    </main>
  );
}