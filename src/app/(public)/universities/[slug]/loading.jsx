export default function UniversityDetailsLoading() {
    return (
        <main className="min-h-screen bg-[#f7f9fd]">
            <section className="bg-gradient-to-br from-[#071936] via-[#0b2853] to-darkPrimary px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
                    <div className="animate-pulse">
                        <div className="h-6 w-40 rounded-full bg-white/15" />

                        <div className="mt-8 flex items-center gap-5">
                            <div className="size-20 rounded-2xl bg-white/20" />

                            <div className="flex-1">
                                <div className="h-4 w-32 rounded bg-white/20" />
                                <div className="mt-3 h-10 w-4/5 rounded bg-white/20" />
                            </div>
                        </div>

                        <div className="mt-7 h-5 w-52 rounded bg-white/20" />

                        <div className="mt-6 space-y-3">
                            <div className="h-4 w-full rounded bg-white/15" />
                            <div className="h-4 w-11/12 rounded bg-white/15" />
                            <div className="h-4 w-4/5 rounded bg-white/15" />
                        </div>

                        <div className="mt-8 flex gap-3">
                            <div className="h-10 w-32 rounded-full bg-white/20" />
                            <div className="h-10 w-36 rounded-full bg-white/20" />
                        </div>

                        <div className="mt-8 h-14 w-44 rounded-xl bg-white/20" />
                    </div>

                    <div className="mx-auto aspect-square w-full max-w-[420px] animate-pulse rounded-[36px] bg-white/15" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
                <div className="grid animate-pulse gap-6 lg:grid-cols-2">
                    <div className="h-[420px] rounded-3xl bg-white shadow-lg" />
                    <div className="h-[420px] rounded-3xl bg-white shadow-lg" />
                </div>
            </section>
        </main>
    );
}