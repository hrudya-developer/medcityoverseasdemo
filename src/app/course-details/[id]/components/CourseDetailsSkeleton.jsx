export default function CourseDetailsSkeleton() {
    return (
        <main className="min-h-screen bg-white px-5 py-12">
            <div className="mx-auto max-w-7xl animate-pulse">
                <div className="h-[400px] rounded-3xl bg-slate-200" />

                <div
                    className="
                        mt-8 grid
                        grid-cols-1 gap-5
                        md:grid-cols-3
                    "
                >
                    {Array.from({
                        length: 3,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className="
                                h-24 rounded-2xl
                                bg-slate-100
                            "
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}