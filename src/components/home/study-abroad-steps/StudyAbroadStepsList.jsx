import StudyAbroadStepCard from "./StudyAbroadStepCard";
import { studyAbroadSteps } from "./stepsData";

const StudyAbroadStepsList = () => {
    return (
        <div
            className="relative flex items-center rounded-[32px] border border-white/80 bg-white/45 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:p-6"
        >
            {/* Timeline */}
            <div
                aria-hidden="true"
                className="absolute bottom-10 left-[31px] top-10 hidden w-px bg-gradient-to-b from-secondary/10 via-primary/40 to-secondary/10 lg:block"
            />

            <div className="w-full space-y-3.5 lg:pl-8">
                {studyAbroadSteps.map((step, index) => (
                    <StudyAbroadStepCard
                        key={step.id}
                        {...step}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default StudyAbroadStepsList;