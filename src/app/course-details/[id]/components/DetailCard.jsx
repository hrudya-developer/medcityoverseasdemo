"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import Pattern from "./Pattern";

export default function DetailCard({
    icon,
    title,
    text,
    color = "pink",
}) {
    const contentRef = useRef(null);

    const [needsScroll, setNeedsScroll] =
        useState(false);

    useEffect(() => {
        if (!contentRef.current) return;

        setNeedsScroll(
            contentRef.current.scrollHeight > 300
        );
    }, [text]);

    const variants = {
        pink: {
            background:
                "from-pink-50 via-white to-pink-50",
            icon:
                "bg-pink-100 text-primary",
            line: "bg-primary",
            dots: "bg-primary/20",
        },

        blue: {
            background:
                "from-secondary/10 via-white to-sky-50",
            icon:
                "bg-secondary/10 text-secondary",
            line: "bg-secondary",
            dots: "bg-secondary/20",
        },
    };

    const variant =
        variants[color] || variants.pink;

    return (
        <article
            className={`
                relative overflow-hidden
                rounded-3xl
                border border-slate-100
                bg-gradient-to-br
                ${variant.background}
                p-6 shadow-sm
                sm:p-8
            `}
        >
            <Pattern color={variant.dots} />

            <div className="relative flex items-center gap-5">
                <div
                    className={`
                        grid size-14
                        place-content-center
                        rounded-full
                        ${variant.icon}
                    `}
                >
                    {icon}
                </div>

                <div>
                    <h2
                        className="
                            text-base
                            font-extrabold
                            uppercase
                            text-darkPrimary
                        "
                    >
                        {title}
                    </h2>

                    <div
                        className={`
                            mt-3 h-1
                            w-14 rounded-full
                            ${variant.line}
                        `}
                    />
                </div>
            </div>

            <div
                ref={contentRef}
                className={`
                    relative mt-6
                    ${needsScroll
                        ? "max-h-[270px] overflow-y-auto pr-2"
                        : ""
                    }
                `}
            >
                <p
                    className="
                        whitespace-pre-line
                        text-sm leading-7
                        text-slate-700
                    "
                >
                    {text}
                </p>
            </div>
        </article>
    );
}