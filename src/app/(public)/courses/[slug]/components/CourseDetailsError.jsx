export default function CourseDetailsError({
    message,
    onRetry,
    onBack,
}) {
    return (
        <main
            className="grid min-h-screen place-content-center bg-slate-50 px-5 text-center"
        >
            <div
                className="max-w-md rounded-3xl bg-white p-8 shadow-xl"
            >
                <h2 className="text-2xl font-black text-primary">
                    Course unavailable
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onRetry}
                        className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
                    >
                        Try again
                    </button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="rounded-xl bg-darkPrimary px-5 py-3 text-sm font-bold text-white"
                    >
                        Back
                    </button>
                </div>
            </div>
        </main>
    );
}