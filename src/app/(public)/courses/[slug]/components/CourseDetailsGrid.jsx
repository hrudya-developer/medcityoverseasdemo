import {
    Award,
    Briefcase,
    CalendarDays,
    Globe,
    GraduationCap,
    MapPin,
    MessageCircle,
    Wallet,
} from "lucide-react";

import DetailCard from "./DetailCard";
import Pattern from "./Pattern";

export default function CourseDetailsGrid({
    details,
}) {
    return (
        <section
            className="mx-auto max-w-7xl px-5 py-10 lg:px-12"
        >
            <div
                className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
                <DetailCard
                    icon={<GraduationCap />}
                    title="Entry Requirement"
                    text={details.entryRequirement}
                    color="pink"
                />

                <DetailCard
                    icon={<MessageCircle />}
                    title="Remarks"
                    text={details.remarks}
                    color="blue"
                />

                <FeesCard
                    fees={details.fees}
                    applicationFee={
                        details.applicationFee
                    }
                />

                <DeadlineCard
                    deadline={details.deadline}
                />
            </div>

            <div
                className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4"
            >
                <MiniInfo
                    icon={<Briefcase />}
                    title="Field of Study"
                    text={details.fieldOfStudy}
                />

                <MiniInfo
                    icon={<Globe />}
                    title="Country"
                    text={details.country}
                />

                <MiniInfo
                    icon={<Award />}
                    title="University"
                    text={details.universityName}
                />

                <MiniInfo
                    icon={<MapPin />}
                    title="Location"
                    text={details.locationName}
                />
            </div>
        </section>
    );
}

function FeesCard({
    fees,
    applicationFee,
}) {
    return (
        <article
            className="relative min-h-[280px] overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6 shadow-sm sm:p-8"
        >
            <Pattern color="bg-orange-300/20" />

            <div className="relative flex items-center gap-5">
                <div
                    className="grid size-16 place-content-center rounded-full bg-orange-100 text-orange-500"
                >
                    <Wallet />
                </div>

                <h2 className="text-lg font-extrabold uppercase text-darkPrimary">
                    Fees
                </h2>
            </div>

            <p
                className="relative mt-8 break-words text-3xl font-extrabold text-orange-500 sm:text-4xl"
            >
                {fees}
            </p>

            <div className="relative mt-6 h-px bg-orange-200" />

            <p className="relative mt-6 font-bold text-slate-900">
                Application Fee:

                <span className="ms-3 text-xl font-extrabold text-orange-500">
                    {applicationFee}
                </span>
            </p>
        </article>
    );
}

function DeadlineCard({
    deadline,
}) {
    return (
        <article
            className="relative min-h-[280px] overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-sm sm:p-8"
        >
            <Pattern color="bg-emerald-300/20" />

            <div className="relative flex items-center gap-5">
                <div
                    className="grid size-16 place-content-center rounded-full bg-emerald-100 text-emerald-600"
                >
                    <CalendarDays />
                </div>

                <h2 className="text-lg font-extrabold uppercase text-darkPrimary">
                    Deadline
                </h2>
            </div>

            <p
                className="relative mt-12 break-words text-4xl font-extrabold text-emerald-600"
            >
                {deadline}
            </p>
        </article>
    );
}

function MiniInfo({
    icon,
    title,
    text,
}) {
    return (
        <div className="flex gap-3 rounded-xl bg-white p-3">
            <div
                className="grid size-10 shrink-0 place-content-center rounded-full bg-blue-100 text-darkPrimary"
            >
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-bold uppercase text-[#071b45]">
                    {title}
                </p>

                <p className="mt-1 break-words text-sm text-slate-700">
                    {text}
                </p>
            </div>
        </div>
    );
}