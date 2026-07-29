import CourseCard from "./CourseCard";

export default function CourseResultsGrid({
    courses,
    currentPage,
    coursesPerPage,
}) {
    return (
        <div
            className="
        grid grid-cols-1 gap-6
        md:grid-cols-2
        lg:grid-cols-3
      "
        >
            {courses.map((course, index) => (
                <CourseCard
                    key={
                        course?.id ||
                        course?.course_id ||
                        course?.c_id ||
                        `${currentPage}-${index}`
                    }
                    course={course}
                    position={
                        (currentPage - 1) *
                        coursesPerPage +
                        index +
                        1
                    }
                />
            ))}
        </div>
    );
}