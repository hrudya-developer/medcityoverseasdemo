import {
    BarChart3,
    BookOpen,
    CheckCircle,
    GraduationCap,
    Landmark,
    MapPin,
    Star,
    Trophy,
} from "lucide-react";

export default function UniversityStats({
    data,
}) {
    const stats = [
        {
            icon: Landmark,
            label: "Type",
            value: data?.universityType,
        },
        {
            icon: MapPin,
            label: "Location",
            value: data?.locationText,
        },
        {
            icon: Trophy,
            label: "Ranking",
            value: data?.ranking,
        },
        {
            icon: Star,
            label: "Scholarship",
            value: data?.scholarship,
        },
        {
            icon: BookOpen,
            label: "IELTS",
            value: data?.withoutIelts,
        },
        {
            icon: GraduationCap,
            label: "GRE",
            value: data?.withoutGre,
        },
        {
            icon: BarChart3,
            label: "GMAT",
            value: data?.withoutGmat,
        },
        {
            icon: CheckCircle,
            label: "Application Fee Waiver",
            value:
                data?.applicationFeeWaiver,
        },
    ].filter(
        (item) =>
            item.value !== null &&
            item.value !== undefined &&
            item.value !== ""
    );

    if (!stats.length) {
        return null;
    }

    return (
        <section
            aria-label="University statistics"
            className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10"
        >
            {stats.map(
                ({
                    icon: Icon,
                    label,
                    value,
                }) => (
                    <article
                        key={label}
                        className="rounded-2xl border border-[#e6eaf2] bg-white p-5 shadow-lg"
                    >
                        <div className="mb-4 grid size-16 place-content-center rounded-full bg-darkPrimary text-white">
                            <Icon
                                className="size-8"
                                aria-hidden="true"
                            />
                        </div>

                        <p className="text-xs font-black uppercase text-[#51607d]">
                            {label}
                        </p>

                        <h3 className="mt-1 break-words text-lg font-black text-[#081c47]">
                            {value}
                        </h3>
                    </article>
                )
            )}
        </section>
    );
}