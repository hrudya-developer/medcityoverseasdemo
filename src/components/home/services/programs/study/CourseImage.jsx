import Image from "next/image";

export default function CourseImage({
    imageUrl,
    courseName,
}) {
    if (!imageUrl) {
        return (
            <CourseImageFallback />
        );
    }

    return (
        <div
            className="relative h-[230px] w-full overflow-hidden bg-slate-100"
        >
            <Image
                src={imageUrl}
                alt={`${courseName} study abroad course`}
                fill
                sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    390px
                "
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
        </div>
    );
}

function CourseImageFallback() {
    return (
        <div
            className="relative flex h-[230px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/10 px-5 text-center"
        >
            <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full border-[24px] border-primary/5"
            />

            <span
                className="relative z-10 text-sm font-semibold text-slate-500"
            >
                Course image unavailable
            </span>
        </div>
    );
}