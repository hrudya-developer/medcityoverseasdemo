export default function VisaAchieversLoading() {
    return (
        <section
            className="
                bg-[#3b0b22]
                py-20
            "
        >
            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    sm:px-8
                    lg:px-10
                "
            >
                <div
                    className="
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={
                                    item
                                }
                                className="
                                    h-[420px]
                                    animate-pulse
                                    rounded-[26px]
                                    bg-white/10
                                "
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}