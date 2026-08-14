"use client";

import {
    useState,
} from "react";

import {
    BookOpenCheck,
    GraduationCap,
    Languages,
    Pencil,
    School,
} from "lucide-react";

import QualificationUpdateModal from "../../qualification-update/components/QualificationUpdateModal";

function hasValue(value) {
    return (
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    );
}

export default function QualificationDetails({
    profile,
    onUpdated,
}) {
    const [
        updateOpen,
        setUpdateOpen,
    ] = useState(false);

    const items = [
        {
            icon: GraduationCap,
            label: "Highest Qualification",
            value: profile?.highest,
        },
        {
            icon: School,
            label: "10th Syllabus",
            value: profile?.tenth_syllabus,
        },
        {
            icon: BookOpenCheck,
            label: "10th Overall",
            value: profile?.tenth_overall,
        },
        {
            icon: School,
            label: "12th Stream",
            value: profile?.twelth_stream,
        },
        {
            icon: BookOpenCheck,
            label: "12th Overall",
            value: profile?.twelth_overall,
        },
        {
            icon: BookOpenCheck,
            label: "12th English",
            value: profile?.twelth_english,
        },
        {
            icon: GraduationCap,
            label: "Degree Stream",
            value: profile?.degree_stream,
        },
        {
            icon: BookOpenCheck,
            label: "Degree Overall",
            value: profile?.degree_overall,
        },
        {
            icon: BookOpenCheck,
            label: "Degree English",
            value: profile?.degree_english,
        },
        {
            icon: GraduationCap,
            label: "PG Stream",
            value: profile?.pg_stream,
        },
        {
            icon: BookOpenCheck,
            label: "PG Overall",
            value: profile?.pg_overall,
        },
        {
            icon: BookOpenCheck,
            label: "PG English",
            value: profile?.pg_english,
        },
        {
            icon: Languages,
            label: "IELTS Overall",
            value: profile?.ielts_overall,
        },
        {
            icon: Languages,
            label: "IELTS Listening",
            value: profile?.ielts_l,
        },
        {
            icon: Languages,
            label: "IELTS Reading",
            value: profile?.ielts_r,
        },
        {
            icon: Languages,
            label: "IELTS Writing",
            value: profile?.ielts_w,
        },
        {
            icon: Languages,
            label: "IELTS Speaking",
            value: profile?.ielts_s,
        },
    ].filter(
        (item) =>
            hasValue(item.value)
    );

    return (
        <>
            <div className="border-t border-slate-100 px-6 py-7 sm:px-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-primary">
                            <GraduationCap
                                size={20}
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-black text-slate-900">
                                Qualification Details
                            </h2>

                            <p className="text-xs text-slate-500">
                                Academic and language information
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setUpdateOpen(true)
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#c01f53]
                            px-4
                            py-2.5
                            text-xs
                            font-bold
                            text-white
                            transition

                            hover:bg-[#a91e4c]
                        "
                    >
                        <Pencil size={14} />

                        Update Qualification
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">
                            Qualification details have not been updated yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.map(
                            ({
                                icon: Icon,
                                label,
                                value,
                            }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                                >
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                                        <Icon
                                            size={18}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                            {label}
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-800">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            <QualificationUpdateModal
                open={updateOpen}
                profile={profile}
                onClose={() =>
                    setUpdateOpen(false)
                }
                onUpdated={async () => {
                    setUpdateOpen(false);

                    await onUpdated?.();
                }}
            />
        </>
    );
}