import Link from "next/link";

import { getLatestCourses } from "@/lib/courseListing";

const NOT_RECORDED = "Not recorded";

/*
 * The most recently added courses, rendered on the server so the page
 * has a real list of courses before the interactive finder loads.
 * Every value comes from the course records; empty ones show
 * "Not recorded".
 */
export default async function LatestCoursesTable({ className = "" }) {
    const { total, courses } = await getLatestCourses(24);

    if (!courses.length) {
        return null;
    }

    return (
        <section aria-labelledby="latest-courses-heading" className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 id="latest-courses-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
                Recently added study abroad courses
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {courses.length < total
                    ? `The ${courses.length} newest of the ${total.toLocaleString("en-IN")} courses listed on Medcity Overseas. Use the course finder above to search them all.`
                    : `All ${total.toLocaleString("en-IN")} courses currently listed on Medcity Overseas, newest first.`}{" "}
                Open a course for its fees and entry requirements where we have recorded them.
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
                        <tr>
                            <th scope="col" className="px-4 py-3">Course</th>
                            <th scope="col" className="px-4 py-3">University</th>
                            <th scope="col" className="px-4 py-3">Country</th>
                            <th scope="col" className="px-4 py-3">Level</th>
                            <th scope="col" className="px-4 py-3">Duration</th>
                            <th scope="col" className="px-4 py-3">Intakes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                                    <Link href={`/courses/${course.slug}`} className="hover:text-primary hover:underline">
                                        {course.name ?? NOT_RECORDED}
                                    </Link>
                                </th>
                                <td className="px-4 py-3">{course.university ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{course.country ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{course.level ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{course.duration ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{course.intakes ?? NOT_RECORDED}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
