import Image from "next/image";

import {
    Globe2,
    GraduationCap,
} from "lucide-react";

import FloatingBadge from "./FloatingBadge";

const StudyAbroadVisual = () => {
    return (
        <div
            className="relative z-10 mt-2 flex flex-1 items-end justify-center pb-10"
        >
            <div
                aria-hidden="true"
                className="absolute bottom-20 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/45 via-primary/20 to-secondary/20 blur-xl sm:h-[300px] sm:w-[300px] lg:left-36 lg:translate-x-0"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-20 left-1/2 h-[270px] w-[270px] -translate-x-1/2 rounded-full border border-white/10 sm:h-[315px] sm:w-[315px] lg:left-36 lg:translate-x-0"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-[102px] left-1/2 h-[235px] w-[235px] -translate-x-1/2 rounded-full border border-dashed border-primary/25 sm:h-[278px] sm:w-[278px] lg:left-[154px] lg:translate-x-0"
            />

            <FloatingBadge
                icon={GraduationCap}
                label="Expert counselling"
                iconClassName="bg-primary"
                className="bottom-48 left-4 lg:left-0"
            />

            <FloatingBadge
                icon={Globe2}
                label="Global destinations"
                iconClassName="bg-secondary"
                className="bottom-28 right-2 lg:right-6"
            />

            <Image
                src="/assets/international-candidate.webp"
                alt="International student holding study materials"
                width={440}
                height={540}
                sizes="
          (max-width: 640px) 280px,
          (max-width: 1024px) 340px,
          390px
        "
                className="relative z-20 h-auto w-[270px] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.38)] sm:w-[330px] lg:w-[380px]"
            />
        </div>
    );
};

export default StudyAbroadVisual;