import cn from "@/lib/cn";

export default function FooterDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_bottom_left,rgba(168,13,65,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(211,39,159,0.4),transparent_30%),linear-gradient(135deg,rgba(255,0,0,0.08),transparent_40%)]
                "
            />

            <DotPattern
                className="left-0 top-0 grid opacity-20"
            />

            <DotPattern
                className="
                    bottom-0
                    right-0
                    hidden
                    opacity-20

                    lg:grid
                "
            />

            <WorldPattern />
        </>
    );
}

function DotPattern({
    className = "",
}) {
    return (
        <div
            aria-hidden="true"
            className={cn(`
                pointer-events-none
                absolute
                grid-cols-10
                gap-3
                ${className}
            `)}
        >
            {Array.from({
                length: 100,
            }).map(
                (
                    _,
                    index
                ) => (
                    <span
                        key={
                            index
                        }
                        className="
                            size-1
                            rounded-full
                            bg-white
                        "
                    />
                )
            )}
        </div>
    );
}

function WorldPattern() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                right-10
                top-8
                hidden
                opacity-20

                lg:block
            "
        >
            <svg
                width="340"
                height="180"
                viewBox="0 0 340 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Array.from({
                    length: 220,
                }).map(
                    (
                        _,
                        index
                    ) => {
                        const x =
                            (
                                index *
                                31
                            ) %
                            330;

                        const y =
                            (
                                index *
                                17
                            ) %
                            170;

                        return (
                            <circle
                                key={
                                    index
                                }
                                cx={
                                    x
                                }
                                cy={
                                    y
                                }
                                r="1.4"
                                fill="white"
                                opacity={
                                    x >
                                        40 &&
                                    y >
                                        10
                                        ? 0.8
                                        : 0.2
                                }
                            />
                        );
                    }
                )}

                <circle
                    cx="80"
                    cy="70"
                    r="3"
                    fill="#c01f53"
                />

                <circle
                    cx="150"
                    cy="40"
                    r="3"
                    fill="#c01f53"
                />

                <circle
                    cx="230"
                    cy="110"
                    r="3"
                    fill="#c01f53"
                />

                <circle
                    cx="300"
                    cy="75"
                    r="3"
                    fill="#c01f53"
                />
            </svg>
        </div>
    );
}