import Link from "next/link";

export default function DestinationNotFound() {
    return (
        <main
            className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 text-center"
        >
            <div className="max-w-xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                    Destination not found
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                    We couldn’t find this study
                    destination.
                </h2>

                <p className="mt-5 text-slate-600">
                    The destination may have been removed,
                    renamed or the URL may be incorrect.
                </p>

                <Link
                    href="/destinations"
                    className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-white transition hover:bg-darkPrimary"
                >
                    Browse Destinations
                </Link>
            </div>
        </main>
    );
}