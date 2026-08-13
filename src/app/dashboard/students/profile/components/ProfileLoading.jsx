export default function ProfileLoading() {
    return (
        <div
            className="
                overflow-hidden

                rounded-[26px]

                border
                border-slate-200/70

                bg-white

                shadow-[0_18px_50px_rgba(15,23,42,0.06)]
            "
        >
            <div
                className="
                    animate-pulse

                    border-b
                    border-slate-100

                    bg-gradient-to-r
                    from-slate-50
                    via-white
                    to-slate-50

                    p-6

                    sm:p-8
                "
            >
                <div
                    className="
                        h-3
                        w-24

                        rounded-full

                        bg-slate-200
                    "
                />

                <div
                    className="
                        mt-3

                        h-8
                        w-56

                        rounded-lg

                        bg-slate-200
                    "
                />

                <div
                    className="
                        mt-3

                        h-3
                        w-72
                        max-w-full

                        rounded-full

                        bg-slate-100
                    "
                />
            </div>

            <div
                className="
                    grid
                    animate-pulse

                    gap-4

                    p-6

                    sm:grid-cols-2
                    sm:p-8
                "
            >
                {Array.from({
                    length: 6,
                }).map(
                    (_, index) => (
                        <div
                            key={
                                index
                            }
                            className="
                                h-20

                                rounded-2xl

                                bg-slate-100
                            "
                        />
                    )
                )}
            </div>
        </div>
    );
}