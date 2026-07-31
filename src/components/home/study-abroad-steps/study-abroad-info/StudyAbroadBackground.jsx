import DotCluster from "./DotCluster";

const StudyAbroadBackground = () => {
    return (
        <>
            {/* Glows */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          -right-28 -top-28
          h-80 w-80 rounded-full
          bg-primary/30 blur-[110px]
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          -bottom-28 -left-24
          h-80 w-80 rounded-full
          bg-secondary/20 blur-[110px]
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          left-1/2 top-1/3
          h-64 w-64
          -translate-x-1/2
          rounded-full
          bg-white/[0.035]
          blur-[90px]
        "
            />

            {/* Waves */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute inset-0 overflow-hidden
        "
            >
                <div
                    className="
            absolute -left-[20%]
            top-[38%]
            h-[270px] w-[145%]
            -rotate-[8deg]
            rounded-[50%]
            border-t border-white/10
            bg-gradient-to-b
            from-white/[0.035]
            to-transparent
            sm:h-[340px]
          "
                />

                <div
                    className="
            absolute -left-[16%]
            top-[47%]
            h-[250px] w-[140%]
            -rotate-[5deg]
            rounded-[50%]
            border-t border-primary/20
          "
                />

                <div
                    className="
            absolute -left-[10%]
            top-[55%]
            h-[220px] w-[130%]
            -rotate-[2deg]
            rounded-[50%]
            border-t border-secondary/15
          "
                />
            </div>

            {/* Circular decorations */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          -right-24 top-20
          h-72 w-72 rounded-full
          border border-white/[0.07]
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          -right-8 top-36
          h-40 w-40 rounded-full
          border border-primary/20
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute
          -bottom-28 -left-24
          h-64 w-64 rounded-full
          border-[30px]
          border-secondary/[0.08]
        "
            />

            {/* Dots */}
            <DotCluster
                className="
          right-8 top-8
          opacity-20
          sm:right-12 sm:top-12
        "
            />

            <DotCluster
                count={24}
                columns={4}
                className="
          -left-3 bottom-44
          opacity-10 sm:left-5
        "
            />
        </>
    );
};

export default StudyAbroadBackground;