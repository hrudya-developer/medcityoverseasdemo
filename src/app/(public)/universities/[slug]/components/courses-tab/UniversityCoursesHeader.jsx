export default function UniversityCoursesHeader({
    universityName,
    totalCourses,
}) {
    return (
        <header className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                Available Courses
            </p>

            <h2 className="mt-3 max-w-5xl text-3xl font-black tracking-tight text-[#081c47] sm:text-4xl">
                Courses at{" "}
                <span className="text-primary">
                    {
                        universityName
                    }
                </span>
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                Explore{" "}
                <strong className="font-black text-darkPrimary">
                    {
                        totalCourses
                    }
                </strong>{" "}
                {totalCourses ===
                1
                    ? "course"
                    : "courses"}{" "}
                available at{" "}
                {
                    universityName
                }.
                Select a study
                area to explore
                matching programs.
            </p>
        </header>
    );
}