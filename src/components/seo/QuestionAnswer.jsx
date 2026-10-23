import { isValidElement } from "react";

/*
 * A heading written as a question, followed straight away by a short
 * direct answer (aim for 40 to 60 words) and, optionally, a list of
 * points. Answer engines quote this pattern.
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

    return (
        <section className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {eyebrow && (
                <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-yellow-300" : "text-primary"}`}>{eyebrow}</p>
            )}

            <h2 className={`mt-2 text-2xl font-black leading-tight sm:text-3xl ${dark ? "text-white" : "text-slate-900"}`}>{question}</h2>

            <p className={`mt-4 text-base leading-8 sm:text-[1.05rem] ${dark ? "text-white/80" : "text-slate-700"}`}>{answer}</p>

            {points.length > 0 && (
                <List className={`mt-5 grid gap-3 sm:grid-cols-2 ${ordered ? "list-decimal pl-5" : ""}`}>
                    {points.map((point, index) => (
                        <li
                            key={index}
                            className={`rounded-2xl border p-4 leading-7 ${
                                dark ? "border-white/10 bg-white/10 text-white/85" : "border-slate-100 bg-slate-50 text-slate-700"
                            } ${ordered ? "ml-1" : ""}`}
                        >
                            {typeof point === "string" || isValidElement(point) ? (
                                point
                            ) : (
                                <>
                                    <span className={`font-bold ${dark ? "text-white" : "text-slate-900"}`}>{point.title}</span>
                                    {point.text ? <span>{`: ${point.text}`}</span> : null}
                                </>
                            )}
                        </li>
                    ))}
                </List>
            )}
        </section>
    );
}
