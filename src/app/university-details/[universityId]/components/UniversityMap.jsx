import {
    ExternalLink,
    MapPin,
} from "lucide-react";

export default function UniversityMap({
    data,
}) {
    if (!data.googleMapUrl) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 lg:px-10">
            <div className="overflow-hidden rounded-3xl border border-[#e6eaf2] bg-white shadow-xl">
                <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-black uppercase text-secondary">
                            Exact Location
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                            {
                                data.universityName
                            }
                        </h2>

                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="size-4" />

                            {data.locationText}
                        </p>
                    </div>

                    <a
                        href={
                            data.googleMapOpenUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
                    >
                        Open in Google Maps

                        <ExternalLink className="size-4" />
                    </a>
                </div>

                <iframe
                    title={`${data.universityName} map`}
                    src={data.googleMapUrl}
                    className="h-[320px] w-full border-0 sm:h-[420px]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}