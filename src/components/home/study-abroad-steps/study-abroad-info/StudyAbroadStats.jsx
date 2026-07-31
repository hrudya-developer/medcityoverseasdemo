import { studyAbroadStats } from "./studyAbroadData";

const StudyAbroadStats = () => {
    return (
        <div
            className="
        mx-auto mt-6 grid
        max-w-lg grid-cols-3
        gap-2 rounded-2xl
        border border-white/10
        bg-white/[0.06] p-3
        backdrop-blur-md
        lg:mx-0
      "
        >
            {studyAbroadStats.map(
                (stat, index) => (
                    <div
                        key={stat.label}
                        className={`
              px-2 text-center
              ${index !== 0
                                ? "border-l border-white/10"
                                : ""
                            }
            `}
                    >
                        <p
                            className="
                text-lg font-extrabold
                text-logoYellow
                sm:text-xl
              "
                        >
                            {stat.value}
                        </p>

                        <p
                            className="
                mt-1 text-[10px]
                leading-4 text-white/55
                sm:text-xs
              "
                        >
                            {stat.label}
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default StudyAbroadStats;