"use client";

import { useRouter } from "next/navigation";

import {
    useGetCourseDetailsQuery,
} from "@/lib/services/searchApi";

import CourseBenefits from "./components/CourseBenefits";
import CourseDetailsError from "./components/CourseDetailsError";
import CourseDetailsGrid from "./components/CourseDetailsGrid";
import CourseDetailsHero from "./components/CourseDetailsHero";
import CourseDetailsSkeleton from "./components/CourseDetailsSkeleton";
import CourseQuickFacts from "./components/CourseQuickFacts";
import EnglishRequirements from "./components/EnglishRequirements";

import {
    formatCourseDetails,
} from "./utils/courseDetailsHelpers";
import FAQ from "@/components/home/FAQ/FAQ";

export default function CourseDetailsClient({
    id,
}) {
    const router = useRouter();

    const {
        data: selectedCourse,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetCourseDetailsQuery(
        {
            courseId: id,
            uid: 0,
        },
        {
            skip: !id,
        }
    );

    if (isLoading || isFetching) {
        return <CourseDetailsSkeleton />;
    }

    if (isError || !selectedCourse) {
        return (
            <CourseDetailsError
                message={
                    error?.data?.message ||
                    "Course details could not be loaded."
                }
                onRetry={refetch}
                onBack={() =>
                    router.push("/course-search")
                }
            />
        );
    }

    const details =
        formatCourseDetails(selectedCourse);

        const handleApply = () => {
            const pendingData = {
              course: selectedCourse,
              courseId: String(id),
          
              universityId:
                selectedCourse?.u_id ??
                selectedCourse?.university_id ??
                "",
          
              countryId:
                selectedCourse?.d_id ??
                selectedCourse?.country_id ??
                "",
          
              createdAt: Date.now(),
            };
          
            sessionStorage.setItem(
              "pendingApplyCourse",
              JSON.stringify(pendingData)
            );
          
            sessionStorage.setItem(
              "loginRedirectType",
              "applyCourse"
            );
          
            router.push(
              "/login?intent=applyCourse"
            );
          };

    return (
        <main className="min-h-screen bg-white text-slate-900">
            <CourseDetailsHero
                details={details}
                onApply={handleApply}
            />

            <CourseQuickFacts
                duration={details.duration}
                level={details.level}
                intakes={details.intakes}
                intakesRaw={details.intakesRaw}
            />

            <CourseDetailsGrid
                course={selectedCourse}
                details={details}
            />

            <EnglishRequirements
                course={selectedCourse}
            />

            <CourseBenefits
                country={details.country}
                intakes={details.intakes}
                universityName={
                    details.universityName
                }
            />
            <FAQ />
        </main>
    );
}