
import { isValidElement } from "react";
import { Pointer } from "lucide-react";

/*
 * A heading written as a question, followed straight away by a short
 * direct answer and, optionally, a list of points.
 */
export default function QuestionAnswer({
    question,
    answer,
    points = [],
    ordered = false,
    eyebrow,
    className = "",
    tone = "light",
}) {
    const List = ordered ? "ol" : "ul";
    const dark = tone === "dark";

    const cardStyles = [
        {
            bg: "bg-blue-50",
            color: "text-blue-600",
            border: "border-blue-200",
            divider: "bg-blue-300",
        },
        {
            bg: "bg-orange-50",
            color: "text-orange-500",
            border: "border-orange-200",
            divider: "bg-orange-300",
        },
        {
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            border: "border-emerald-200",
            divider: "bg-emerald-300",
        },
        {
            bg: "bg-violet-50",
            color: "text-violet-600",
            border: "border-violet-200",
            divider: "bg-violet-300",
        },
        {
            bg: "bg-sky-50",
            color: "text-sky-600",
            border: "border-sky-200",
            divider: "bg-sky-300",
        },
    ];

    return (
        <section
            className={`relative isolate mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-10 ${className}`}
        >
            <div
                className={`relative isolate overflow-hidden rounded-[24px] border p-5 sm:rounded-[30px] sm:p-8 lg:p-10 ${
                    dark
                        ? "border-white/15 bg-white/[0.06] shadow-xl"
                        : "border-slate-100 bg-gradient-to-br from-white via-white to-pink-50/40 shadow-[0_12px_45px_rgba(15,23,42,0.06)]"
                }`}
            >
                {/* Decorative background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        backgroundImage: dark
                            ? "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
                            : "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                        maskImage: "linear-gradient(to bottom, black, transparent 95%)",
                    }}
                />
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-16 -top-20 z-0 h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64 ${
                        dark
                            ? "bg-pink-500/10"
                            : "bg-pink-100/40"
                    }`}
                />

                {/* Accent line */}
                <div className="relative z-10 mb-5 h-1.5 w-14 rounded-full bg-primary sm:mb-6 sm:w-16" />

                {/* Eyebrow */}
                {eyebrow && (
                    <p
                        className={`relative z-10 mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.2em] ${
                            dark
                                ? "text-yellow-300"
                                : "text-secondary"
                        }`}
                    >
                        {eyebrow}
                    </p>
                )}

                {/* Question */}
                <h2
                    className={`relative z-10 break-words text-[23px] font-black leading-[1.3] tracking-tight sm:text-3xl lg:text-[36px] ${
                        dark
                            ? "text-white"
                            : "text-[#071D49]"
                    }`}
                >
                    {question}
                </h2>

                {/* Answer */}
                <div
                    className={`relative z-10 mt-5 rounded-2xl border-l-[3px] p-4 sm:mt-6 sm:p-6 ${
                        dark
                            ? "border-l-yellow-300 bg-white/10"
                            : "border-l-gray-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
                    }`}
                >
                    <p
                        className={`break-words text-sm leading-7 sm:text-base sm:leading-8 ${
                            dark
                                ? "text-white/85"
                                : "text-slate-700"
                        }`}
                    >
                        {answer}
                    </p>
                </div>

                {/* Points */}
                {points.length > 0 && (
                    <List
                        className="relative z-10 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
                    >
                        {points.map((point, index) => {
                            const style =
                                cardStyles[index % cardStyles.length];

                            return (
                                <li
                                    key={index}
                                    className={`group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-[20px] border p-4 transition-all duration-300 hover:-translate-y-1 sm:gap-5 sm:p-5 ${
                                        dark
                                            ? "border-white/15 bg-white/[0.08] text-white/85 hover:bg-white/[0.12]"
                                            : `bg-white text-slate-700 shadow-[0_6px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)] ${style.border}`
                                    }`}
                                >
                                    {/* Icon */}
                                    <div
                                        aria-hidden="true"
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-[70px] sm:w-[70px] ${
                                            dark
                                                ? "bg-white/10 text-white"
                                                : `${style.bg} ${style.color}`
                                        }`}
                                    >
                                        {ordered ? (
                                            <span className="text-xl font-black sm:text-2xl">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        ) : (
                                            <Pointer
                                                size={30}
                                                strokeWidth={1.8}
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div
                                        aria-hidden="true"
                                        className={`h-14 w-[2px] shrink-0 rounded-full sm:h-16 ${
                                            dark
                                                ? "bg-white/20"
                                                : style.divider
                                        }`}
                                    />

                                    {/* Content */}
                                    <div className="min-w-0 flex-1 break-words">
                                        {typeof point === "string" ||
                                        isValidElement(point) ? (
                                            <div
                                                className={`text-sm leading-6 sm:text-base sm:leading-7 ${
                                                    dark
                                                        ? "text-white/85"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {point}
                                            </div>
                                        ) : (
                                            <>
                                                <h3
                                                    className={`text-base font-extrabold leading-snug sm:text-lg ${
                                                        dark
                                                            ? "text-white"
                                                            : "text-[#071D49]"
                                                    }`}
                                                >
                                                    {point.title}
                                                </h3>

                                                {point.text && (
                                                    <p
                                                        className={`mt-1 text-sm leading-6 sm:text-[15px] sm:leading-7 ${
                                                            dark
                                                                ? "text-white/70"
                                                                : "text-slate-600"
                                                        }`}
                                                    >
                                                        {point.text}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </List>
                )}
            </div>
        </section>
    );
}
