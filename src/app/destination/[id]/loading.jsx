export default function Loading() {
    return (
        <main className="min-h-screen animate-pulse bg-slate-50">
            <section className="bg-[#e8f5ff]">
                <div
                    className="
                        mx-auto grid min-h-[560px]
                        max-w-7xl gap-10
                        px-4 py-12
                        sm:px-6
                        lg:grid-cols-2
                        lg:px-8
                    "
                >
                    <div className="flex flex-col justify-center">
                        <div className="h-9 w-44 rounded-full bg-slate-200" />

                        <div className="mt-7 h-14 max-w-xl rounded-xl bg-slate-200" />

                        <div className="mt-4 h-14 max-w-md rounded-xl bg-slate-200" />

                        <div className="mt-7 h-24 max-w-xl rounded-xl bg-slate-200" />

                        <div className="mt-8 flex gap-4">
                            <div className="h-14 w-44 rounded-xl bg-slate-200" />
                            <div className="h-14 w-44 rounded-xl bg-slate-200" />
                        </div>
                    </div>

                    <div className="min-h-[430px] rounded-[36px] bg-slate-200" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                    {Array.from({ length: 6 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="h-36 rounded-2xl bg-slate-200"
                            />
                        )
                    )}
                </div>
            </section>
        </main>
    );
}