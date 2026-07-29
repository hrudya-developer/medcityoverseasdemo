import Carousel from "@/components/home/carousel/Carousel";
import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import GermanCoursesLayout from "@/components/home/german-courses/GermanCoursesLayout";
import MobileApp from "@/components/home/mobile-app/MobileApp";
import SearchSection from "@/components/home/searchSection/SearchSection";
import ProgramsSection from "@/components/home/services/programs/ProgramsSection";
import ServicesSection from "@/components/home/services/ServicesSection";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Medcity Overseas",
    "alternateName": "Medcity Study Abroad",
    "url": "https://medcityoverseas.com",
    "logo": "https://medcityoverseas.com/logo.png",
    "description": "Leading study abroad & overseas education consultancy in Kerala, providing expert counselling, university admissions, student visa assistance, and language training for Germany, UK, Canada, Australia, Ireland and more.",
    "sameAs": [
      "https://medcityacademy.com/",
      "https://play.google.com/store/apps/details?id=com.medcity.overseas"
    ],
    "areaServed": "India",
    "serviceType": [
      "Study Abroad Counselling",
      "University Admissions Guidance",
      "Student Visa Support",
      "German Language Training",
      "Ausbildung Overseas Programs"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Carousel />
      <SearchSection />
      <ServicesSection />
      <ProgramsSection />
      <DestinationsSection />
      <MobileApp />
      <GermanCoursesLayout />
    </>
  );
}
